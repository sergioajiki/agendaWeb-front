import { Task } from "@/app/models/Task";
import api from "./api";

export const createTask = async (task: Task): Promise<any> => {
  try {
    const response = await api.post('/api/tasks', task);
    return response.data as Task[];
  } catch (error: any) {
    console.error("Erro ao cadastrar tarefa!", error.response?.data.detail);
    throw new Error(error.response?.data.detail ||"Erro ao cadastrar tarefa");
  }
}; 

export const getAllTasks = async (): Promise<Task[]> => { 
  try {
    const response = await api.get('/api/tasks');
    const tasks = response.data as Task[];
    return tasks;
  } catch (error: any) {
    console.error("Erro ao buscar tarefas!", error.response?.data || error.message);
    throw new Error("Erro ao buscar tarefas");
  }
}

export const getTaskById = async (id: string): Promise<Task> => {
  try {
    const response = await api.get(`/api/tasks/${id}`);
    return response.data as Task;
  } catch (error: any) {
    console.error("Erro ao buscar tarefa!", error.response?.data || error.message);
    throw new Error("Erro ao buscar tarefa");
  }
}

export const updateTask = async (task: Task): Promise<any> => {
  try {
    const response = await api.put(`/api/tasks/${task.id}`, task);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar tarefa!", error.response?.data || error.message);
    throw new Error("Erro ao atualizar tarefa");
  }
}

export const deleteTask = async (id: string): Promise<any> => {
  try {
    const response = await api.delete(`/api/tasks/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao deletar tarefa!", error.response?.data || error.message);
    throw new Error("Erro ao deletar tarefa");
  }
}