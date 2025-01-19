import React from 'react'
import styles from './Sidenav.module.css'

const Sidenav: React.FC = () => {
	return (
		<aside className={styles.sidenav}>
			<ul className={styles.navLinks}>
				<li><a href="#home">Home</a></li>
				<li><a href="#about">About</a></li>
				<li><a href="#services">Services</a></li>
				<li><a href="#contact">Contact</a></li>
			</ul>
		</aside>
	);
}

export default Sidenav;