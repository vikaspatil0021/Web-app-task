import type { UpdateTaskFormData } from "../zod/task.schema";

export interface Task {
    _id: string,
    title: string,
    description: string,
    status: "pending" | "completed"
}

export interface TaskToolbarProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
};

export interface TaskRowProps {
    task: Task;
    index: number;
}

export interface TaskApiFnProps {
    deleteTask: (id: string) => Promise<any>,
    updateTask: (id: string, data: UpdateTaskFormData) => Promise<any>
}