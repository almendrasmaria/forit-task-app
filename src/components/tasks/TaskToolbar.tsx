"use client";

import { FiPlus } from "react-icons/fi";
import TaskSearch from "./TaskSearch";
import TaskFilters from "./TaskFilters";

type Filter = "all" | "pending" | "completed";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  onNewTask: () => void;
  filter: Filter;
  onFilterChange: (value: Filter) => void;
};

export default function TaskToolbar({
  query,
  onQueryChange,
  onNewTask,
  filter,
  onFilterChange,
}: Props) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TaskSearch value={query} onChange={onQueryChange} />

        <button
          onClick={onNewTask}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-medium text-white shadow-sm shadow-violet-600/25 transition hover:bg-violet-500"
        >
          <FiPlus className="text-base" />
          Nueva tarea
        </button>
      </div>

      <TaskFilters value={filter} onChange={onFilterChange} />
    </div>
  );
}