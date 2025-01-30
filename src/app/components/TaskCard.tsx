'use client';
import { deleteTask } from "@/service/taskService";
import { TaskCardProps } from "../models/Task";
import './style/TaskCard.css';

export default function TaskCard({ task, onClose, onUpdateTask }: TaskCardProps) {
    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            `Tem certeza que deseja apagar a tarefa "${task.title}"?`
        );
        if (!confirmDelete) {
            return;
        }

        try {
            if (task.id) {
                await deleteTask(task.id);
            } else {
                alert("Erro: ID da tarefa não encontrado!");
            }
            alert("Tarefa apagada com sucesso!");
            onUpdateTask();
            onClose();
        } catch (error: any) {
            console.error(error.response?.data || error.message);
            alert("Erro ao apagar tarefa!");
        }
    };

    return (
        <div className="task-card">
            <h3>{task.title}</h3>
            <p><strong>Descrição:</strong> {task.description}</p>
            <p><strong>Data:</strong> {task.appointmentDate}</p>
            <p><strong>Início:</strong> {task.startTime}</p>
            <p><strong>Término:</strong> {task.endTime}</p>
            <p><strong>Responsável (ID):</strong> {task.userId}</p>
            <button onClick={handleDelete} className="delete-button">Apagar</button>
            <button onClick={onClose} className="close-button">Fechar</button>
        </div>
    );
}