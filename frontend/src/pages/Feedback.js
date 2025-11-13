import React, { useState } from "react";
import "./Contact.css";

export default function Feedback() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) {
      alert("⚠️ Please enter a message before sending.");
      return;
    }

    alert("✅ Feedback submitted! (This is a demo — no backend yet)");
    setMessage("");
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>💬 Feedback</h2>
        <p>We’d love to know what you think about HarmonyHub!</p>

        <textarea
          className="contact-input"
          placeholder="Write your feedback or message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="blue-btn" onClick={handleSend}>
          Submit
        </button>
      </div>
    </div>
  );
}
