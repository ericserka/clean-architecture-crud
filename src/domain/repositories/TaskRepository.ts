import { Task } from '../entities/Task';

export interface TaskRepository {
  create(task: Task): Promise<void>;
  findById(id: string): Promise<Task | null>;
  update(task: Task): Promise<void>;
}
