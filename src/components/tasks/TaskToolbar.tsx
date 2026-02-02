"use client";

import { FiPlus } from "react-icons/fi";
import TaskSearch from "./TaskSearch";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  onNewTask: () => void;
};

export default function TaskToolbar({ query, onQueryChange, onNewTask }: Props) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <TaskSearch value={query} onChange={onQueryChange} />

      <button
        onClick={onNewTask}
        className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-medium text-white shadow-sm shadow-violet-600/25 transition hover:bg-violet-500"
      >
        <FiPlus className="text-base" />
        Nueva tarea
      </button>

    </div>
  );
}