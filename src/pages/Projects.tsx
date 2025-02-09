import React from 'react'
import Navbar from '../components/Navbar/Navbar.tsx';
import Sidenav from '../components/Sidenav/Sidenav.tsx';
import ProjectList from '../components/ProjectList/ProjectList.tsx';

const Projects: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Sidenav />
      <main>
        <h1>Projects page</h1>
        <ProjectList />
      </main>
    </div>
  );
};

export default Projects;