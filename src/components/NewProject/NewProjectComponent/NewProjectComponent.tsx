import React from 'react'
import styles from './NewProjectComponent.module.css'
import NewProjectTitles from '../NewProjectTitles/NewProjectTitles.tsx';
import { useState, useCallback, useEffect } from 'react'
import { authAtom } from '../../../atoms/authAtom.tsx';
import { useAtom } from 'jotai';
import { getUsers } from '../../../services/userService.tsx';
import { submitProject, generateRandomId } from '../../../services/projectService.tsx';

const dummyUsers = [
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

const NewProjectComponent = () => {
    const [auth] = useAtom(authAtom);
    const [users, setUsers] = useState([]);
    const [project, setProject] = useState({
        id: generateRandomId(),
        title: "",
        customer: "",
        dateAdded: new Date().toISOString().split('T')[0],
        finishEstimate: "",
        status: "Planning",
        manager: { id: "", firstName: "", lastName: "", isActive: true },
        members: []
    });

    const fetchUsers = useCallback(async () => {
        try {
            const data = await getUsers(auth?.tokenRaw);
            setUsers(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }, [auth]);

    useEffect(() => {
        fetchUsers();
    }, [auth]);

    const [managerSearchTerm, setManagerSearchTerm] = useState("");
    const [memberSearchTerm, setMemberSearchTerm] = useState("");
    const [filteredManagers, setFilteredManagers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [showManagerDropdown, setShowManagerDropdown] = useState(false);
    const [showMemberDropdown, setShowMemberDropdown] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleManagerChange = (e) => {
        const value = e.target.value;
        setManagerSearchTerm(value);
    
        if (value.length > 0) {
            const matches = users.filter(manager =>
                manager.firstName.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 3);
            setFilteredManagers(matches);
            setShowManagerDropdown(true);
        } else {
            setFilteredManagers([]);
            setShowManagerDropdown(false);
        }
    };

    const handleMemberChange = (e) => {
        const value = e.target.value;
        setMemberSearchTerm(value);
        
        if (value.length > 0) {
            const matches = users.filter(member =>
                member.firstName.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 3);
            setFilteredMembers(matches);
            setShowMemberDropdown(true);
        } else {
            setFilteredManagers([]);
            setShowMemberDropdown(false);
        }
    };

    const selectManager = (manager) => {
        setProject((prev) => ({
            ...prev,
            manager: { ...manager }
        }));
        setManagerSearchTerm(manager.firstName);
        setShowManagerDropdown(false);
    };

    const addMember = (member) => {
        setProject((prev) => ({
            ...prev,
            members: [...prev.members, member]
        }));
        setMemberSearchTerm(member.firstName);
        setShowMemberDropdown(false);
    };

    const clearMembers = () => {
        setProject((prev) => ({
            ...prev,
            members: []
        }));
    }

    const removeManager = () => {
        setProject((prev) => ({
            ...prev,
            manager: { id: "", firstName: "", lastName: "", isActive: true }
        }));
        setManagerSearchTerm("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await submitProject(project, auth?.tokenRaw)
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

                    <div className={styles.workers}>
                        <div className={styles.manager}>
                            <h3>Manager</h3>
                            <input 
                                type="text" 
                                name="firstName" 
                                placeholder="Search users" 
                                value={managerSearchTerm} 
                                onChange={handleManagerChange} 
                                required 
                            />
                            {showManagerDropdown && (
                                <ul className={styles.dropdown}>
                                    {filteredManagers.map(manager => (
                                        <p className={styles.dropdownResult} key={manager.id} onClick={() => selectManager(manager)}>
                                            {manager.firstName} {manager.lastName}
                                        </p>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className={styles.members}>
                        <h3>Members</h3>
                            <input 
                                type="text" 
                                name="firstName" 
                                placeholder="Search users" 
                                value={memberSearchTerm} 
                                onChange={handleMemberChange} 
                                required 
                            />
                            {showMemberDropdown && (
                                <ul className={styles.dropdown}>
                                    {filteredMembers.map(member => (
                                        <p className={styles.dropdownResult} key={member.id} onClick={() => addMember(member)}>
                                            {member.firstName} {member.lastName}
                                        </p>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className={styles.workerChoices}>
                        <div className={styles.managerChoice}>
                            <h5>
                                {project.manager.id 
                                    ? `Manager for this project is ${project.manager.firstName} ${project.manager.lastName}` 
                                    : "No manager selected."
                                }
                            </h5>

                            <button onClick={removeManager}>Remove manager</button>
                        </div>
                        <div className={styles.memberslist}>
                            {project.members.map(member => (
                                <h5>{member.firstName} {member.lastName}</h5>
                            ))}
                        <button onClick={clearMembers}>Clear</button>
                        </div>
                    </div>
                    
                    <button type="submit">Create Project</button>
                </form>
            </div>
        </div>
    );
};

export default NewProjectComponent;
