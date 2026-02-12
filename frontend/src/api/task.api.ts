import type { CreateTaskFormData, UpdateTaskFormData } from "../zod/task.schema";
import API from "./Axios";

export const createTask = async (data: CreateTaskFormData) => {
    const res = await API.post("/task", data);
    return res.data;
};

export const getAllTasks = async () => {
    const res = await API.get("/task");
    return res.data;
};

export const deleteTask = async (id: string) => {
    const res = await API.delete(`/task/${id}`);
    return res.data;
};

export const updateTask = async (id: string, data: UpdateTaskFormData) => {
    const res = await API.put(`/task/${id}`, data);
    return res.data;
};