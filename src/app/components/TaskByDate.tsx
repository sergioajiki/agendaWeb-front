'use client';
import { ChangeEvent, use, useEffect, useState } from "react";
import { Task, TaskByDateProps } from "../models/Task";
import { getAllTasks } from "@/service/taskService";
import TaskCard from "./TaskCard";
import './style/TaskByDate.css';

export default function TaskByDate({ selectedDate, onSelectTask, fetchTasks }: TaskByDateProps) {
    //const [selectedDate, setSelectedDate] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTasksForDate = async () => {
            try {
                const allTasks = await getAllTasks();
                const tasksForDate = allTasks.filter((task) => task.appointmentDate === selectedDate);
                setTasks(tasksForDate);

                if (tasksForDate.length === 0) {
                    setMessage('Nenhuma tarefa encontrada para a data selecionada');
                } else {
                    setMessage(null);
                }
            } catch (error: any) {
                console.error(error.response?.data || error.message);
                setMessage('Erro ao buscar tarefas!');
            }
        };
        fetchTasksForDate();
    }, [selectedDate, fetchTasks]);

    const handleCloseTaskCard = () => {
        setSelectedTask(null); // Fecha o TaskCard
    };
    return (
        <>
            {message && <p className="message">{message}</p>}
            <div className="task-container">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        onClick={() => onSelectTask(task)}
                    >
                        {task.title}
                    </div>
                ))}
            </div>
            {selectedTask && (
                <TaskCard
                    task={selectedTask}
                    onClose={handleCloseTaskCard}
                    onUpdateTask={fetchTasks}
                />
            )}

        </>
    );
}