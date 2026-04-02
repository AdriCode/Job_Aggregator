import { useState, useEffect } from 'react';
import { getApplications, updateApplication } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const statusColors = {
  saved: '#0f3460',
  applied: '#f5a623',
  interviewing: '#2ecc71',
  rejected: '#e94560',
  offered: '#9b59b6'
};

const Dashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getApplications().then(data => setApplications(data.applications));
  }, []);

  const handleStatusChange = async (jobId, newStatus) => {
    await updateApplication(jobId, newStatus);
    setApplications(prev =>
      prev.map(app =>
        app.job._id === jobId ? { ...app, status: newStatus } : app
      )
    );
  };

  const statuses = ['saved', 'applied', 'interviewing', 'rejected', 'offered'];

  return (
    <div style={{ backgroundColor: '#0f0f1a', minHeight: '100vh', padding: '32px' }}>
      <h2 style={{ color: '#fff', marginBottom: '8px' }}>
        {user?.name}'s Application Tracker
      </h2>
      <p style={{ color: '#aaa', marginBottom: '32px' }}>
        {applications.length} jobs tracked
      </p>

      {statuses.map(status => {
        const group = applications.filter(app => app.status === status);
        if (group.length === 0) return null;

        return (
          <div key={status} style={{ marginBottom: '32px' }}>
            <h3 style={{ color: '#fff', textTransform: 'capitalize', marginBottom: '12px' }}>
              <span style={{ backgroundColor: statusColors[status], padding: '3px 10px', borderRadius: '4px', fontSize: '13px', marginRight: '8px' }}>
                {group.length}
              </span>
              {status}
            </h3>
            {group.map(app => (
              <div key={app.job._id} style={styles.card}>
                <div>
                  <p style={styles.title}>{app.job.title}</p>
                  <p style={styles.company}>{app.job.company} • {app.job.location}</p>
                </div>
                <select
                  value={app.status}
                  onChange={e => handleStatusChange(app.job._id, e.target.value)}
                  style={{ ...styles.select, backgroundColor: statusColors[app.status] }}
                >
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </div>
        );
      })}

      {applications.length === 0 && (
        <p style={{ color: '#aaa' }}>No applications tracked yet. Save jobs from the home page.</p>
      )}
    </div>
  );
};

const styles = {
  card: { backgroundColor: '#16213e', padding: '16px 20px', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #1f4068' },
  title: { color: '#fff', margin: '0 0 4px 0', fontSize: '15px' },
  company: { color: '#aaa', margin: 0, fontSize: '12px' },
  select: { color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', textTransform: 'capitalize' }
};

export default Dashboard;
