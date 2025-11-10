import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreatePlaylist from './pages/CreatePlaylist';
import ViewPlaylist from './pages/ViewPlaylist';
import AddSong from './pages/AddSong';
import About from './pages/About';
import Contact from './pages/Contact';
import Team from './pages/Team';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="nav">
      <h1>HarmonyHub</h1>
      <div className="navlinks">
        <Link to="/">Home</Link>
        {token && <Link to="/dashboard">My Playlists</Link>}
        {token && <Link to="/create">Create Playlist</Link>}
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/team">Team</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePlaylist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlist/:id"
            element={
              <ProtectedRoute>
                <ViewPlaylist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlist/:id/add"
            element={
              <ProtectedRoute>
                <AddSong />
              </ProtectedRoute>
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
