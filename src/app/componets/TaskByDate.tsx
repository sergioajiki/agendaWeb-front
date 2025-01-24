'use client';
import { ChangeEvent, useState } from "react";
import { Task } from "../models/Task";
import { getAllTasks } from "@/service/taskService";

export default function TaskByDate() {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [message, setMessage] = useState<string | null>(null);

    const handleDateChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value;
        setSelectedDate(date);

        try {
            const allTasks = await getAllTasks();
            const filteredTasks = allTasks.filter(
                (task) => task.appointmentDate === date
            );

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

    return (
        <>
            <h1>TaskByDate</h1>
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                placeholder="Selecione uma data"
            />
            {message && <p>{message}</p>}
            <div>
                {tasks.map((task) => (
                    //alterar o back para retornar o id da task e substitur o title por id na Key
                    <div key={task.title}>
                        <h3>{task.id} - {task.title}</h3>
                        <p><strong>Descrição:</strong> {task.description}</p>
                        <p><strong>Data:</strong> {task.appointmentDate}</p>
                        <p><strong>Hora de Início:</strong> {task.startTime}</p>
                        <p><strong>Hora de Término:</strong> {task.endTime}</p>
                        {task.userId && <p><strong>Responsável (ID):</strong> {task.userId}</p>}
                    </div>
                ))}
            </div>
        </>
    );
}