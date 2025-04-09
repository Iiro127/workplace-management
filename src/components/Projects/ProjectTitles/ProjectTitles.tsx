import React from 'react';
import styles from './ProjectTitles.module.css';

const ProjectTitles: React.FC = () => {
    return (
        <div className={styles.titles}>
            <div className={styles.nameContainer}>
                <p>Title</p>
            </div>
            <div className={styles.dateAddedContainer}>
                <p>Date added</p>
            </div>
            <div className={styles.finishEstimateContainer}>
                <p>Finish estimate</p>
            </div>
            <div className={styles.phaseContainer}>
                <p>Phase</p>
            </div>
        </div>
    )
}

export default ProjectTitles;