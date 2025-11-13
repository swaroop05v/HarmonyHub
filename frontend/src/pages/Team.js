import React from "react";
import "./Team.css";

export default function Team() {
  const teamMembers = [
    {
      name: "Shreesh Athreya",
      role: "Backend Developer",
      img: "https://via.placeholder.com/120/4a90e2/ffffff?text=SA",
    },
    {
      name: "Swaroop Venkateshwar",
      role: "Frontend Developer",
      img: "https://via.placeholder.com/120/50c878/ffffff?text=SV",
    },
    {
      name: "Shashank Vinayak",
      role: "UI/UX Designer",
      img: "https://via.placeholder.com/120/f39c12/ffffff?text=SH",
    },
  ];

  return (
    <div className="team-container">
      <div className="team-card-wrapper">
        <h2 className="team-title">👥 Meet Our Team</h2>
        <p className="team-subtitle">
          The creative minds behind <strong>HarmonyHub</strong>
        </p>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <img src={member.img} alt={member.name} className="team-img" />
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
