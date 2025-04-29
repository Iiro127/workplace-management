import { Project } from "../types/Project.tsx";
import { authAtom } from "../atoms/authAtom.tsx";
import { useAtom } from "jotai";
import { ProjectProps } from "../components/Projects/Project/Project.tsx";

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