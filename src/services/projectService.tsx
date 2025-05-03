import { ProjectProps } from "../components/Projects/Project/Project.tsx";

export async function updateProjectStatus(updatedProject: ProjectProps, token: any): Promise<boolean> {
    const response = await fetch ('http://localhost:8080/projects/' + updatedProject.id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            },
        body: JSON.stringify(updatedProject)
    })

    return response.ok
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

export async function deleteProject(id: string, token: any) {
    try {
        const response = await fetch('http://localhost:8080/projects/' + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            alert("Failed to delete project. Please try again.");
        } else {
            alert("Project deleted successfully.");
        }

        return response.ok;
    } catch (error) {
        console.error("Error deleting project:", error);
    }
}