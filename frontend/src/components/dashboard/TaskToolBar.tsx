import type { TaskToolbarProps } from "../../types/task.type";


export default function TaskToolbar({
  search,
  setSearch,
  filter,
  setFilter,
}: TaskToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-black/20 rounded-lg px-3 py-2 w-48 md:w-56 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
      />

      {/* Filter */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-black/20 text-sm rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        <option value="none" className="rounded-2xl">
          None
        </option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
