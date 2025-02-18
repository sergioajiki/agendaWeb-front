'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { Task } from "../models/Task";
import { createTask } from "@/service/taskService";
import './style/TaskForm.css';

interface TaskFormProps {
    onSubmit: () => void;
    onCancel: () => void;
}

export default function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
    const [formData, setFormData] = useState<Task>({
        title: '',
        description: '',
        appointmentDate: '',
        startTime: '',
        endTime: '',
        userId: ''
    });

    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            appointmentDate: event.target.value,
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage(null);
        try {
            await createTask(formData);
            setMessage('Tarefa cadastrada com sucesso!');
            setFormData({
                title: '',
                description: '',
                appointmentDate: '',
                startTime: '',
                endTime: '',
                userId: ''
            });
            onSubmit(); // Notifica a página de agenda que o formulário foi enviado
        } catch (error: any) {
            const errorMessage = error.response?.data?.status || 'Erro ao cadastrar tarefa';
            // console.log('meow', errorMessage);
            console.error(error.response);
            setMessage(errorMessage)
        }
    };
    return (
        <>
            <div className="task-form-container">
                <h1>Cadastro de Tarefas</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        placeholder="Descrição"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleDateChange}
                    />
                    <div className="time-fields-container">
                        <input
                            type="time"
                            name="startTime"
                            placeholder="Hora de início"
                            value={formData.startTime}
                            onChange={handleChange}
                        />
                        <input
                            type="time"
                            name="endTime"
                            placeholder="Hora de término"
                            value={formData.endTime}
                            onChange={handleChange}
                        />

                    </ div>
                    <input
                        type="text"
                        name="userId"
                        placeholder="userId"
                        value={formData.userId}
                        onChange={handleChange}
                    />
                    <button type="submit">Cadastrar</button>
                    
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onCancel}
                    >
                        Fechar
                    </button>
                </form >
                {message && <p>{message}</p>
                }
            </div >
        </>
    );
}