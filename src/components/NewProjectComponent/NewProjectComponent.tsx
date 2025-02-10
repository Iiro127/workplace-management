import React from 'react'
import styles from './NewProjectComponent.module.css'
import NewProjectTitles from '../NewProjectTitles/NewProjectTitles.tsx';
import { useState } from 'react'


interface User {
    id: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
}

interface ProjectProps {
    id: string;
    title: string;
    customer: string;
    dateAdded: string;
    finishEstimate: string;
    phase: string;
    manager: User;
    members: User[];
}

const NewProjectComponent = () => {
    const [project, setProject] = useState({
        id: "",
        title: "",
        customer: "",
        dateAdded: "",
        finishEstimate: "",
        phase: "Planning",
        manager: { id: "", firstName: "", lastName: "", isActive: true },
        members: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleManagerChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({
            ...prev,
            manager: { ...prev.manager, [name]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("localhost:8080/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(project)
            });
            if (!response.ok) throw new Error("Failed to create project");
            alert("Project successfully created!");
        } catch (error) {
            console.error(error);
            alert("Error creating project");
        }
    };

    return (
        <div className={styles.componentcontainer}>
            <div className={styles.content}>
                <h2>New Project</h2>
                <NewProjectTitles />
                <form onSubmit={handleSubmit}>
                    <div className={styles.details}>
                        <div className={styles.title}>
                            <input type="text" name="title" placeholder="Title" value={project.title} onChange={handleChange} required />
                        </div>
                        <div className={styles.customer}>
                            <input type="text" name="customer" placeholder="Customer" value={project.customer} onChange={handleChange} required />
                        </div>
                        <div className={styles.finishEstimate}>
                            <input type="date" name="finishEstimate" value={project.finishEstimate} onChange={handleChange} required />   
                        </div>
                    </div>

                    <h3>Manager</h3>
                    <input type="text" name="id" placeholder="Manager ID" value={project.manager.id} onChange={handleManagerChange} required />
                    <input type="text" name="firstName" placeholder="First Name" value={project.manager.firstName} onChange={handleManagerChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" value={project.manager.lastName} onChange={handleManagerChange} required />
                    
                    <button type="submit">Create Project</button>
                </form>
            </div>
        </div>
    );
};

export default NewProjectComponent;
