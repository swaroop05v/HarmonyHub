import React, { useState } from "react";
import axios from "axios";
import "./CreatePlaylist.css"; // ✅ new stylesheet
import { useNavigate } from "react-router-dom";

export default function CreatePlaylist() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/playlists",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Playlist created!");
      navigate("/dashboard");
    } catch (err) {
      alert("Error creating playlist");
    }
  };

  return (
    <div className="center-wrapper">
      <form className="playlist-card" onSubmit={submit}>
        <h2>Create Playlist</h2>

        <input
          type="text"
          placeholder="Playlist Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Create Playlist</button>
      </form>
    </div>
  );
}
