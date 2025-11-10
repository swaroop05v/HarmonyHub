import React from "react";
import "./About.css"; 

export default function About() {
  return (
    <div className="page-container">
      <div className="about-card">
        <h2>🎧 About HarmonyHub</h2>
        <p>
          HarmonyHub is a simple and elegant music playlist manager designed for music lovers.
          It allows users to create playlists, add songs, and explore personalized music ideas —
          all in a clean and seamless interface.
        </p>
        <p>
          The goal of HarmonyHub is to bring together your favorite songs in one place,
          without the complexity of full-scale streaming platforms.
        </p>
        <p>
          This project was built as part of a Web Tech course using the MERN stack:  
          <strong>MongoDB, Express, React, and Node.js</strong>.
        </p>

        <hr />

        <h3>🌟 Vision</h3>
        <p>
          To build a minimal yet meaningful space for personal music curation —  
          where music inspires productivity, creativity, and focus.
        </p>
      </div>
    </div>
  );
}
