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
type Filter = "all" | "pending" | "completed";

export default function Page() {
  const { tasks, error, createTask, updateTask, deleteTask } = useTasks();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const byStatus = tasks.filter((t) => {
      const done = Boolean(t.completed);
      if (filter === "all") return true;
      if (filter === "pending") return !done;
      return done;
    });

    if (!q) return byStatus;

    return byStatus.filter((t) => (t.title ?? "").toLowerCase().includes(q));
  }, [tasks, query, filter]);

  const openCreate = () => {
    setMode("create");
    setEditingTask(null);
    setOpen(true);
  };

  const openEdit = (task: Task) => {
    setMode("edit");
    setEditingTask(task);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditingTask(null);
    setMode("create");
  };

  const handleCreate = async (values: {
    title: string;
    description?: string;
    completed: boolean;
  }) => {
    await createTask(values as CreateTaskInput);
    closeModal();
  };

  const handleEdit = async (values: {
    title: string;
    description?: string;
    completed: boolean;
  }) => {
    if (!editingTask) return;
    await updateTask(String(editingTask.id), values as Partial<Task>);
    closeModal();
  };

  return (
    <PageShell>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
        <Header />

        <TaskToolbar
          query={query}
          onQueryChange={setQuery}
          onNewTask={openCreate}
          filter={filter}
          onFilterChange={setFilter}
        />

        <div className="mt-6">
          {error ? (
            <p className="text-sm text-red-400">Error: {error}</p>
          ) : filtered.length === 0 ? (
            <TaskEmptyState />
          ) : (
            <TaskList
              tasks={filtered}
              onEdit={openEdit}
              onDelete={(id) => deleteTask(String(id))}
              onToggleComplete={(id, completed) =>
                updateTask(String(id), { completed } as Partial<Task>)
              }
            />
          )}
        </div>

        <TaskModal
          open={open}
          mode={mode}
          initialValues={
            mode === "edit" && editingTask
              ? {
                  title: editingTask.title,
                  description:
                    editingTask.description === null
                      ? undefined
                      : editingTask.description,
                  completed: Boolean(editingTask.completed),
                }
              : undefined
          }
          onClose={closeModal}
          onSubmit={mode === "edit" ? handleEdit : handleCreate}
        />
      </div>
    </PageShell>
  );
}