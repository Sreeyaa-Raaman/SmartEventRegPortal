import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Register from './pages/Register';
import Ticket from './pages/Ticket';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (requireAdmin && !isAdmin) return <Navigate to="/" />;
  return children;
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EventProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="events/:id" element={<EventDetails />} />
                <Route path="events/:id/register" element={<Register />} />
                <Route path="ticket/:id" element={<Ticket />} />
                <Route 
                  path="dashboard" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </EventProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
