'use client'

import { useEffect, useState } from 'react';
import { getAllTasks } from '@/service/taskService';
import TaskCard from './TaskCard';
import './style/WeeklyCalendar.css';

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export default function WeeklyCalendar() {
    const [selectedTask, setSelectedTask] = useState<any | null>(null);
    const [tasks, setTasks] = useState<Record<string, any[]>>({});
    const [currentWeek, setCurrentWeek] = useState<Date[]>([]);

    // Inicializa os dias da semana atual
    useEffect(() => {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const week = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            return date;
        });
        setCurrentWeek(week);
    }, []);

    // Busca tarefas do backend    
    const fetchTasks = async () => {
        try {
            const allTasks = await getAllTasks();
            const taskMap: Record<string, any[]> = {};

            allTasks.forEach((task) => {
                const dateTimeKey = `${task.appointmentDate}T${task.startTime}`;
                if (!taskMap[dateTimeKey]) taskMap[dateTimeKey] = [];
                taskMap[dateTimeKey].push(task);
            });

            setTasks(taskMap);
        } catch (error) {
            console.error("Erro ao carregar tarefas:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [currentWeek]); // Atualiza as tarefas ao mudar de semana

    const handleTaskClick = (task: any) => {
        setSelectedTask(task); // Atualiza o estado da tarefa selecionada
    };

    const handleCloseTaskCard = () => {
        setSelectedTask(null); // Fecha o card da tarefa
    };

    // Renderiza a grade do calendário semanal
    const renderGrid = () => {
        const hours = Array.from({ length: 24 }, (_, i) => i); // Horas de 0 a 23
        return hours.map((hour) => (
            <div key={hour} className="calendar-row">
                <div className="hour-cell">{`${hour}:00`}</div>
                {currentWeek.map((day) => {
                    const dateKey = `${day.toISOString().split('T')[0]}T${String(hour).padStart(2, '0')}:00`;
                    const tasksForSlot = tasks[dateKey] || [];
                    return (
                        <div key={day.toISOString()} className="day-cell">
                            {tasksForSlot.map((task, index) => (
                                <div
                                    key={index}
                                    className="task"
                                    onClick={() => handleTaskClick(task)}
                                >
                                    {task.title}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        ));
    };

    // Navegação entre semanas
    const handlePreviousWeek = () => {
        setCurrentWeek((prevWeek) =>
            prevWeek.map((day) => new Date(day.getFullYear(), day.getMonth(), day.getDate() - 7))
        );
    };
    
    const handleNextWeek = () => {
        setCurrentWeek((prevWeek) =>
            prevWeek.map((day) => new Date(day.getFullYear(), day.getMonth(), day.getDate() + 7))
        );
    };

    console.log("currentWeek", currentWeek.map(d => d.toISOString().split("T")[0]));

    console.log("Tarefas carregadas:", tasks);

    return (
        <div className="weekly-calendar-container">
            <div className="calendar-header">
                <button onClick={handlePreviousWeek}>Semana Anterior</button>
                <span>
                    Semana de {currentWeek[0]?.toLocaleDateString()} a{" "}
                    {currentWeek[6]?.toLocaleDateString()}
                </span>
                <button onClick={handleNextWeek}>Próxima Semana</button>
            </div>
            <div className="calendar-grid-week">
                <div className="calendar-row">
                    <div className="hour-cell"></div>
                    {currentWeek.map((day, index) => (
                        <div key={index} className="day-header">
                            <span>{`${day.toLocaleDateString("pt-BR", {
                                weekday: "short",
                                day: "numeric",
                            })}`}</span>
                        </div>
                    ))}
                </div>
                {renderGrid()}
            </div>
            {selectedTask && <TaskCard
                task={selectedTask}
                onClose={handleCloseTaskCard}
                onUpdateTask={fetchTasks}
            />}
        </div>
    );
}