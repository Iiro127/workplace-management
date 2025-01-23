import React from 'react'
import Navbar from '../components/Navbar/Navbar.tsx';
import Sidenav from '../components/Sidenav/Sidenav.tsx';

const Schedule: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Sidenav />
      <main>
        <h1>Schedule page</h1>
      </main>
    </div>
  );
};

export default Schedule;