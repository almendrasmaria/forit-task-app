"use client";

import TaskForm from "@/components/tasks/TaskForm";

type FormValues = {
  title: string;
  description?: string;
  completed: boolean;
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  initialValues?: FormValues;
  onClose: () => void;
  onSubmit: (values: FormValues) => void | Promise<void>;
};

export default function TaskModal({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#171717] p-6 shadow-2xl shadow-black/40">
        <h3 className="text-lg font-semibold text-white">
          {mode === "edit" ? "Editar tarea" : "Nueva tarea"}
        </h3>

        <TaskForm
          mode={mode}
          initialValues={initialValues}
          onCancel={onClose}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}