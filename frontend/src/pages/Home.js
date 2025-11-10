import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">
          Welcome to <span>HarmonyHub</span> 🎶
        </h1>
        <p className="home-subtitle">
          Your personal space to create, manage, and enjoy your music playlists.
        </p>

        <div className="highlight">
          <h3>✨ Editor's Picks</h3>
          <p>Playlists curated to match your vibe — hand-picked for inspiration.</p>
        </div>

        <Link to="/dashboard">
          <button className="main-btn">View My Playlists</button>
        </Link>
      </div>
    </div>
  );
}
