import useSWR from "swr";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { getAllTasks } from "../api/task.api";

import type { Task } from "../types/task.type";
import type { AuthContextType } from "../types/auth.type";

import Header from "../components/dashboard/Header";
import ProfileCard from "../components/dashboard/ProfileCard";
import TaskForm from "../components/dashboard/TaskForm";
import TaskList from "../components/dashboard/TaskList";
import TaskToolbar from "../components/dashboard/TaskToolBar";
import { useTaskFilter } from "../hooks/useTaskFilter";

export default function Dashboard() {
  const { user } = useContext(AuthContext) as AuthContextType;
  const { data: tasks } = useSWR<Task[]>("getAllTasks", getAllTasks);

  const { filter, search, filteredData, setFilter, setSearch } =
    useTaskFilter(tasks);

  return (
    <>
      <div className="w-full p-4">
        {/* Header */}
        <Header userName={user?.name as string} />
        {/* Profile */}
        <ProfileCard user={user!} />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-3 my-6">
          {/* Create task form */}
          <TaskForm />
          <div className="col-span-2 w-full overflow-hidden md:mt-0 mt-4 p-1">
            {/* Search and filter functionality */}
            <TaskToolbar
              filter={filter}
              setFilter={setFilter}
              search={search}
              setSearch={setSearch}
            />
            {/* Tasks list */}
            {filteredData.length === 0 && tasks && (
              <TaskList tasks={tasks as Task[]} />
            )}
            {filteredData.length > 0 && (
              <TaskList tasks={filteredData as Task[]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
