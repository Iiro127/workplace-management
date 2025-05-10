import React from 'react'
import styles from './Weekday.module.css'

const Weekday = ({day}) => {
    return (
        <div className={styles.weekdayContainer}>
            <div className={styles.weekday}>
                <h2>{day}</h2>
            </div>
        </div>
    )
}

export default Weekday;