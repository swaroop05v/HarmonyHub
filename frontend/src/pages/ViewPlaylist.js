import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewPlaylist() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`http://localhost:5000/api/playlists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaylist(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load playlist');
      }
    };
    fetchPlaylist();
  }, [id]);

  const deleteSong = async (songId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/playlists/${id}/songs/${songId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlaylist({
        ...playlist,
        songs: playlist.songs.filter((s) => s._id !== songId),
      });
    } catch (err) {
      console.error(err);
      alert('Failed to delete song');
    }
  };

  if (!playlist) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">{playlist.title}</h2>
      <p>{playlist.description}</p>
      <Link
        to={`/playlist/${id}/add`}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 inline-block"
      >
        + Add Song
      </Link>
      <div className="mt-6">
        {playlist.songs.length === 0 ? (
          <p>No songs yet.</p>
        ) : (
          <ul className="space-y-2">
            {playlist.songs.map((s) => (
              <li
                key={s._id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>
                  {s.title} — {s.artist}
                </span>
                <button
                  onClick={() => deleteSong(s._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
