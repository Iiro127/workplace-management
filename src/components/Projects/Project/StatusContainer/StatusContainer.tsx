import React, { useState } from 'react'
import styles from './StatusContainer.module.css'
import { useAtom } from 'jotai';
import { authAtom } from '../../../../atoms/authAtom.tsx'
import { updateProjectStatus } from '../../../../services/projectService.tsx';
import { ProjectProps } from '../Project.tsx';

interface StatusProps {
    status: string;
    project: ProjectProps;
}

const StatusContainer: React.FC<StatusProps> = ({ status, project }) => {
    const [auth] = useAtom(authAtom)
    const [currentStatus, setCurrentStatus] = useState(status);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentStatus(e.target.value);

        const updatedProject = { ...project, status: e.target.value };
        updateProjectStatus(updatedProject, auth?.tokenRaw);
    };

    return (
        <div>
            <div className={`${styles.status} ${styles[currentStatus.toLowerCase().replace(/\s/g, '')]}`}>
                <p>{currentStatus}</p>
                {auth?.isAdmin && 
                <select onChange={handleChange} value={currentStatus}>
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                }
            </div>
        </div>
    )
}

export default StatusContainer;
