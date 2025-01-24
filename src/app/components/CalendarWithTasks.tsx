'use client'

import { getAllTasks } from "@/service/taskService";
import { useEffect, useState } from "react";
import "./CalendarWithTasks.css";

export default function CalendarWithTasks() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [taskByDate, setTaskByDate] = useState<Record<string, boolean>>({}); //Tarefas agrupadas por data 

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
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysArray = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const formattedDate = date.toISOString().split('T')[0];

            daysArray.push({
                date: formattedDate,
                hasTask: taskByDate[formattedDate] || false,
            });
        }
        return daysArray;
    }

    // Navegar entre os meses
    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    }

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    }

    const daysInMonth = getDaysInMonth();

    return (
        <div className="calendar-conteiner">
            <div className="calendar-header">
                
                <div className="calendar-navigation-month">
                    <button onClick={handlePreviousMonth}>
                        Mês Anterior
                    </button>
                    <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                    <button onClick={handleNextMonth}>
                        Próximo Mês
                    </button>
                </div>
                <div className="calendar-grid">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                        <div key={day}
                            className="calendar-weekdays">
                            {day}
                        </div>
                    ))}
                    {daysInMonth.map((day) => (
                        <div
                            key={day.date}
                            className={`calendar-day ${day.hasTask ? 'has-tasks' : 'no-tasks'}`}
                        >
                            <span>{day.date.split('-')[2]}</span>
                            {day.hasTask && <span>Task</span>}
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    );
}
