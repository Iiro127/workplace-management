import React from 'react'
import { useAtom } from "jotai";
import { adminAtom } from "/Users/iiro/Documents/Projects/workplace-management/src/state/adminAtom.tsx";

const AdminToggle = () => {
  const [isAdmin, setIsAdmin] = useAtom(adminAtom);

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return <button onClick={toggleAdmin}>{isAdmin ? "Disable Admin" : "Enable Admin"}</button>;
};

export default AdminToggle;
