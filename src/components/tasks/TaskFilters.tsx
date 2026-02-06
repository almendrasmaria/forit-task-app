type Filter = "all" | "pending" | "completed";

type Props = {
  value: Filter;
  onChange: (value: Filter) => void;
};

export default function TaskFilters({ value, onChange }: Props) {
  const itemBase = "flex-1 justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors sm:flex-none";
  const itemActive = "bg-violet-600 text-white shadow-sm shadow-violet-600/30";
  const itemInactive = "text-white/55 hover:bg-violet-600/20 hover:text-white";

  return (
    <div className="inline-flex w-full max-w-full items-center gap-1 rounded-full bg-white/5 p-1 ring-1 ring-white/10 sm:w-fit sm:max-w-fit">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={[itemBase, value === "all" ? itemActive : itemInactive].join(" ")}
      >
        Todas
      </button>

      <button
        type="button"
        onClick={() => onChange("pending")}
        className={[itemBase, value === "pending" ? itemActive : itemInactive].join(" ")}
      >
        Pendientes
      </button>

      <button
        type="button"
        onClick={() => onChange("completed")}
        className={[
          itemBase,
          value === "completed" ? itemActive : itemInactive,
        ].join(" ")}
      >
        Completadas
      </button>
    </div>
  );
}