import React, { useState } from "react";
import "./Contact.css"; // reuse same styles

export default function Feedback() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) {
      alert("Please enter your feedback!");
      return;
    }

    alert("✅ Thank you for your feedback! (Demo only — not sent to backend)");
    setMessage("");
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>💬 Feedback</h2>
        <p>We value your thoughts and suggestions!</p>

        <textarea
          className="contact-input"
          placeholder="Write your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="blue-btn" onClick={handleSend}>
          Send Feedback
        </button>
      </div>
    </div>
  );
}
