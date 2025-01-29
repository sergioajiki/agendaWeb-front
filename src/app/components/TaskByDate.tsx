'use client';
import { ChangeEvent, use, useEffect, useState } from "react";
import { Task, TaskByDateProps } from "../models/Task";
import { getAllTasks } from "@/service/taskService";
import TaskCard from "./TaskCard";
import './style/TaskByDate.css';

export default function TaskByDate({ selectedDate }: TaskByDateProps) {
    //const [selectedDate, setSelectedDate] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const allTasks = await getAllTasks();
                const filteredTasks = allTasks.filter((task) => task.appointmentDate === selectedDate);
                setTasks(filteredTasks);

                if (filteredTasks.length === 0) {
                    setMessage('Nenhuma tarefa encontrada para a data selecionada');
                } else {
                    setMessage(null);
                }
            } catch (error: any) {
                console.error(error.response?.data || error.message);
                setMessage('Erro ao buscar tarefas!');
            }
        };
        fetchTasks();
    }, [selectedDate]);

    const handleCloseTaskCard = () => {
        setSelectedTask(null); // Fecha o TaskCard
    };
    return (
        <>
            {message && <p className="message">{message}</p>}
            <div className="task-container">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} onClose={handleCloseTaskCard} />
                ))}
            </div>
        </>
    );
}