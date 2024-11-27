import { CreateTaskUsecase } from '../../application/usecases/CreateTaskUsecase';
import { MockTaskRepository } from '../mocks/MockTaskRepository';

describe('CreateTaskUsecase', () => {
  it('creates a task successfully', async () => {
    const taskRepository = MockTaskRepository.create();
    const createTaskUsecase = CreateTaskUsecase.create(taskRepository)

    const output = await createTaskUsecase.execute({ steps: ['step1', 'step2'] });

    expect(typeof output.id).toBe('string');

    const task = await taskRepository.findById(output.id);
    expect(task).not.toBeNull();
  });
});
