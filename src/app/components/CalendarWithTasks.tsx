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
        const firstDayOfMonth = new Date(year, month, 0).getDay() + 1;
        console.log('firstDayOfMonth', firstDayOfMonth);
        // Dia da semana do primeiro dia do mês
        const daysInMonth = new Date(year, month + 1, 0).getDate() + 1;
        console.log('daysInMonth', daysInMonth);
        const daysArray = [];

        // Adiciona dias vazios no início para alinhar o primeiro dia do mês
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push({ date: null, hasTask: false });
        }

        for (let day = 2; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            console.log('date', date);
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
                        className={`calendar-day ${day.hasTask
                                ? (day.hasTask ? 'has-task' : 'no-task')
                                : 'empty-day'
                            }`}
                    >
                        {day.date && <span>{new Date(day.date).getDate()}</span>}
                        {day.hasTask && <span className="task-indicator">Task</span>}
                    </div>
                ))}
            </div>
        </div>

    );
}
