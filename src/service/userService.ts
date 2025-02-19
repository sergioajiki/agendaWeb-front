import { User } from "@/app/models/User";
import api from "./api";

export const createUser = async (user: User): Promise<any> => {
    try {
        const response = await api.post('/api/users', user);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao cadastrar usuário!", error.response?.data || error.message);
        throw new Error("Erro ao cadastrar usuário");
    }
};