import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

export class MockTaskRepository implements TaskRepository {
  private constructor(private tasks: Map<string, Task>) { }

  public static create(tasks: Map<string, Task> = new Map()) {
    return new MockTaskRepository(tasks);
  }

  async create(task: Task): Promise<void> {
    this.tasks.set(task.id, task);
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.get(id) || null;
  }

  async update(task: Task): Promise<void> {
    this.tasks.set(task.id, task);
  }
}

