import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer style={{ padding: '2rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color)', marginTop: 'auto', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
        <p>&copy; {new Date().getFullYear()} SmartEvent. All rights reserved.</p>
      </footer>
    </div>
  );
}
