export interface Task {
    id?: string;
    title: string;
    description: string;
    appointmentDate: Date;
    startTime: string;
    endTime: string;
    userId: string;
}