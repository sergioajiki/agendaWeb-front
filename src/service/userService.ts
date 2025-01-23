import { User } from "@/app/models/User";
import api from "./api";

export const createUser = async (user: User): Promise<any> => {
    const response = await api.post('/api/users', user);
    return response.data;
};