import { useEffect, useState } from "react";

import type { Task } from "../types/task.type";


export function useTaskFilter(tasks: Task[] | undefined) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<string>("none");
    const [filteredData, setFilteredData] = useState<Task[]>([]);

    useEffect(() => {
        if (!tasks) return;

        if (search === "" && filter === "none") {
            setFilteredData([]);
            return;
        }

        const result = tasks.filter((each) => {
            const searchMatches =
                search !== ""
                    ? each.title.toLowerCase().includes(search.toLowerCase())
                    : true;

            const filterMatches =
                filter === "none" ? true : each.status === filter;

            return searchMatches && filterMatches;
        });

        setFilteredData(result);
    }, [search, filter, tasks]);

    return {
        search,
        setSearch,
        filter,
        setFilter,
        filteredData,
    };
}
