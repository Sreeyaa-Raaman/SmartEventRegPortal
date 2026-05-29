import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import { ArrowLeft } from 'lucide-react';

export default function Register() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEvent, addRegistration } = useEvents();
  const event = getEvent(id);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) {
    return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Event not found</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for sending email and registering
    setTimeout(() => {
      const registrationId = addRegistration(event.id, formData);
      navigate(`/ticket/${registrationId}`, { state: { emailSent: formData.email } });
    }, 1500);
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <Link to={`/events/${id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={20} /> Back to Event
      </Link>
      
      <div className="card form-container">
        <div className="form-header">
          <h2>Register for Event</h2>
          <p style={{ color: 'var(--text-secondary)' }}>{event.title}</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name *</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="input" 
              required 
              value={formData.name} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email Address *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="input" 
              required 
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              className="input" 
              value={formData.phone} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="company">Company / Organization</label>
            <input 
              type="text" 
              id="company" 
              name="company" 
              className="input" 
              value={formData.company} 
              onChange={handleChange} 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }} disabled={isSubmitting}>
            {isSubmitting ? 'Sending Confirmation Email...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
}
