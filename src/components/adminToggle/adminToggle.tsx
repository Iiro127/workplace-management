import React from 'react'
import { useAdmin } from '/Users/iiro/Documents/Projects/workplace-management/src/context/AdminContext.tsx'


const AdminToggle = () => {
  const { isAdmin, toggleAdmin } = useAdmin();

  return (
    <button onClick={toggleAdmin}>
      {isAdmin ? "Disable Admin Mode" : "Enable Admin Mode"}
    </button>
  );
};

export default AdminToggle;
