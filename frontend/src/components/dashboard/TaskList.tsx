import TaskRow from "./TaskRow";

import type { Task } from "../../types/task.type";

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <div className="w-full h-fit bg-white border border-black/10 rounded-xl shadow-sm overflow-x-scroll md:overflow-auto">
      {/* Table Header */}
      <div className="min-w-lg grid grid-cols-12 px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
        <div className="col-span-3">Title</div>
        <div className="col-span-5">Description</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Rows */}
      <div className=" min-w-lg divide-y divide-gray-100">
        {tasks.map((task, index) => (
          <TaskRow
            key={task._id}
            task={task}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
