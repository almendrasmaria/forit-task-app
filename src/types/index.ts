export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean | number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTaskBody {
  title: string;
  description?: string;
  completed?: boolean | number;
}

export interface UpdateTaskBody {
  title?: string;
  description?: string;
  completed?: boolean | number;
}
