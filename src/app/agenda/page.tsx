import CalendarWithTasks from "../components/CalendarWithTasks";
import TaskByDate from "../components/TaskByDate";
import TaskForm from "../components/TaskForm";
import './agenda.css';

export default function AgendaPage() {
    return (
        <div className="agenda-page">
            <div className="task-form-container">
                <TaskForm />
            </div>
            <div className="calendar-container">
                <CalendarWithTasks />
            </div>
            {/* <h1>Tarefas</h1>
            <TaskByDate /> */}
        </div>
    );
}