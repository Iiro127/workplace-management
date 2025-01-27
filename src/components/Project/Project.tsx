import React from 'react';
import styles from './Project.module.css';

interface ProjectProps {
    title: string;
}

const Project: React.FC<ProjectProps> = ({ title }) => {
    return (
        <div className={styles.projectitem}>
            <h2>{title}</h2>
        </div>
    );
};

export default Project;
