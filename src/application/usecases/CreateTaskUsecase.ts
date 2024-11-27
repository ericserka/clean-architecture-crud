import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { Usecase } from "../interfaces/UseCase";

export type CreateTaskInputDto = {
  steps: string[];
}

export type CreateTaskOutputDto = {
  id: string;
}

export class CreateTaskUsecase implements Usecase<CreateTaskInputDto, CreateTaskOutputDto> {
  private constructor(private taskRepository: TaskRepository) { }

  public static create(taskRepository: TaskRepository) {
    return new CreateTaskUsecase(taskRepository);
  }

  public async execute(input: CreateTaskInputDto): Promise<CreateTaskOutputDto> {
    try {
      const task = Task.create(input.steps)
      await this.taskRepository.create(task);
      const output = this.presentOutput(task);

      return output;
    } catch (error) {
      throw error;
    }
  }

  private presentOutput(task: Task): CreateTaskOutputDto {
    const output: CreateTaskOutputDto = {
      id: task.id
    }

    return output;
  }
}

