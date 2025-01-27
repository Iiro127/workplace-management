import React from 'react'
import styles from './ProjectList.module.css'

const ProjectList: React.FC = () => {
  return (
    <div className={styles.componentcontainer}>
      <div className={styles.projectlist}>
        <div className={styles.listcontainer}></div>
      </div>
    </div>
  )
}

export default ProjectList