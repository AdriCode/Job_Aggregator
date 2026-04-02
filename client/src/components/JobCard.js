const JobCard = ({ job, isBookmarked, onBookmark, onTrack }) => {
  const deadlineBadge = () => {
    if (!job.deadline) return null;

    const daysLeft = Math.ceil(
      (new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft < 0) return <span style={{...styles.badge, backgroundColor: '#555'}}>Expired</span>;
    if (daysLeft <= 3) return <span style={{...styles.badge, backgroundColor: '#e94560'}}>Closes in {daysLeft}d</span>;
    if (daysLeft <= 7) return <span style={{...styles.badge, backgroundColor: '#f5a623'}}>Closes in {daysLeft}d</span>;
    return <span style={{...styles.badge, backgroundColor: '#2ecc71'}}>Closes in {daysLeft}d</span>;
  };

  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <div>
          <h3 style={styles.title}>{job.title}</h3>
          <p style={styles.company}>{job.company} • {job.location || 'Remote'}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={onBookmark} style={{
            ...styles.bookmarkBtn,
            backgroundColor: isBookmarked ? '#e94560' : 'transparent',
            color: isBookmarked ? '#fff' : '#e94560'
          }}>
            {isBookmarked ? '★ Saved' : '☆ Save'}
          </button>
          <span style={{
            ...styles.typeBadge,
            backgroundColor: job.type === 'internship' ? '#0f3460' : '#1a1a2e'
          }}>
            {job.type}
          </span>
        </div>
      </div>

      <p style={styles.desc}>{job.description}</p>

      <div style={styles.bottom}>
        <div style={styles.tags}>
          {job.tags?.slice(0, 4).map((tag, i) => (
            <span key={i} style={styles.tag}>{tag}</span>
          ))}
        </div>
        <div style={styles.right}>
          {deadlineBadge()}
          <a href={job.applyLink} target="_blank" rel="noreferrer" style={styles.applyBtn}>
            Apply →
          </a>
          <select
            onChange={e => { if (e.target.value) onTrack(e.target.value); }}
            defaultValue=""
            style={styles.trackSelect}
          >
            <option value="" disabled>Track</option>
            <option value="saved">Save</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="rejected">Rejected</option>
            <option value="offered">Offered</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: { backgroundColor: '#16213e', borderRadius: '10px', padding: '20px', marginBottom: '16px', border: '1px solid #1f4068' },
  top: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' },
  title: { color: '#fff', margin: '0 0 4px 0', fontSize: '17px' },
  company: { color: '#aaa', margin: 0, fontSize: '13px' },
  typeBadge: { color: '#e94560', fontSize: '12px', padding: '4px 10px', borderRadius: '20px', border: '1px solid #e94560' },
  bookmarkBtn: { fontSize: '12px', padding: '4px 10px', borderRadius: '20px', border: '1px solid #e94560', cursor: 'pointer' },
  desc: { color: '#bbb', fontSize: '13px', lineHeight: '1.5', marginBottom: '14px' },
  bottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' },
  tags: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  tag: { backgroundColor: '#0f3460', color: '#7ec8e3', fontSize: '11px', padding: '3px 8px', borderRadius: '4px' },
  right: { display: 'flex', gap: '10px', alignItems: 'center' },
  badge: { color: '#fff', fontSize: '11px', padding: '3px 8px', borderRadius: '4px' },
  applyBtn: { backgroundColor: '#e94560', color: '#fff', padding: '6px 14px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' },
  trackSelect: { backgroundColor: '#0f3460', color: '#fff', border: '1px solid #333', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }
};

export default JobCard;
