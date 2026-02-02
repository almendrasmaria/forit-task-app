"use client";

import { useState } from "react";
import type { Task } from "@/types";

import PageShell from "@/components/layout/PageShell";
import Header from "@/components/layout/Header";
import TaskToolbar from "@/components/tasks/TaskToolbar";
import TaskList from "@/components/tasks/TaskList";
import TaskModal from "@/components/tasks/TaskModal";

const mockTasks = [
  {
    id: "1",
    title: "Preparar presentación mensual",
    description: "Incluir métricas y proyecciones",
    completed: false,
  },
  {
    id: "2",
    title: "Revisar correos pendientes",
    description: "Responder mensajes importantes",
    completed: true,
  },
] as Task[];

export default function Page() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

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
          <TaskList
            tasks={mockTasks}
            onToggleComplete={() => {}}
            onDelete={() => {}}
          />
        </div>

        <TaskModal
          open={open}
          mode="create"
          onClose={() => setOpen(false)}
          onSubmit={async () => {
            setOpen(false);
          }}
        />
      </div>
    </PageShell>
  );
}