import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles.css";

export default function AddSong() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleAddSong = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:5000/api/playlists/${id}/songs`,
        {
          title,
          artist,
          url,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate(`/playlist/${id}`);
    } catch (err) {
      console.error("Error adding song:", err);
      alert("Failed to add song");
    }
  };

  return (
    <div className="page-container">
      <div className="addsong-card">
        <h2>Add Song</h2>

        <form className="addsong-form" onSubmit={handleAddSong}>
          <input
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Audio URL (mp3) - optional"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button className="blue-btn" type="submit">
            Add Song
          </button>
        </form>
      </div>
    </div>
  );
}
