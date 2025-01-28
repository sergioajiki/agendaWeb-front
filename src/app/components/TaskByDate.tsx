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

    // const handleDateChange = async (event: ChangeEvent<HTMLInputElement>) => {
    //     const date = event.target.value;
    //     setSelectedDate(date);

    //     try {
    //         const allTasks = await getAllTasks();
    //         const filteredTasks = allTasks.filter(
    //             (task) => task.appointmentDate === date
    //         );

    //         setTasks(filteredTasks);

    //         if (filteredTasks.length === 0) {
    //             setMessage('Nenhuma tarefa encontrada para a data selecionada');
    //         } else {
    //             setMessage(null);
    //         }
    //     } catch (error: any) {
    //         console.error(error.response?.data || error.message);
    //         setMessage('Erro ao buscar tarefas!');
    //     }
    // };

    return (
        <>
            {/* <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                placeholder="Selecione uma data"
            /> */}
            {message && <p className="message">{message}</p>}
            <div className="task-container">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </>
    );
}