import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Calendar, Moon, Sun, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-brand">
          <Calendar size={24} />
          SmartEvent
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-item">Events</Link>
          {isAdmin && (
            <Link to="/dashboard" className="nav-item">Dashboard</Link>
          )}
          <button onClick={toggleTheme} className="btn btn-outline" style={{ padding: '0.4rem', border: 'none' }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Hello, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem', border: 'none' }}>
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                <User size={18} /> Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
