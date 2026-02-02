"use client";

import { useEffect, useState } from "react";

type FormValues = {
  title: string;
  description?: string;
  completed: boolean;
};

type Props = {
  mode: "create" | "edit";
  initialValues?: FormValues;
  onCancel: () => void;
  onSubmit: (values: FormValues) => void | Promise<void>;
};

export default function TaskForm({
  mode,
  initialValues,
  onCancel,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [completed, setCompleted] = useState(initialValues?.completed ?? false);

  useEffect(() => {
    setTitle(initialValues?.title ?? "");
    setDescription(initialValues?.description ?? "");
    setCompleted(initialValues?.completed ?? false);
  }, [initialValues]);

  const handleSubmit = async () => {
    const payload = {
      title: title.trim(),
      description: description.trim() || undefined,
      completed,
    };
    if (!payload.title) return;
    await onSubmit(payload);
  };

  return (
    <div className="mt-5 space-y-4">
      <div>
        <label className="text-xs text-white/60">Título</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nombre de la tarea"
          className="mt-2 h-11 w-full rounded-xl bg-white/5 px-4 text-sm text-white ring-1 ring-white/10 outline-none placeholder:text-white/35 focus:ring-violet-500/40"
        />
      </div>

      <div>
        <label className="text-xs text-white/60">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Agregá más detalles (opcional)"
          className="mt-2 min-h-[92px] w-full resize-none rounded-xl bg-white/5 px-4 py-3 text-sm text-white ring-1 ring-white/10 outline-none placeholder:text-white/35 focus:ring-violet-500/40"
        />
      </div>

      <label className="flex items-center gap-3 text-sm text-white/70">
        <button
          type="button"
          onClick={() => setCompleted((v) => !v)}
          className={[
            "relative h-5 w-9 rounded-full ring-1 transition",
            completed
              ? "bg-violet-600 ring-violet-400/40"
              : "bg-white/10 ring-white/15",
          ].join(" ")}
        >
          <span
            className={[
              "absolute top-0.5 h-4 w-4 rounded-full bg-white transition",
              completed ? "left-4" : "left-0.5",
            ].join(" ")}
          />
        </button>
        Marcar como completada
      </label>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-xl px-4 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white/80"
        >
          Cancelar
        </button>

        <button
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed"
        >
          {mode === "edit" ? "Guardar" : "Agregar"}
        </button>
      </div>
    </div>
  );
}