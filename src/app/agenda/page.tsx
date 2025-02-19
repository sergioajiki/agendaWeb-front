'use client';

import { useState } from "react";
import CalendarWithTasks from "../components/CalendarWithTasks";
import WeeklyCalendar from "../components/WeeklyCalendar";
import TaskForm from "../components/TaskForm";
import './style/agenda.css';

export default function AgendaPage() {
    const [viewMode, setViewMode] = useState<"monthly" | "weekly">("weekly");
    const [showTaskForm, setShowTaskForm] = useState(false);

    const handleViewChange = (mode: "monthly" | "weekly") => {
        setViewMode(mode);
    };

    const handleTaskFormSubmit = () => {
        setShowTaskForm(false); // Oculta o formulário após o cadastro
    };

    const handleTaskFormCancel = () => {
        setShowTaskForm(false); // Oculta o formulário ao clicar em "Fechar"
    };

    return (
        <div className="agenda-page">
            <div className="view-selector">
                <button
                    className={viewMode === "monthly" ? "active" : ""}
                    onClick={() => handleViewChange("monthly")}
                >
                    Agenda Mensal
                </button>
                <button
                    className={viewMode === "weekly" ? "active" : ""}
                    onClick={() => handleViewChange("weekly")}
                >
                    Agenda Semanal
                </button>
            </div>

            <div className="agenda-content">
                {showTaskForm && (
                    <TaskForm
                        onSubmit={handleTaskFormSubmit}
                        onCancel={handleTaskFormCancel} />
                )}
                {viewMode === "monthly" && (
                    <>
                        <h1>Agenda Mensal</h1>
                        <CalendarWithTasks />
                    </>
                )}
                {viewMode === "weekly" && (
                    <>
                        <h1>Agenda Semanal</h1>
                        <WeeklyCalendar />
                    </>
                )}
            </div>
        </div>
    );
}
