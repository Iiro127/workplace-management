import React from 'react';
import styles from './Navbar.module.css';
import LogOut from '../../LogOut/LogOut.tsx'

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <LogOut />
    </nav>
  );
};

export default Navbar;