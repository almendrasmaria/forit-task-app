import { FiClipboard } from "react-icons/fi";

export default function TaskEmptyState() {
  return (
    <div className="mt-20 flex flex-col items-center text-center">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-white/5 blur-sm" />
        <div className="absolute inset-4 rounded-full bg-white/5" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-600/25 ring-1 ring-violet-500/40">
          <FiClipboard className="text-2xl text-violet-300" />
        </div>
      </div>

      <h3 className="mt-8 text-xl font-semibold text-white">
        No hay tareas aún
      </h3>

      <p className="mt-3 max-w-sm text-base leading-relaxed text-white/55">
        Tu lista está despejada. ¡Es un buen momento para empezar algo nuevo!
      </p>
    </div>
  );
}