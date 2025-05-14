import React from 'react';
import styles from './Calendar.module.css'
import Weekday from './Weekday/Weekday.tsx';

const getCurrentWeekdays = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    // Clone today to avoid mutating it
    const monday = new Date(today);
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    monday.setDate(monday.getDate() + diffToMonday);

    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    return Array.from({ length: 5 }, (_, i) => {
        const date = new Date(monday); // Clone again
        date.setDate(monday.getDate() + i);

        const formattedDate = date.toISOString().split('T')[0];
        return {
            day: dayNames[i],
            date: formattedDate.replace(/\//g, '-')
        };
    });
};

const Calendar = () => {
    const weekdays = getCurrentWeekdays();

    return (
        <div className={styles.componentcontainer}>
            <div className={styles.calendar}>
                <div className={styles.weekdaysrow}>
                    {weekdays.map((weekday) => (
                        <Weekday day={weekday.day} date={weekday.date} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Calendar;