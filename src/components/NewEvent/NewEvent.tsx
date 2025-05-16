import React, { useState } from 'react';
import styles from './NewEvent.module.css';
import { generateRandomId } from '../../services/projectService.tsx';

const NewEvent = () => {
    const [event, setEvent] = useState({
        id: generateRandomId(),
        title: "",
        date: "",
        status: "Planning",
        userid: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Submit");
    }
    return (
        <div className={styles.newEventComponent}>
            <h4>New event</h4>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Event title" 
                    required 
                />
                <input 
                    type="date" 
                    name="date" 
                    required 
                />  
                <button type="submit">Add event</button>
            </form>
        </div>
    )
}

export default NewEvent;