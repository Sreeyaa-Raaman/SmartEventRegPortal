import { useState } from 'react';
import { useEvents } from '../contexts/EventContext';
import { Download, Users, Calendar as CalendarIcon, Activity } from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard() {
  const { events, registrations } = useEvents();
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '');

  const filteredRegistrations = selectedEventId === 'all' 
    ? registrations 
    : registrations.filter(r => r.eventId === selectedEventId);

  const exportToCSV = () => {
    if (filteredRegistrations.length === 0) return;
    
    const headers = ['Ticket ID', 'Event', 'Name', 'Email', 'Phone', 'Company', 'Registration Date'];
    
    const csvData = filteredRegistrations.map(r => {
      const event = events.find(e => e.id === r.eventId);
      return [
        r.id,
        event ? `"${event.title}"` : 'Unknown',
        `"${r.name}"`,
        r.email,
        r.phone || '',
        `"${r.company || ''}"`,
        format(new Date(r.registrationDate), 'yyyy-MM-dd HH:mm:ss')
      ].join(',');
    });
    
    const csvContent = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `registrations_${selectedEventId}_${format(new Date(), 'yyyyMMdd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <div className="dashboard-header">
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Admin Dashboard</h1>
        <button onClick={exportToCSV} className="btn btn-outline" disabled={filteredRegistrations.length === 0}>
          <Download size={18} /> Export CSV
        </button>
      </div>
      
      <div className="dashboard-stats">
        <div className="card stat-card">
          <div className="stat-icon">
            <CalendarIcon size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Events</h3>
            <p>{events.length}</p>
          </div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Registrations</h3>
            <p>{registrations.length}</p>
          </div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--error-color)' }}>
            <Activity size={24} />
          </div>
          <div className="stat-info">
            <h3>Active Events</h3>
            <p>{events.filter(e => new Date(e.date) > new Date()).length}</p>
          </div>
        </div>
      </div>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Registrations</h2>
          <select 
            className="select" 
            style={{ width: 'auto', minWidth: '200px' }}
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
          >
            <option value="all">All Events</option>
            {events.map(e => (
              <option key={e.id} value={e.id}>{e.title}</option>
            ))}
          </select>
        </div>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Event</th>
                <th>Date Registered</th>
                <th>Ticket ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    No registrations found.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map(r => {
                  const event = events.find(e => e.id === r.eventId);
                  return (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 500 }}>{r.name}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{r.email}</td>
                      <td>
                        <span className="badge">{event?.title || 'Unknown'}</span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>
                        {format(new Date(r.registrationDate), 'MMM dd, yyyy')}
                      </td>
                      <td style={{ fontFamily: 'monospace' }}>{r.id.toUpperCase()}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
