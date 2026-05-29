import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, MapPin, Users, ArrowLeft } from 'lucide-react';
import { useEvents } from '../contexts/EventContext';

export default function EventDetails() {
  const { id } = useParams();
  const { getEvent, registrations } = useEvents();
  const event = getEvent(id);

  if (!event) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Event not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Go Home</Link>
      </div>
    );
  }

  const registeredCount = registrations.filter(r => r.eventId === event.id).length;
  const isFull = registeredCount >= event.capacity;

  return (
    <div className="container" style={{ maxWidth: '800px', padding: '2rem 1.5rem' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={20} /> Back to Events
      </Link>
      
      <div className="card">
        <img src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000'} alt={event.title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
        <div style={{ padding: '2.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>{event.title}</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'color-mix(in srgb, var(--primary-color) 10%, transparent)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={24} />
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Date & Time</p>
                <p style={{ fontWeight: 600 }}>{format(new Date(event.date), 'MMM dd, yyyy • h:mm a')}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'rgba(99,102,241,0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={24} />
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Location</p>
                <p style={{ fontWeight: 600 }}>{event.location}</p>
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>About this event</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{event.description}</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <div>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isFull ? 'var(--error-color)' : 'var(--text-secondary)' }}>
                <Users size={20} />
                <span style={{ fontWeight: 600 }}>{registeredCount} / {event.capacity}</span> spots taken
              </p>
            </div>
            {isFull ? (
              <button className="btn btn-outline" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>Event Full</button>
            ) : (
              <Link to={`/events/${event.id}/register`} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                Register Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
