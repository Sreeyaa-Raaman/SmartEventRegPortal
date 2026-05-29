import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = signup(name, email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 12rem)' }}>
      <div className="card form-container" style={{ width: '100%' }}>
        <div className="form-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'color-mix(in srgb, var(--primary-color) 10%, transparent)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserPlus size={32} />
            </div>
          </div>
          <h2>Create an Account</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Join SmartEvent today</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              className="input" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="John Doe"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="input" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="john@example.com"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              className="input" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Min. 8 characters"
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}>
            Sign Up
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <p>Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 500 }}>Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}
