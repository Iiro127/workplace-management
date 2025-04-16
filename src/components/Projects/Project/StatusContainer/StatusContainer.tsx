import React from 'react'
import styles from './StatusContainer.module.css'

interface statusProps {
    status: string;
}

const StatusContainer: React.FC<statusProps> = ({ status }) => {
    return (
        <div className={styles.statusContainer}>
            <div className={`${styles.status} ${styles[status.toLowerCase().replace(/\s/g, '')]}`}>
                <p>{status}</p>
            </div>
        </div>
    )
}

export default StatusContainer;