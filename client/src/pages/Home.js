import { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import JobCard from '../components/JobCard';
import { fetchJobs } from '../api/jobs';
import { toggleBookmark, updateApplication, getMe } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', type: '', location: '', sortByDeadline: false });
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (user?.bookmarks) {
      setBookmarks(user.bookmarks.map(b => b._id || b));
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await fetchJobs(filters);
        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleBookmark = async (jobId) => {
    if (!user) return alert('Please login to bookmark jobs');
    try {
      await toggleBookmark(jobId);
      // Refetch user data to update both local and context state
      const updatedUser = await getMe();
      setBookmarks(updatedUser.bookmarks.map(b => b._id || b));
    } catch (err) {
      console.error('Failed to bookmark:', err);
    }
  };

  const handleTrack = async (jobId, status) => {
    if (!user) return alert('Please login to track applications');
    await updateApplication(jobId, status);
  };

  return (
    <div style={{ backgroundColor: '#0f0f1a', minHeight: '100vh' }}>
      <FilterBar filters={filters} onChange={setFilters} />
      <div style={{ maxWidth: '860px', margin: '24px auto', padding: '0 24px' }}>
        {loading
          ? <p style={{ color: '#aaa', textAlign: 'center' }}>Loading jobs...</p>
          : jobs.length === 0
            ? <p style={{ color: '#aaa', textAlign: 'center' }}>No jobs found.</p>
            : jobs.map(job => (
                <JobCard
                  key={job._id}
                  job={job}
                  isBookmarked={bookmarks.includes(job._id)}
                  onBookmark={() => handleBookmark(job._id)}
                  onTrack={(status) => handleTrack(job._id, status)}
                />
              ))
        }
      </div>
    </div>
  );
};

export default Home;
