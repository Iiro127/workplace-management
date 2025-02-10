import React from 'react'
import styles from './NewProjectComponent.module.css'
import NewProjectTitles from '../NewProjectTitles/NewProjectTitles.tsx';
import { useState } from 'react'

const projects = [
    {
        "id": "123abc",
        "firstName": "Mario",
        "lastName": "Rossi",
        "isActive": true
    },
    {
        "id": "abc123",
        "firstName": "Tony",
        "lastName": "Test",
        "isActive": true
    },
    {
        "id": "1a2b3c",
        "firstName": "Mary",
        "lastName": "Test",
        "isActive": true
    },
    {
        "id": "321cba",
        "firstName": "Chris",
        "lastName": "Pratt",
        "isActive": true
    }
]

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

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredManagers, setFilteredManagers] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleManagerChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        if (value.length > 0) {
            const matches = projects.filter(manager =>
                manager.firstName.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 3);
            setFilteredManagers(matches);
            setShowDropdown(true);
        } else {
            setFilteredManagers([]);
            setShowDropdown(false);
        }
    };

    const selectManager = (manager) => {
        setProject((prev) => ({
            ...prev,
            manager: { ...manager }
        }));
        setSearchTerm(manager.firstName);
        setShowDropdown(false);
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
                            <input 
                                type="text" 
                                name="title" 
                                placeholder="Title" 
                                value={project.title} 
                                onChange={handleChange} 
                                required />
                        </div>
                        <div className={styles.customer}>
                            <input 
                                type="text" 
                                name="customer" 
                                placeholder="Customer" 
                                value={project.customer} 
                                onChange={handleChange} 
                                required />
                        </div>
                        <div className={styles.finishEstimate}>
                            <input 
                                type="date" 
                                name="finishEstimate" 
                                value={project.finishEstimate} 
                                onChange={handleChange} 
                                required />   
                        </div>
                    </div>

                    <h3>Manager</h3>
                    <input 
                        type="text" 
                        name="firstName" 
                        placeholder="Search users" 
                        value={searchTerm} 
                        onChange={handleManagerChange} 
                        required 
                    />
                    {showDropdown && (
                        <ul className={styles.dropdown}>
                            {filteredManagers.map(manager => (
                                <p className={styles.dropdownResult} key={manager.id} onClick={() => selectManager(manager)}>
                                    {manager.firstName} {manager.lastName}
                                </p>
                            ))}
                        </ul>
                    )}
                    <p>Selected Manager: {project.manager.firstName} {project.manager.lastName}</p>
                    <button type="submit">Create Project</button>
                </form>
            </div>
        </div>
    );
};

export default NewProjectComponent;
