import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>📞 Contact Us</h2>
        <p>We’d love to hear from you! Reach out to us through the following:</p>

        <div className="contact-details">
          <p><strong>Email:</strong> harmonyhub.support@gmail.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> PES University, Bengaluru, India</p>
        </div>

        <div className="contact-note">
          <p>We’ll get back to you as soon as possible. 💬</p>
        </div>
      </div>
    </div>
  );
}
