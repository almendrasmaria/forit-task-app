import TaskItem from "./TaskItem";
import type { Task } from "@/types";

type Props = {
  tasks: Task[];
  onToggleComplete: (id: Task["id"], completed: boolean) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: Task["id"]) => void;
};

export default function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="mt-6 space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={String(task.id)}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}