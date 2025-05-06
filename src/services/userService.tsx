import { User } from "../types/User.tsx";

export async function saveUserToDB(userInfo: any) {
  const user: User = {
    id: userInfo?.["ID"] || null,
    firstName: userInfo.given_name || '',
    lastName: userInfo.family_name || '',
    isActive: true,
  };

  try {
    // Step 1: Check if user already exists
    const usersRes = await fetch('http://localhost:8080/users');
    if (!usersRes.ok) throw new Error("Failed to fetch users");

    const users: User[] = await usersRes.json();
    const userExists = users.some(u => u.id === user.id);
      
    if (userExists || !user.id) {
      return user;
    }

    // Step 2: Create the user
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Failed to save user to DB');
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving user to DB:", error);
    throw error;
  }
}

export async function getUsers(token: any) {
  try {
      const response = await fetch('http://localhost:8080/users', {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          }
      });
      
      if (!response.ok) {
          throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error fetching users:", error);
  }
}
  