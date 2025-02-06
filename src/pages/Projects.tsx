import React from 'react'
import Navbar from '../components/Navbar/Navbar.tsx';
import Sidenav from '../components/Sidenav/Sidenav.tsx';
import ProjectList from '../components/ProjectList/ProjectList.tsx';
import AdminToggle from '../components/AdminToggle/AdminToggle.tsx';

const Projects: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Sidenav />
      <AdminToggle />
      <main>
        <h1>Projects page</h1>
        <ProjectList />
      </main>
    </div>
  );
};

export default Projects;