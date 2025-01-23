export interface CardType {
    userId?: string
    order: number | null
    title: string
    id: string
    column: 'today' | 'upcoming' | 'optional'
    dueDate: Date | null
    createdAt?: Date
    updatedAt?: Date
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

export interface DatePickerModalPropsType {
    showDatePicker: boolean
    setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>
}