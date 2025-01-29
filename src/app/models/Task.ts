export interface Task {
    id?: string;
    title: string;
    description: string;
    appointmentDate: string;
    startTime: string;
    endTime: string;
    userId: string;
}

export interface TaskCardProps {
    task: Task;
    onClose: () => void;
}

export interface TaskByDateProps {
    selectedDate: string;
}