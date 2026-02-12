import useSWR from "swr";
import { useContext, useState, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";

import { getAllTasks } from "../api/task.api";

import type { Task } from "../types/task.type";
import type { AuthContextType } from "../types/auth.type";

import Header from "../components/dashboard/Header";
import ProfileCard from "../components/dashboard/ProfileCard";
import TaskForm from "../components/dashboard/TaskForm";
import TaskList from "../components/dashboard/TaskList";
import TaskToolbar from "../components/dashboard/TaskToolBar";

export default function Dashboard() {
  const { user } = useContext(AuthContext) as AuthContextType;
  const { data: tasks } = useSWR<Task[]>("getAllTasks", getAllTasks);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("none");

  const [filteredData, setFilteredData] = useState<Task[]>([]);

  useEffect(() => {
    if (tasks === undefined) return;
    if (search == "" && filter === "none") {
      setFilteredData([]);
      return;
    }

    const result = tasks?.filter((each: Task) => {
      const searchMatches = search !== "" ? each?.title.includes(search) : true;
      const filterMatches = filter !== "none" ? each.status === filter : true;

      return searchMatches && filterMatches;
    });

    setFilteredData(result);
  }, [search, filter,tasks]);

  console.log(tasks, filteredData);
  return (
    <>
      <div className="w-full p-4">
        <Header userName={user?.name as string} />
        <ProfileCard user={user!} />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-3 my-6">
          <TaskForm />
          <div className="col-span-2 w-full overflow-hidden md:mt-0 mt-4 p-1">
            <TaskToolbar
              filter={filter}
              setFilter={setFilter}
              search={search}
              setSearch={setSearch}
            />
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
