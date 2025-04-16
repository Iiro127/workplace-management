import React, { useEffect, useState } from "react";
import styles from './ProjectList.module.css';
import Project from '../Project/Project.tsx';
import ProjectTitles from '../ProjectTitles/ProjectTitles.tsx'
import { useAtom } from "jotai";
import { authAtom } from "../../../atoms/authAtom.tsx";

const projects = [
    {
        "customer": "Kesko",
        "dateAdded": "2023-10-15",
        "finishEstimate": "2024-05-10",
        "id": "p98765",
        "manager": {
            "firstName": "Alice",
            "id": "u11223",
            "isActive": true,
            "lastName": "Johnson"
        },
        "members": [
            {
                "firstName": "John",
                "id": "u12345",
                "isActive": true,
                "lastName": "Doe"
            },
            {
                "firstName": "Jane",
                "id": "u67890",
                "isActive": false,
                "lastName": "Smith"
            }
        ],
        "status": "Planning",
        "title": "Test test"
    },
    {
        "customer": "S-ryhmä",
        "dateAdded": "2024-03-25",
        "finishEstimate": "2024-12-10",
        "id": "uis928",
        "manager": {
            "firstName": "Tony",
            "id": "so928e",
            "isActive": true,
            "lastName": "Gravy"
        },
        "members": [
            {
                "firstName": "John",
                "id": "u12345",
                "isActive": true,
                "lastName": "Doe"
            },
            {
                "firstName": "Jane",
                "id": "u67890",
                "isActive": false,
                "lastName": "Smith"
            }
        ],
        "status": "Completed",
        "title": "Another test"
    }
]

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState([]);
    const [auth] = useAtom(authAtom);
    let address: string = '';

    useEffect(() => {
    const fetchProjects = async () => {
        if (auth?.isAdmin){
            address = 'http://localhost:8080/projects'
        } else {
            address = 'http://localhost:8080/projects/users'
        }
        
        try {
        const response = await fetch(address, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth?.tokenRaw}`,
            }
        });

        const data = await response.json();
        setProjects(data);
        console.log(data);
        } catch (error) {
        console.error("Error fetching projects:", error);
        }
    };

    fetchProjects();
    }, [auth]);

    return (
        <div className={styles.componentcontainer}>
            <div className={styles.projectlist}>
                <div className={styles.listcontainer}>
                    <ProjectTitles />
                    {projects.map((project) => (
                        <Project 
                            key={project.id} 
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
