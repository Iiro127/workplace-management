import React from 'react';
import styles from './ProjectList.module.css';
import Project from '../Project/Project.tsx';

const projects = [
    {
        title: "Inventory helper",
        client: "Kesko",
        dateAdded: "7.11.2024",
        finishEstimate: "1.5.2025",
        phase: "Planning",
    },
    {
        title: "Membership app",
        client: "Tommin sali",
        dateAdded: "30.10.2024",
        finishEstimate: "1.6.2025",
        phase: "In progress",
    },
];

const ProjectList: React.FC = () => {
    return (
        <div className={styles.componentcontainer}>
            <div className={styles.projectlist}>
                <div className={styles.listcontainer}>
                    {projects.map((project, index) => (
                        <Project key={index} title={project.title} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
