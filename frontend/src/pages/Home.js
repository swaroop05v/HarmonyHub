import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div>
      <h2>Welcome to HarmonyHub</h2>
      <p>Featured playlists and editor's picks</p>
      <div className="card">
        <h3>Editor's Picks</h3>
        <p>Curated playlist chosen for you</p>
        <Link to="/dashboard"><button>My Playlists</button></Link>
      </div>
    </div>
  );
}
