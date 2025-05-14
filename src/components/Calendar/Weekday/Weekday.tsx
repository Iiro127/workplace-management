import React from 'react'
import styles from './Weekday.module.css'
import EventList from './EventList/EventList.tsx'

const Weekday = ( {day, date} ) => {
    return (
        <div className={styles.weekdayContainer}>
            <div className={styles.weekday}>
                <h2>{day}</h2>
                <p>{date}</p>
                <EventList date={date} />
            </div>
        </div>
    )
}

export default Weekday;