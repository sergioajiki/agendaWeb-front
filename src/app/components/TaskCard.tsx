'use client';
import { TaskCardProps } from "../models/Task";
import './style/TaskCard.css';

export default function TaskCard({ task, onClose }: TaskCardProps) {
    return (
        <div className="task-card">
            <h3>{task.title}</h3>
            <p><strong>Descrição:</strong> {task.description}</p>
            <p><strong>Data:</strong> {task.appointmentDate}</p>
            <p><strong>Início:</strong> {task.startTime}</p>
            <p><strong>Término:</strong> {task.endTime}</p>
            <p><strong>Responsável (ID):</strong> {task.userId}</p>
            <button onClick={onClose}>Fechar</button>
        </div>
    );
}