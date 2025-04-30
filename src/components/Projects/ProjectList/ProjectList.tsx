import React, { useEffect, useState, useCallback } from "react";
import styles from './ProjectList.module.css';
import Project from '../Project/Project.tsx';
import ProjectTitles from '../ProjectTitles/ProjectTitles.tsx'
import { useAtom } from "jotai";
import { authAtom } from "../../../atoms/authAtom.tsx";
import { refreshProjects } from "../../../services/projectService.tsx";

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState([]);
    const [auth] = useAtom(authAtom);

    const fetchProjects = useCallback(async () => {
        try {
            const data = await refreshProjects(auth?.tokenRaw, auth?.isAdmin);
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }, [auth]);

    useEffect(() => {
        fetchProjects();
    }, [auth]);

    return (
        <div className={styles.componentcontainer}>
            <div className={styles.projectlist}>
                <div className={styles.listcontainer}>
                    <ProjectTitles />
                    {projects.map((project) => (
                        <Project 
                            id={project.id} 
                            title={project.title} 
                            customer={project.customer}
                            dateAdded={project.dateAdded}
                            finishEstimate={project.finishEstimate}
                            status={project.status}
                            manager={project.manager}
                            members={project.members}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
