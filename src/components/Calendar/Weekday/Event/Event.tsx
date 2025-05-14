import React from 'react'
import styles from './Event.module.css'

export interface EventProps {
    title: string;
    date: string;
    id: string;
    userid: string;
}

const Event = ({ title, date, id, userid }) => {

    return (
        <div className={styles.eventContainer}>
            <p className={styles.eventTitle}>{title}</p>
        </div>
    )
}

export default Event;