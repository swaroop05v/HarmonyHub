import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/playlists', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaylists(res.data);
      } catch (err) {
        console.error('Error fetching playlists:', err);
        alert('Failed to load playlists');
      }
    };

    fetchPlaylists();
  }, [navigate]);

  const deletePlaylist = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Are you sure you want to delete this playlist?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/playlists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlaylists(playlists.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete playlist');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">🎵 My Playlists</h2>
      <button
        onClick={() => navigate('/create')}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        + Create Playlist
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {playlists.length === 0 && <p>No playlists yet. Create one!</p>}
        {playlists.map((p) => (
          <div key={p._id} className="card bg-white shadow-md p-4 rounded-lg">
            <h3 className="font-semibold text-lg">{p.title}</h3>
            <p className="text-gray-600">{p.description}</p>
            <p className="text-sm mt-2">
              🎶 {p.songs?.length || 0} songs
            </p>
            <div className="flex gap-2 mt-3">
              <Link
                to={`/playlist/${p._id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                View
              </Link>
              <button
                onClick={() => deletePlaylist(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
