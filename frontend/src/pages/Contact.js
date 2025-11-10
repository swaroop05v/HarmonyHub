import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }

    alert("✅ Message sent! (This is a demo — no backend yet)");
    setMessage("");
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>📩 Contact / Feedback</h2>
        <p>We'd love to hear your thoughts!</p>

        <textarea
          className="contact-input"
          placeholder="Write your feedback or message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="blue-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
