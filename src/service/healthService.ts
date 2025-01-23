import { HealthData } from "@/app/models/Health";
import api from "./api";

export const healthService = async (): Promise<HealthData> => {
    try {
        const health = await api.get('/api/health');
        return health.data as HealthData;
    } catch (error) {
        console.error("Erro ao obter informações de health", error);
        throw new Error("Não foi possível carregar os dados do serviço de health");
    }
};