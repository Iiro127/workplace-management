import React from 'react';
import styles from './Project.module.css';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
}

interface ProjectProps {
    id: string;
    title: string;
    customer: string;
    dateAdded: string;
    finishEstimate: string;
    phase: string;
    manager: User;
    members: User[];
}


const Project: React.FC<ProjectProps> = ({ title, customer, dateAdded, finishEstimate, phase }) => {
    return (
        <div className={styles.projectitem}>
            <div className={styles.maininfo}>
                <div className={styles.details}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.customer}>{customer}</p>
                </div>
                <div className={styles.dateAddedContainer}>
                    <p>{dateAdded}</p>
                </div>
                <div className={styles.finishEstimateContainer}>
                    <p>{finishEstimate}</p>
                </div>
                <div className={styles.phaseContainer}>
                    <div className={`${styles.phase} ${styles[phase.toLowerCase()]}`}>
                        <p>{phase}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;
