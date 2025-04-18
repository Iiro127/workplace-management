import React from 'react';
import styles from './Project.module.css';
import StatusContainer from './StatusContainer/StatusContainer.tsx';

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
    status: string;
    manager: User;
    members: User[];
}


const Project: React.FC<ProjectProps> = ({ title, customer, dateAdded, finishEstimate, status, manager, members }) => {
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
                <StatusContainer status={status} />
            </div>
            <div className={styles.expandinfo}>
                <div className={styles.managercontainer}>
                    <h3 className={styles.title}>Manager</h3>
                    <p className={styles.customer}>{manager.firstName} {manager.lastName}</p>
                </div>
                <div className={styles.memberscontainer}>
                    <h3 className={styles.title}>Members</h3>
                    {members.map((member) => (
                        <p className={styles.customer}>{member.firstName} {member.lastName}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Project;
