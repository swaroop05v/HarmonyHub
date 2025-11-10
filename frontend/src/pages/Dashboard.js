import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/playlists", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPlaylists(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching playlists");
    }
  };

  const deletePlaylist = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/playlists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },  // ✅ FIX ADDED
      });

      fetchPlaylists();
    } catch (err) {
      console.log(err);
      alert("Error deleting playlist");
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">🎵 My Playlists</h2>

        <button className="create-btn" onClick={() => navigate("/create")}>
          + Create Playlist
        </button>

        {playlists.length === 0 ? (
          <p className="empty">No playlists yet. Create one!</p>
        ) : (
          <div className="playlist-grid">
            {playlists.map((playlist) => (
              <div key={playlist._id} className="playlist-card">
                {/* ✅ name fix */}
                <h3>{playlist.title || playlist.playlistName || playlist.name}</h3>

                {/* show description ONLY if available */}
                {playlist.description && <p>{playlist.description}</p>}
                <p className="song-count">🎶 {playlist.songs.length} songs</p>

                <div className="btn-flex">
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/playlist/${playlist._id}`)}
                  >
                    View
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deletePlaylist(playlist._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
