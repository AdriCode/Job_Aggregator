import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={styles.logo}>JobRadar</h1>
        </Link>
        <p style={styles.sub}>Updated daily • All sources in one place</p>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={styles.name}>Hi, {user.name}</span>
            <Link to="/" style={styles.navBtn}>Home</Link>
            <Link to="/saved" style={styles.navBtn}>Saved</Link>
            <Link to="/dashboard" style={styles.navBtn}>Tracker</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navBtn}>Login</Link>
            <Link to="/register" style={{ ...styles.navBtn, backgroundColor: '#e94560' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { backgroundColor: '#1a1a2e', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { color: '#e94560', margin: 0, fontSize: '24px' },
  sub: { color: '#aaa', margin: '4px 0 0 0', fontSize: '13px' },
  name: { color: '#ccc', fontSize: '14px' },
  navBtn: { color: '#fff', backgroundColor: '#0f3460', padding: '7px 16px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' },
  logoutBtn: { color: '#fff', backgroundColor: 'transparent', border: '1px solid #555', padding: '7px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }
};

export default Navbar;
