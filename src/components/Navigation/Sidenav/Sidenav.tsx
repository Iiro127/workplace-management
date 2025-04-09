import React from 'react'
import styles from './Sidenav.module.css'
import { Link } from 'react-router-dom';


const Sidenav: React.FC = () => {
	return (
		<aside className={styles.sidenav}>
			<ul className={styles.navLinks}>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/projects">Projects</Link></li>
        <li><Link to="/schedule">Schedule</Link></li>
			</ul>
		</aside>
	);
}

export default Sidenav;