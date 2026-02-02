"use client";

import { useState } from "react";

import PageShell from "@/components/layout/PageShell";
import Header from "@/components/layout/Header";
import TaskToolbar from "@/components/tasks/TaskToolbar";

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
      </div>
    </PageShell>
  );
}