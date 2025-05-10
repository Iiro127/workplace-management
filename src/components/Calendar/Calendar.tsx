import React from 'react';
import styles from './Calendar.module.css'
import Weekday from './Weekday/Weekday.tsx';

const Calendar = () => {
    return (
        <div className={styles.componentcontainer}>
            <div className={styles.calendar}>
                <div className={styles.weekdaysrow}>
                    <Weekday day="Mon"/>
                    <Weekday day="Tue"/>
                    <Weekday day="Wed"/>
                    <Weekday day="Thu"/>
                    <Weekday day="Fri"/>
                </div>
            </div>
        </div>
    );
}

export default Calendar;