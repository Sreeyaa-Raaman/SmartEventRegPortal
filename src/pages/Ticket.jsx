import { useParams, Link, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns';
import { useEvents } from '../contexts/EventContext';
import { Download, Home, MailCheck } from 'lucide-react';

export default function Ticket() {
  const { id } = useParams();
  const { registrations, getEvent } = useEvents();
  const location = useLocation();
  
  const registration = registrations.find(r => r.id === id);
  const event = registration ? getEvent(registration.eventId) : null;

  if (!registration || !event) {
    return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Ticket not found</div>;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {location.state?.emailSent && (
        <div style={{ maxWidth: '600px', margin: '0 auto 2rem', padding: '1rem 1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <MailCheck size={24} />
          <div>
            <p style={{ fontWeight: 600 }}>Registration Successful!</p>
            <p style={{ fontSize: '0.875rem' }}>A confirmation email with your ticket has been sent to <strong>{location.state.emailSent}</strong>.</p>
          </div>
        </div>
      )}
      <div className="ticket-wrapper">
        <div className="ticket-header">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{event.title}</h2>
          <p style={{ opacity: 0.9 }}>{format(new Date(event.date), 'MMMM dd, yyyy')}</p>
        </div>
        
        <div className="ticket-body">
          <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <QRCodeSVG 
              value={JSON.stringify({ ticketId: registration.id, eventId: event.id, name: registration.name })} 
              size={200}
              level={"H"}
            />
          </div>
          
          <div className="ticket-info">
            <div className="ticket-field">
              <label>Name</label>
              <p>{registration.name}</p>
            </div>
            <div className="ticket-field">
              <label>Ticket ID</label>
              <p>{registration.id.toUpperCase()}</p>
            </div>
            <div className="ticket-field">
              <label>Location</label>
              <p>{event.location}</p>
            </div>
            <div className="ticket-field">
              <label>Time</label>
              <p>{format(new Date(event.date), 'h:mm a')}</p>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }} className="no-print">
          <button onClick={handlePrint} className="btn btn-outline">
            <Download size={18} /> Download / Print
          </button>
          <Link to="/" className="btn btn-primary">
            <Home size={18} /> Back to Home
          </Link>
        </div>
      </div>
      
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .ticket-wrapper, .ticket-wrapper * {
            visibility: visible;
          }
          .ticket-wrapper {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
