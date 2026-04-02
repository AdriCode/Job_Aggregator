import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = await loginUser(form.email, form.password);
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome back</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} placeholder="Email" type="email"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input style={styles.input} placeholder="Password" type="password"
          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button style={styles.btn} onClick={handleSubmit}>Login</button>
        <p style={styles.link}>No account? <Link to="/register" style={{ color: '#e94560' }}>Register</Link></p>
      </div>
    </div>
  );
};

const styles = {
  page: { backgroundColor: '#0f0f1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: '#16213e', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '14px' },
  title: { color: '#fff', margin: 0, fontSize: '22px' },
  input: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#0f3460', color: '#fff', fontSize: '14px' },
  btn: { backgroundColor: '#e94560', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontSize: '15px' },
  error: { color: '#e94560', fontSize: '13px', margin: 0 },
  link: { color: '#aaa', fontSize: '13px', textAlign: 'center', margin: 0 }
};

export default Login;
