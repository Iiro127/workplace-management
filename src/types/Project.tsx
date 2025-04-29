import { User } from "./User.tsx";

export interface Project {
    id: string;
    title: string;
    customer: string;
    dateAdded: string;
    status: string;
    members: Array<User>;
    manager: User;
}