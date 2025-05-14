export async function getEvents(token: any, isAdmin: any) {
    let address: string = '';

    if (isAdmin){
        address = 'http://localhost:8080/events'
    } else {
        address = 'http://localhost:8080/events/users'
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
        console.error("Error fetching events:", error);
    }
}