import React, { useEffect, useState } from "react";
import styles from './ProjectList.module.css';
import Project from '../Project/Project.tsx';

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
        "phase": "Planning",
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
        "phase": "Completed",
        "title": "Another test"
    }
]

const ProjectList: React.FC = () => {
    /*const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
        try {
            const response = await fetch("http://localhost:8080/projects");
            const data = await response.json();
            setProjects(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
        };

        fetchProjects();
    }, []);*/

    return (
        <div className={styles.componentcontainer}>
            <div className={styles.projectlist}>
                <div className={styles.listcontainer}>
                    {projects.map((project) => (
                        <Project 
                            key={project.id} 
                            title={project.title} 
                            customer={project.customer}
                            dateAdded={project.dateAdded}
                            finishEstimate={project.finishEstimate}
                            phase={project.phase}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
