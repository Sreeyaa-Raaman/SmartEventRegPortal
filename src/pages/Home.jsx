import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, MapPin, Users, CheckCircle, Zap, Shield, Mail } from 'lucide-react';
import { useEvents } from '../contexts/EventContext';

export default function Home() {
  const { events, registrations } = useEvents();

  return (
    <div className="container">
      <div className="hero">
        <h1>Discover Amazing Events</h1>
        <p>Your one-stop platform for discovering, registering, and managing events. Join our community and never miss out on what's happening.</p>
        <a href="#events" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }}>
          Explore Now
        </a>
      </div>

      <div id="events" style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Upcoming Events</h2>
        <div className="events-grid">
          {events.map(event => {
            const registeredCount = registrations.filter(r => r.eventId === event.id).length;
            const isFull = registeredCount >= event.capacity;
            
            return (
              <div key={event.id} className="card">
                <img src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000'} alt={event.title} className="event-card-image" />
                <div className="event-card-content">
                  <h3 className="event-card-title">{event.title}</h3>
                  <div className="event-card-meta">
                    <Calendar size={16} />
                    <span>{format(new Date(event.date), 'MMM dd, yyyy • h:mm a')}</span>
                  </div>
                  <div className="event-card-meta">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="event-card-meta" style={{ color: isFull ? 'var(--error-color)' : 'var(--text-secondary)' }}>
                    <Users size={16} />
                    <span>{registeredCount} / {event.capacity} registered</span>
                  </div>
                  
                  <div className="event-card-footer">
                    <Link to={`/events/${event.id}`} className="btn btn-outline" style={{ width: '100%' }}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="features" style={{ marginTop: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Why Choose SmartEvent?</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto 0' }}>Experience the most seamless event registration process with our powerful features designed for both attendees and organizers.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ width: '4rem', height: '4rem', margin: '0 auto 1.5rem', borderRadius: '50%', backgroundColor: 'color-mix(in srgb, var(--primary-color) 10%, transparent)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={32} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Instant Registration</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Sign up for events in seconds. Our streamlined process means less time filling forms and more time preparing for your event.</p>
          </div>
          
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ width: '4rem', height: '4rem', margin: '0 auto 1.5rem', borderRadius: '50%', backgroundColor: 'color-mix(in srgb, var(--primary-color) 10%, transparent)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={32} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>QR Code Tickets</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Get instant access to your digital tickets. Simply show your unique QR code at the venue for quick and contactless entry.</p>
          </div>
          
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ width: '4rem', height: '4rem', margin: '0 auto 1.5rem', borderRadius: '50%', backgroundColor: 'color-mix(in srgb, var(--primary-color) 10%, transparent)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={32} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Secure Platform</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Your data is safe with us. We use industry-standard encryption to ensure your personal information remains strictly confidential.</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '5rem', marginBottom: '2rem', padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, var(--primary-color), #8b5cf6)', color: 'white', border: 'none' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Stay Updated</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.9 }}>Subscribe to our newsletter to get the latest updates on upcoming events, exclusive discounts, and more.</p>
        
        <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }} style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }}>
              <Mail size={20} />
            </div>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--radius-md)', border: 'none', outline: 'none', fontSize: '1rem' }}
            />
          </div>
          <button type="submit" className="btn" style={{ backgroundColor: '#111827', color: 'white', padding: '0 2rem' }}>
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
