import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMe, toggleBookmark, updateApplication } from '../api/auth';
import JobCard from '../components/JobCard';

const Saved = () => {
  const { user } = useAuth();
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookmarkedJobs = useCallback(async () => {
    if (user) {
      try {
        const data = await getMe();
        setBookmarkedJobs(data.bookmarks || []);
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    loadBookmarkedJobs();
  }, [loadBookmarkedJobs]);

  const handleRemoveBookmark = async (jobId) => {
    try {
      await toggleBookmark(jobId);
      // Refetch to keep state in sync
      const data = await getMe();
      setBookmarkedJobs(data.bookmarks || []);
    } catch (err) {
      console.error('Failed to remove bookmark:', err);
    }
  };

  const handleTrack = async (jobId, status) => {
    await updateApplication(jobId, status);
  };

  return (
    <div style={{ backgroundColor: '#0f0f1a', minHeight: '100vh', padding: '32px' }}>
      <h2 style={{ color: '#fff', marginBottom: '8px', maxWidth: '860px', margin: '0 auto 32px' }}>
        Saved Jobs
      </h2>
      
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>
        {loading
          ? <p style={{ color: '#aaa', textAlign: 'center' }}>Loading...</p>
          : bookmarkedJobs.length === 0
            ? <p style={{ color: '#aaa', textAlign: 'center' }}>No saved jobs yet. Go to Home to bookmark some!</p>
            : bookmarkedJobs.map(job => (
                <JobCard
                  key={job._id}
                  job={job}
                  isBookmarked={true}
                  onBookmark={() => handleRemoveBookmark(job._id)}
                  onTrack={(status) => handleTrack(job._id, status)}
                />
              ))
        }
      </div>
    </div>
  );
};

export default Saved;
