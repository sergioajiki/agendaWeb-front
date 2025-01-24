import TaskByDate from "../componets/TaskByDate";
import TaskForm from "../componets/TaskForm";

export default function AgendaPage() { 
    return (
        <div>
            <h1>Cadastro de Tarefas</h1>
            <TaskForm />
            <h1>Tarefas</h1>
            <TaskByDate />
        </div>
    );
}