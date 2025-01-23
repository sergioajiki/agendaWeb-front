import api from "./api";

export const healthService = async () => {
    try{

        const health =  await api.get('/api/health');
        return health.data;
    } catch (error) {
        console.error("Erro ao obter informações de health", error);
        throw new Error("Não foi possível carregar os dados do serviço de health");
    }
};