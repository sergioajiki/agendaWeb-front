import CalendarWithTasks from "../components/CalendarWithTasks";
import TaskByDate from "../components/TaskByDate";
import TaskForm from "../components/TaskForm";

export default function AgendaPage() { 
    return (
        <div>
            <h1>Cadastro de Tarefas</h1>
            <TaskForm />
            <h1>Calendário</h1>
            <CalendarWithTasks />
            {/* <h1>Tarefas</h1>
            <TaskByDate /> */}
        </div>
    );
}