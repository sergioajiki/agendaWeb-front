export interface Task {
    title: string;
    description: string;
    appointmentDate: Date;
    startTime: string;
    endTime: string;
    userId?: string;
}