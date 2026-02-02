"use client";

import TaskForm from "./TaskForm";

type Props = {
  open: boolean;
  mode: "create" | "edit";
  initialValues?: {
    title: string;
    description?: string;
    completed: boolean;
  };
  onClose: () => void;
  onSubmit: (values: {
    title: string;
    description?: string;
    completed: boolean;
  }) => void | Promise<void>;
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
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Cerrar"
      />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900/90 p-6 shadow-2xl shadow-black/40">
        <h2 className="text-lg font-semibold text-white">
          {mode === "edit" ? "Editar tarea" : "Nueva tarea"}
        </h2>

        <TaskForm
          mode={mode}
          initialValues={initialValues}
          onCancel={onClose}
          onSubmit={async (values) => {
            await onSubmit(values);
            onClose();
          }}
        />
      </div>
    </div>
  );
}