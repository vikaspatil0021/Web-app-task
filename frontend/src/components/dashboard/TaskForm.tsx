import { mutate } from "swr/_internal";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createTaskSchema,
  type CreateTaskFormData,
} from "../../zod/task.schema";

import { createTask } from "../../api/task.api";

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      status: "pending",
    },
  });

  const onSubmit = async (data: CreateTaskFormData) => {
    await createTask(data);
    mutate("getAllTasks");
    reset();
  };

  return (
    <div className="w-full h-fit max-w-lg bg-white border border-black/10 rounded-xl shadow-sm p-6 mx-auto">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-5">
        Create Task
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Task title"
            {...register("title")}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            placeholder="Task description"
            rows={3}
            {...register("description")}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Status + Submit */}
        <div className="flex items-center justify-between">
          <select
            {...register("status")}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? "Adding..." : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
