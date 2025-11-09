import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreatePlaylist() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    // ✅ Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must log in first.');
      navigate('/login');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/playlists',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // ✅ include token
          },
        }
      );

      console.log('✅ Playlist created:', res.data);
      alert('Playlist created successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Playlist creation failed:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Failed to create playlist');
    }
  };

  return (
    <div className="container">
      <h2>Create Playlist</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Playlist title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
