"use client";

import { useMemo, useState } from "react";
import type { Task } from "@/types";

import PageShell from "@/components/layout/PageShell";
import Header from "@/components/layout/Header";
import TaskToolbar from "@/components/tasks/TaskToolbar";
import TaskEmptyState from "@/components/tasks/TaskEmptyState";
import TaskList from "@/components/tasks/TaskList";
import TaskModal from "@/components/tasks/TaskModal";

import { useTasks } from "@/hooks/useTasks";

type CreateTaskInput = Omit<Task, "id" | "created_at" | "updated_at">;

export default function Page() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } =
    useTasks();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter((t) => {
      const title = (t.title ?? "").toLowerCase();
      return title.includes(q);
    });
  }, [tasks, query]);

  const handleCreate = async (values: {
    title: string;
    description?: string;
    completed: boolean;
  }) => {
    await createTask(values as CreateTaskInput);
    setOpen(false);
  };

  return (
    <PageShell>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
        <Header />

        <TaskToolbar
          query={query}
          onQueryChange={setQuery}
          onNewTask={() => setOpen(true)}
        />

        <div className="mt-6">
          {loading ? (
            <p className="text-sm text-white/60">Cargando…</p>
          ) : error ? (
            <p className="text-sm text-red-400">Error: {error}</p>
          ) : filtered.length === 0 ? (
            <TaskEmptyState />
          ) : (
            <TaskList
              tasks={filtered}
              onDelete={(id) => deleteTask(String(id))}
              onToggleComplete={(id, completed) =>
                updateTask(String(id), { completed } as Partial<Task>)
              }
            />
          )}
        </div>

        <TaskModal
          open={open}
          mode="create"
          onClose={() => setOpen(false)}
          onSubmit={handleCreate}
        />
      </div>
    </PageShell>
  );
}