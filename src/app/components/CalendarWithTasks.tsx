'use client'

import { getAllTasks } from "@/service/taskService";
import { useEffect, useState } from "react";
import "./style/CalendarWithTasks.css";
import TaskByDate from "./TaskByDate";

export default function CalendarWithTasks() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [taskByDate, setTaskByDate] = useState<Record<string, boolean>>({}); //Tarefas agrupadas por data 
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    useEffect(() => {
        // Função para buscar as tarefas quando o componete estiver montado ou mudar o mês
        const fetchTasks = async () => {

            try {
                // Buscar as tarefas do mês
                const allTasks = await getAllTasks();
                const taskMap: Record<string, boolean> = {};

                // Agrupa as tarefas por data
                allTasks.forEach((task) => {
                    const date = task.appointmentDate;
                    taskMap[date] = true;
                });

                // Atualizar o state taskByDate
                setTaskByDate(taskMap);

            } catch (error: any) {
                console.error('Erro ao buscar tarefas!', error.response?.data || error.message);
            }
        };
        fetchTasks();
    }, [currentDate]);

    // Função para gerar os dias do mês atual
    const getDaysInMonth = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        // Dia da semana do primeiro dia do mês (0 = Domingo, 6 = Sábado)
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        console.log('firstDayOfMonth', firstDayOfMonth);
        // Número total de dias no mês atual
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        console.log('daysInMonth', daysInMonth);
        const daysArray = [];

        // Adiciona dias vazios no início para alinhar o primeiro dia do mês
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push({ date: null, hasTask: false });
        }

        for (let day = 1; day <= daysInMonth; day++) {

            const date = new Date(Date.UTC(year, month, day)); // Usa UTC para evitar deslocamentos
            const formattedDate = date.toISOString().split("T")[0]; // Garante o formato "YYYY-MM-DD"


            daysArray.push({
                date: formattedDate,
                hasTask: taskByDate[formattedDate] || false,
            });
        }
        return daysArray;
    }

    // Navegar entre os meses
    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setSelectedDate(null);
    }

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDate(null);
    }

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
                </div>
            </div>
            <div className="calendar-grid">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                    <div key={day}
                        className="calendar-weekdays">
                        {day}
                    </div>
                ))}
                {daysInMonth.map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-day ${day.date
                            ? (day.hasTask ? "has-task" : "no-task")
                            : "empty-day"
                            }`}
                        onClick={() => {
                            if (day.date) {
                                console.log(`Dia clicado: ${day.date}`);
                                setSelectedDate(day.date);
                            }
                        }}
                    >
                        {day.date && <span>{new Date(day.date).getUTCDate()}</span>} {/* Garante exibição correta */}
                        {day.hasTask && <span className="task-indicator">Task</span>}
                    </div>
                ))}
            </div>

            {/* Exibe as tarefas do dia selecionado */}
            {selectedDate && (
                <div className="task-by-date">
                    <h1>Tarefas para {new Date(selectedDate).getUTCDate()}</h1>
                    <TaskByDate selectedDate={selectedDate} />
                </div>
            )}

            {/* Contêiner de detalhes das tarefas */}
            {/* {selectedDate && (
                <div className="task-details-container">
                    <h2>Tarefas do dia {selectedDate}</h2>
                    {taskByDate[selectedDate] && taskByDate[selectedDate].length > 0 ? (
                        <ul>
                            {taskByDate[selectedDate].map((task, index) => (
                                <li key={index}>{task.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Não há tarefas para este dia.</p>
                    )}
                    <button onClick={() => setSelectedDate(null)}>Fechar</button>
                </div>
            )} */}
        </div>
    );
}
