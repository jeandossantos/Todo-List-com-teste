import ITaskRepository from '../../repositories/taskRepository/ITaskRepository';
import { existsOrError } from '../../utils/validators';

export default class FindTasksByNameUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(userId: string, search: string = '') {
    existsOrError(userId, 'User ID is required!');

    const tasks = await this.taskRepository.findByName(userId, search);

    return tasks;
  }
}
