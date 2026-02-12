import { useState } from "react";
import { mutate } from "swr";
import type { Task, TaskApiFnProps } from "../types/task.type";

export function useTaskRow(task:Task, { deleteTask, updateTask }:TaskApiFnProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
        title: task.title,
        description: task.description,
    });

    const handleEdit = () => setIsEditing(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTask(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCancel = () => {
        setEditedTask({ title: task.title, description: task.description });
        setIsEditing(false);
    };

    const handleSave = async () => {
        await updateTask(task._id, editedTask);
        mutate("getAllTasks");
        setIsEditing(false);
    };

    const handleDelete = async () => {
        await deleteTask(task._id);
        mutate("getAllTasks");
    };

    return {
        isEditing,
        editedTask,
        handleEdit,
        handleChange,
        handleCancel,
        handleSave,
        handleDelete,
    };
}
