'use client'

import { getAllTasks } from "@/service/taskService";
import { useEffect, useState } from "react";
import { Task } from "../models/Task";
import TaskCard from "./TaskCard";
import "./style/CalendarWithTasks.css";
import TaskForm from "./TaskForm";

export default function CalendarWithTasks() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [taskByDate, setTaskByDate] = useState<Record<string, Task[]>>({}); //Tarefas agrupadas por data 
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
    const [showTaskForm, setShowTaskForm] = useState(false); // Controle do formulário

    useEffect(() => {
        fetchTasks();
    }, [currentDate]);

    // Função para buscar as tarefas quando o componete estiver montado ou mudar o mês
    const fetchTasks = async () => {

        try {
            // Buscar as tarefas do mês
            const allTasks = await getAllTasks();
            const taskMap: Record<string, Task[]> = {};

            // Agrupa as tarefas por data
            allTasks.forEach((task) => {
                const date = task.appointmentDate;
                if (!taskMap[date]) {
                    taskMap[date] = [];
                }
                taskMap[date].push(task);
            });

            // Atualizar o state taskByDate
            setTaskByDate(taskMap);

        } catch (error: any) {
            console.error('Erro ao buscar tarefas!', error.response?.data || error.message);
        }
    };

    const getDaysInMonth = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Obtém o primeiro dia do mês corretamente em UTC
        const firstDayOfMonth = new Date(Date.UTC(year, month, 1)).getUTCDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        console.log("Ano:", year, "Mês:", month, "Primeiro dia da semana:", firstDayOfMonth, "Total de dias:", totalDays);

        // Adiciona dias vazios no início para alinhar o primeiro dia do mês
        const daysArray = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push({ date: null, hasTask: false });
        }

        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(Date.UTC(year, month, day)); // Usa UTC para evitar deslocamentos
            const formattedDate = date.toISOString().split("T")[0]; // Garante o formato "YYYY-MM-DD"
            daysArray.push({
                date: formattedDate,
                hasTask: taskByDate[formattedDate] || false,
            });
        }

        while (daysArray.length % 7 !== 0) {
            console.log('daysArray.length', daysArray.length);
            daysArray.push({ date: null, hasTask: false });
        }
        console.log("Número total de células no calendário:", daysArray.length);
        return daysArray;
    };

    // Navegar entre os meses
    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setSelectedDate(null);
    }

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDate(null);
    }

    const handleDayClick = (date: string | null) => {
        if (date) {
            setSelectedDate(date);
            setSelectedTasks(taskByDate[date] || []);
        }
    };

    const handleCloseTaskCards = () => {
        setSelectedTasks([]);
        setSelectedDate(null);
    };

    const handleUpdateTasks = async () => {
        try {
            const allTasks = await getAllTasks();
            const taskMap: Record<string, Task[]> = {};

            allTasks.forEach((task) => {
                const date = task.appointmentDate;
                if (!taskMap[date]) {
                    taskMap[date] = [];
                }
                taskMap[date].push(task);
            });

            setTaskByDate(taskMap);

            if (selectedDate) {
                setSelectedTasks(taskMap[selectedDate] || []);
            }
        } catch (error: any) {
            console.error('Erro ao atualizar tarefas!', error.response?.data || error.message);
        }
    };

    const daysInMonth = getDaysInMonth();

    return (
        <div className="calendar-conteiner">
            <div className="calendar-header">
                <h1>Calendário</h1>

                <div className="calendar-navigation-month">
                    <button onClick={handlePreviousMonth}>
                        Mês Anterior
                    </button>
                    <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                    <button onClick={handleNextMonth}>
                        Próximo Mês
                    </button>
                    <button onClick={() => setShowTaskForm(true)}>Nova Tarefa</button>
                </div>
            </div>
            <div className="calendar-grid-month">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => {
                    console.log(`Dia ${index + 1}: ${day}`);
                    return (
                        <div key={index} className="calendar-weekdays">
                            {day}
                        </div>
                    );
                })}
                {daysInMonth.map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-day ${day.date
                            ? (day.hasTask ? "has-task" : "no-task")
                            : "empty-day"
                            }`}
                        onClick={() => handleDayClick(day.date)}
                    >
                        {day.date && <span>{new Date(day.date).getUTCDate()}</span>} {/* Garante exibição correta */}
                        {day.hasTask && <span className="task-indicator">Task</span>}
                    </div>
                ))}
            </div>

            {showTaskForm && (
                <TaskForm 
                    onSubmit={() => {
                        fetchTasks(); // Atualiza calendário ao cadastrar
                        setShowTaskForm(false);
                    }}
                    onCancel={() => setShowTaskForm(false)}
                />
            )}

            {/* Exibe as tarefas do dia selecionado */}
            {selectedDate && (
                <div>
                    <h2>Tarefas para dia {new Date(selectedDate).getUTCDate()}</h2>
                    <div className="task-container">

                        {selectedTasks.length > 0 ? (
                            selectedTasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onClose={handleCloseTaskCards}
                                    onUpdateTask={handleUpdateTasks} // 🔹 Atualiza após edição/exclusão
                                />
                            ))
                        ) : (
                            <p className="no-tasks-message">Nenhuma tarefa para esta data.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}