import React from 'react';
import './TeamPage.css';

const teamMembers = [
  {
    name: 'I Gede Kasuma Dana',
    role: 'Frontend & Backend',
    initial: 'FB',
  },
  {
    name: 'I Nyoman Anrasansya Dharma Putra',
    role: 'Frontend & Backend',
    initial: 'FB',
  },
  {
    name: 'Wahyudi Adhika Wijaya',
    role: 'Frontend & Backend',
    initial: 'FB',
  },
  {
    name: 'Novia Elsyana',
    role: 'Frontend & Backend',
    initial: 'FB',
  },
  {
    name: 'Randy Putra Setiawan',
    role: 'Machine Learning',
    initial: 'ML',
  },
];

const TeamPage = () => {
  return (
    <div className="team-page">
      <h1>Our Team</h1>
      <p className="team-description">
        Kami adalah tim yang berdedikasi untuk membantu remaja meningkatkan
        literasi finansial mereka. Bersama, kami membangun CuanCerdas untuk
        menjadi sahabat finansial Anda.
      </p>
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <div className="member-initial">{member.initial}</div>
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;