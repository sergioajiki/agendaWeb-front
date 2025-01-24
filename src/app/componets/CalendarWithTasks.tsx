'use client'

import { getAllTasks } from "@/service/taskService";
import { use, useEffect, useState } from "react";

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
        <div>
            <h1>CalendarWithTasks</h1>
            <div>
                <button onClick={handlePreviousMonth}>Mês Anterior</button>
                <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <button onClick={handleNextMonth}>Próximo Mês</button>
            </div>
            <div>
                {daysInMonth.map((day) => (
                    <div                    
                     key={day.date}
                     style={{
                        border: '1px solid #ddd',
                        padding: '10px',
                        textAlign: 'center',
                        backgroundColor: day.hasTask ? '#d4edda' : '#f8d7da', // Verde se houver tarefas, vermelho se não
                    }}
                     >
                        <span>{day.date}</span>
                        {day.hasTask && <span>Tem tarefa</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}
