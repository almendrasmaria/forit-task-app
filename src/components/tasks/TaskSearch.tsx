"use client";

import { FiSearch } from "react-icons/fi";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function TaskSearch({ value, onChange }: Props) {
  return (
    <div className="flex h-12 w-full items-center gap-2 rounded-xl bg-white/5 px-4 ring-1 ring-white/10 focus-within:ring-violet-500/40 sm:max-w-130]">
      <FiSearch className="text-white/50" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar tarea…"
        className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
      />
    </div>
  );
}