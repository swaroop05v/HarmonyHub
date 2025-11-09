import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddSong(){
  const { id } = useParams();
  const [title,setTitle] = useState('');
  const [artist,setArtist] = useState('');
  const [url,setUrl] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/playlists/' + id + '/songs', { title, artist, url }, { headers: { Authorization: 'Bearer ' + token }});
      navigate('/playlist/' + id);
    }catch(err){ alert(err.response?.data?.message || 'Error'); }
  };

  return (
    <div>
      <h2>Add Song</h2>
      <form onSubmit={submit} className="card">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Song Title" />
        <input value={artist} onChange={e => setArtist(e.target.value)} placeholder="Artist" />
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Audio URL (mp3) - optional" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
