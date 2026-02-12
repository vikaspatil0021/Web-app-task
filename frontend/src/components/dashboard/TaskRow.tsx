
import { deleteTask, updateTask } from "../../api/task.api";

import type { TaskRowProps } from "../../types/task.type";
import { useTaskRow } from "../../hooks/useTaskRow";

const TaskRow = ({ task, index }: TaskRowProps) => {
  const isEven = index % 2 === 0;

  const {
    isEditing,
    editedTask,
    handleEdit,
    handleChange,
    handleCancel,
    handleSave,
    handleDelete,
  } = useTaskRow(task, { deleteTask, updateTask });

  return (
    <div
      className={`grid grid-cols-12 px-5 py-4 text-sm items-center transition
    ${isEven ? "bg-gray-100" : "bg-white"}`}
    >
      {/* Title */}
      <div className="col-span-3 font-medium text-gray-900 truncate">
        {isEditing ? (
          <input
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        ) : (
          task.title
        )}
      </div>

      {/* Description */}
      <div className="col-span-5 text-gray-500 pe-5">
        {isEditing ? (
          <input
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        ) : (
          <span className="truncate block">{task.description}</span>
        )}
      </div>

      {/* Status */}
      <div className="col-span-2">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            task.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* Actions */}
      <div className="col-span-2 text-right space-x-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800 text-xs cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-black text-xs cursor-pointer"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="text-gray-500 hover:text-black text-xs cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-500 hover:text-red-600 text-xs cursor-pointer"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskRow;
