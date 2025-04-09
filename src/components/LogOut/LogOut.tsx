import React from 'react'
import { useAtom } from 'jotai'
import { authAtom } from '../../atoms/authAtom.tsx'
import styles from './LogOut.module.css'

const LogOut: React.FC = () => {
    const [auth] = useAtom(authAtom)

    const handleLogout = () => {
        console.log(auth)
        auth?.logout()
    }

    return (
        <button onClick={handleLogout} className={styles.btn}>Logout</button>
    )
}

export default LogOut