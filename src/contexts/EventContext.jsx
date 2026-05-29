import { createContext, useContext, useState, useEffect } from 'react';

const EventContext = createContext();

const initialEvents = [
  {
    id: '1',
    title: 'Tech Conference 2026',
    date: '2026-08-15T09:00',
    location: 'San Francisco, CA',
    description: 'Join us for the biggest tech conference of the year featuring top speakers and workshops.',
    capacity: 500,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'Design Leadership Summit',
    date: '2026-09-20T10:00',
    location: 'New York, NY',
    description: 'A gathering of design leaders to discuss the future of product design and user experience.',
    capacity: 200,
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: 'Web3 Developer Bootcamp',
    date: '2026-07-10T08:30',
    location: 'Virtual',
    description: 'Intensive 3-day bootcamp covering smart contracts, decentralized apps, and blockchain basics.',
    capacity: 1000,
    imageUrl: '/web3-bootcamp.png'
  }
];

export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('events');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map(event => {
        const initial = initialEvents.find(e => e.id === event.id);
        return {
          ...event,
          imageUrl: initial ? initial.imageUrl : event.imageUrl
        };
      });
    }
    return initialEvents;
  });

  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem('registrations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('registrations', JSON.stringify(registrations));
  }, [registrations]);

  const addRegistration = (eventId, userData) => {
    const newRegistration = {
      id: Math.random().toString(36).substr(2, 9),
      eventId,
      ...userData,
      registrationDate: new Date().toISOString()
    };
    setRegistrations([...registrations, newRegistration]);
    return newRegistration.id;
  };

  const getEvent = (id) => events.find(e => e.id === id);

  return (
    <EventContext.Provider value={{ events, registrations, addRegistration, getEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}
