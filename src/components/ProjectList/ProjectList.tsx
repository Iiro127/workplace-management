import React from 'react'
import styles from './ProjectList.module.css'

const ProjectList: React.FC = () => {
  return (
    <div className={styles.projectlistcontainer}>
      <div className={styles.projectlist}></div>
    </div>
  )
}

export default ProjectList