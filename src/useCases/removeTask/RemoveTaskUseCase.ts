import ITaskRepository from '../../repositories/taskRepository/ITaskRepository';
import { existsOrError } from '../../utils/validators';

export class RemoveTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string) {
    existsOrError(taskId, 'Task Id is required!');

    const task = await this.taskRepository.remove(taskId);

    return task;
  }
}
