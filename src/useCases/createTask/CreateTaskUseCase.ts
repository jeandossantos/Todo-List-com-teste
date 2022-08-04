import ITaskRepository from '../../repositories/taskRepository/ITaskRepository';
import { existsOrError } from '../../utils/validators';
import CreateTaskDTO from './CreateTaskDTO';

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute({
    userId,
    name,
    description,
    deadline,
    done = false,
  }: CreateTaskDTO) {
    existsOrError(userId, 'User ID is required!');
    existsOrError(name, 'Name is required!');

    const task = await this.taskRepository.create({
      userId,
      name,
      description,
      deadline,
      done,
    });

    return task;
  }
}
