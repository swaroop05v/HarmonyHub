import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function ViewPlaylist() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  const fetchPlaylist = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/playlists/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPlaylist(res.data);
    } catch (err) {
      console.error("❌ Error fetching playlist:", err);
    }
  };

  const deleteSong = async (songId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/playlists/${id}/songs/${songId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPlaylist({
        ...playlist,
        songs: playlist.songs.filter((song) => song._id !== songId),
      });
    } catch (err) {
      console.error("❌ Error deleting song:", err);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  if (!playlist) return <h2 style={{ color: "white" }}>Loading playlist...</h2>;

  return (
    <div className="page-container">
      <div className="playlist-view-card">
        <h2>{playlist.title}</h2>

        <Link to={`/playlist/${id}/add`} className="add-btn">
          + Add Song
        </Link>

        <div className="song-list">
          {playlist.songs.length === 0 && <p>No songs yet.</p>}

          {playlist.songs.map((song) => (
            <div key={song._id} className="song-item">
              <span>
                <strong>{song.title}</strong> — {song.artist}
              </span>

              <button className="delete-btn" onClick={() => deleteSong(song._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
