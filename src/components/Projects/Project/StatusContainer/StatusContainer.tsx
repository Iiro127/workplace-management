import React, { useState } from 'react'
import styles from './StatusContainer.module.css'
import { useAtom } from 'jotai';
import { authAtom } from '../../../../atoms/authAtom.tsx'

interface statusProps {
    status: string;
}

const StatusContainer: React.FC<statusProps> = ({ status }) => {
    const [auth] = useAtom(authAtom)
    const [currentStatus, setCurrentStatus] = useState(status);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentStatus(e.target.value);
    };

    return (
        <div className={styles.statusContainer}>
            <div className={`${styles.status} ${styles[status.toLowerCase().replace(/\s/g, '')]}`}>
                <p>{status}</p>
            </div>

            <select onChange={handleChange} value={currentStatus}>
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
        </div>
    )
}

export default StatusContainer;
