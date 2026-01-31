export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean | number;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskBody {
  title: string;
  description?: string;
  completed?: boolean;
}
