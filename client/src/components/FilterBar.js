const FilterBar = ({ filters, onChange }) => {
  return (
    <div style={styles.bar}>

      <input
        style={styles.input}
        type="text"
        placeholder="Search by role, company, skill..."
        value={filters.search}
        onChange={e => onChange({ ...filters, search: e.target.value })}
      />

      <select
        style={styles.select}
        value={filters.type}
        onChange={e => onChange({ ...filters, type: e.target.value })}
      >
        <option value="">All Types</option>
        <option value="internship">Internship</option>
        <option value="full-time">Full Time</option>
      </select>

      <input
        style={styles.input}
        type="text"
        placeholder="Location..."
        value={filters.location}
        onChange={e => onChange({ ...filters, location: e.target.value })}
      />

      <label style={styles.label}>
        <input
          type="checkbox"
          checked={filters.sortByDeadline}
          onChange={e => onChange({ ...filters, sortByDeadline: e.target.checked })}
        />
        &nbsp; Sort by deadline
      </label>

    </div>
  );
};

const styles = {
  bar: {
    display: 'flex',
    gap: '12px',
    padding: '16px 32px',
    backgroundColor: '#16213e',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  input: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #333',
    backgroundColor: '#0f3460',
    color: '#fff',
    fontSize: '14px',
    width: '220px'
  },
  select: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #333',
    backgroundColor: '#0f3460',
    color: '#fff',
    fontSize: '14px'
  },
  label: { color: '#ccc', fontSize: '14px' }
};

export default FilterBar;
