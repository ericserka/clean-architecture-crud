import { TaskStatus } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { ExternalService } from "../interfaces/ExternalService";
import { Usecase } from "../interfaces/UseCase";

export type ProcessTaskInputDto = {
  taskId: string;
}

export type ProcessTaskOutputDto = void;

export class ProcessTaskUsecase implements Usecase<ProcessTaskInputDto, ProcessTaskOutputDto> {
  private constructor(
    private taskRepository: TaskRepository,
    private externalService: ExternalService // Communication with microservices
  ) { }

  public static create(taskRepository: TaskRepository, externalService: ExternalService) {
    return new ProcessTaskUsecase(taskRepository, externalService);
  }

  public async execute(input: ProcessTaskInputDto): Promise<ProcessTaskOutputDto> {
    const task = await this.taskRepository.findById(input.taskId);
    if (!task) throw new Error('Task not found');

    if (task.status === TaskStatus.FAILED || task.status === TaskStatus.COMPLETED) return;

    try {
      const currentStep = task.steps[task.currentStep];
      await this.externalService.callStepService(currentStep);

      task.nextStep();
      await this.taskRepository.update(task);
    } catch (error) {
      task.fail();
      await this.taskRepository.update(task);
      throw error;
    }
  }
}
