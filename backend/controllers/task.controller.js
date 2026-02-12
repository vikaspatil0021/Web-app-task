import Task from "../models/task.model.js";

import { createTaskSchema, updateTaskSchema } from "../zod/task.schema.js";

export const createTask = async (req, res) => {
  try {
    const body = createTaskSchema.parse(req.body);
    const task = await Task.create({
      ...body,
      user: req.user.id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: JSON.parse(err.message) });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: JSON.parse(err.message) });
  }
};

export const updateTask = async (req, res) => {
  try {
    const body = updateTaskSchema.parse(req.body);

    const task = await Task.findOneAndUpdate({ _id: req.params.id }, body, {
      new: true,
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: JSON.parse(err.message) });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: JSON.parse(err.message) });
  }
};
