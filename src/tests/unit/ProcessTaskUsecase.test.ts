import { CreateTaskUsecase } from "../../application/usecases/CreateTaskUsecase";
import { ProcessTaskUsecase } from "../../application/usecases/ProcessTaskUsecase";
import { TaskStatus } from "../../domain/entities/Task";
import { MockExternalService } from "../mocks/MockExternalService";
import { MockTaskRepository } from "../mocks/MockTaskRepository";

describe('ProcessTaskUsecase', () => {
  it('processes a task successfully', async () => {
    const taskRepository = MockTaskRepository.create();
    const externalService = new MockExternalService();
    const createTaskUsecase = CreateTaskUsecase.create(taskRepository);
    const processTaskUsecase = ProcessTaskUsecase.create(taskRepository, externalService);

    const { id: taskId } = await createTaskUsecase.execute({ steps: ['singlestep'] });

    await processTaskUsecase.execute({ taskId });

    const updatedTask = await taskRepository.findById(taskId);

    expect(updatedTask?.status).toBe(TaskStatus.COMPLETED);
  });

  it('fails gracefully on external service error', async () => {
    const taskRepository = MockTaskRepository.create();
    const externalService = {
      callStepService: jest.fn().mockRejectedValue(new Error('Step failed')),
    };
    const createTaskUsecase = CreateTaskUsecase.create(taskRepository);
    const processTaskUsecase = ProcessTaskUsecase.create(taskRepository, externalService);

    const { id: taskId } = await createTaskUsecase.execute({ steps: ['singlestep'] });

    await expect(processTaskUsecase.execute({ taskId })).rejects.toThrow('Step failed');

    const updatedTask = await taskRepository.findById(taskId);

    expect(updatedTask?.status).toBe(TaskStatus.FAILED);
  });
});
