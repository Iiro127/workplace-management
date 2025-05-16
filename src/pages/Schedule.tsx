import React from 'react'
import Navbar from '../components/Navigation/Navbar/Navbar.tsx';
import Sidenav from '../components/Navigation/Sidenav/Sidenav.tsx';
import Calendar from '../components/Calendar/Calendar.tsx';
import NewEvent from '../components/NewEvent/NewEvent.tsx';
import styles from './styles.module.css';

const Schedule: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Sidenav />
      <main>
        <h1>Schedule page</h1>
        <div className={styles.eventcalendarcontainer}>
          <NewEvent />
          <Calendar />
        </div>
      </main>
    </div>
  );
};

export default Schedule;