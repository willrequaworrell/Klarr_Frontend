export interface CardType {
    order: number | null;
    title: string
    id: string
    column: 'today' | 'upcoming' | 'optional'
    dueDate: Date
}

export interface TaskFromBackend {
    _id: string;
    column: string;
    createdAt: string;
    dueDate: string;
    title: string;
    updatedAt: string;
    userId: string;
    __v: number;
    [key: string]: any;
}