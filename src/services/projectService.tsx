import { useAtom } from "jotai";
import { ProjectProps } from "../components/Projects/Project/Project.tsx";
import { authAtom } from "../atoms/authAtom.tsx";
import { data } from "react-router-dom";

export async function updateProjectStatus(updatedProject: ProjectProps, token: any) {
    const response = await fetch ('http://localhost:8080/projects/' + updatedProject.id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            },
        body: JSON.stringify(updatedProject)
    })
}

export async function refreshProjects(token: any, isAdmin: any) {
    let address: string = '';

    if (isAdmin){
        address = 'http://localhost:8080/projects'
    } else {
        address = 'http://localhost:8080/projects/users'
    }
    
    try {
    const response = await fetch(address, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        }
    });

    const data = await response.json();
    console.log(data);
    return data;
    } catch (error) {
    console.error("Error fetching projects:", error);
    }
}