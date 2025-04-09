import React from 'react'
import { adminAtom } from '../atoms/adminAtom.tsx';
import Navbar from '../components/Navigation/Navbar/Navbar.tsx';
import Sidenav from '../components/Navigation/Sidenav/Sidenav.tsx';
import ProjectList from '../components/Projects/ProjectList/ProjectList.tsx';
import NewProjectComponent from '../components/NewProject/NewProjectComponent/NewProjectComponent.tsx'
import styles from './styles.module.css'
import { useAtomValue } from 'jotai';

const Projects: React.FC = () => {
  const isAdmin = useAtomValue(adminAtom);

  return (
    <div>
      <Navbar />
      <Sidenav />
      <main>
        <div className={styles.container}>
          <h1>Projects page</h1>
          {isAdmin && <NewProjectComponent />}
          <ProjectList />
        </div>
      </main>
    </div>
  );
};

export default Projects;