import React from 'react'
import { authAtom } from '../atoms/authAtom.tsx';
import Navbar from '../components/Navigation/Navbar/Navbar.tsx';
import Sidenav from '../components/Navigation/Sidenav/Sidenav.tsx';
import ProjectList from '../components/Projects/ProjectList/ProjectList.tsx';
import NewProjectComponent from '../components/NewProject/NewProjectComponent/NewProjectComponent.tsx'
import styles from './styles.module.css'
import { useAtom } from 'jotai';

const Projects: React.FC = () => {
  const [auth] = useAtom(authAtom)

  return (
    <div>
      <Navbar />
      <Sidenav />
      <main>
        <div className={styles.container}>
          <h1>Projects page</h1>
          {auth?.isAdmin && <NewProjectComponent />}
          <ProjectList />
        </div>
      </main>
    </div>
  );
};

export default Projects;