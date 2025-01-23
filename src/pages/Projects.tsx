import React from 'react'
import Navbar from '../components/Navbar/Navbar.tsx';
import Sidenav from '../components/Sidenav/Sidenav.tsx';

const Projects: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Sidenav />
      <main>
        <h1>Projects page</h1>
      </main>
    </div>
  );
};

export default Projects;