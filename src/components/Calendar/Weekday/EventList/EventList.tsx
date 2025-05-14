import React, { useState, useEffect } from 'react'
import { getEvents } from '../../../../services/eventService.tsx';
import { useCallback } from 'react';
import styles from './EventList.module.css'
import { useAtom } from 'jotai';
import { authAtom } from '../../../../atoms/authAtom.tsx';
import Event from '../Event/Event.tsx';

const EventList = ({ date }) => {
    const [events, setEvents] = useState([]);
    const [auth] = useAtom(authAtom);

    const fetchEvents = useCallback(async () => {
        try {
            const data = await getEvents(auth?.tokenRaw, auth?.isAdmin);
            setEvents(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }, [auth]);

    useEffect(() => {
        fetchEvents();
    }, [auth]);

    const filteredEvents = events.filter(
        (event) => new Date(event.date).toDateString() === new Date(date).toDateString()
    );

    return (
        <div className={styles.componentContainer}>
            <div className={styles.eventListContainer}>
                {filteredEvents.map((event) => (
                    <Event
                        title={event.title}
                        date={event.date}
                        id={event.id}
                        userid={event.userid}
                    />
                ))}
            </div>
        </div>
    )
}

export default EventList;