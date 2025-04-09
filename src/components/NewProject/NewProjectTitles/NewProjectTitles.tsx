import React from 'react';
import styles from './NewProjectTitles.module.css';

const NewProjectTitles = () => {
    return (
        <div className={styles.titles}>
            <div className={styles.titleContainer}>
                <p>Title</p>
            </div>
            <div className={styles.customerContainer}>
                <p>Customer</p>
            </div>
            <div className={styles.finishEstimateContainer}>
                <p>Finish estimate</p>
            </div>
        </div>
    )
}

export default NewProjectTitles;