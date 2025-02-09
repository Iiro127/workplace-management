import React from 'react';
import styles from './Navbar.module.css';
import AdminToggle from '../AdminToggle/AdminToggle.tsx';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MyApp</div>
      <ul className={styles.navLinks}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
        <AdminToggle />
      </ul>
    </nav>
  );
};

export default Navbar;