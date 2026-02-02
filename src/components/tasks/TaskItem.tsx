import type { Task } from "@/types";
import { FiCheck, FiEdit2, FiTrash2 } from "react-icons/fi";

type Props = {
  task: Task;
  onToggleComplete: (id: Task["id"], completed: boolean) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: Task["id"]) => void;
};

export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }: Props) {
  const completed = Boolean((task as any).completed);

  return (
    <div
      className={[
        "flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-4 ring-1 ring-white/10",
        "transition hover:bg-white/7 hover:ring-white/15",
      ].join(" ")}
    >
      <button
        onClick={() => onToggleComplete(task.id, !completed)}
        className={[
          "mt-1 flex h-6 w-6 items-center justify-center rounded-full ring-1 transition",
          completed
            ? "bg-violet-600 ring-violet-400/50"
            : "bg-transparent ring-white/25 hover:ring-white/40",
        ].join(" ")}
      >
        {completed ? <FiCheck className="text-sm text-white" /> : null}
      </button>

      <button type="button" onClick={() => onEdit?.(task)} className="flex-1 text-left">
        <p
          className={[
            "text-sm font-medium",
            completed ? "text-white/35 line-through" : "text-white",
          ].join(" ")}
        >
          {task.title}
        </p>

        {task.description ? (
          <p
            className={[
              "mt-1 text-xs leading-relaxed",
              completed ? "text-white/25" : "text-white/55",
            ].join(" ")}
          >
            {task.description}
          </p>
        ) : null}
      </button>

      <div className="mt-0.5 flex items-center gap-1">
        {onEdit ? (
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg p-2 text-white/45 transition hover:bg-white/5 hover:text-white/80"
          >
            <FiEdit2 className="text-base" />
          </button>
        ) : null}

        {onDelete ? (
          <button
            onClick={() => onDelete(task.id)}
            className="rounded-lg p-2 text-white/45 transition hover:bg-white/5 hover:text-white/80"
          >
            <FiTrash2 className="text-base" />
          </button>
        ) : null}
      </div>
    </div>
  );
}