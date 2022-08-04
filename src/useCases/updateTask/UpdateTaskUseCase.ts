import ITaskRepository from '../../repositories/taskRepository/ITaskRepository';
import { existsOrError } from '../../utils/validators';
import UpdateTaskDTO from './UpdateTaskDTO';

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute({
    id,

    name,
    description,
    deadline,
    done = false,
  }: UpdateTaskDTO) {
    existsOrError(id, 'Task ID is required!');
    existsOrError(name, 'Name is required!');

    const task = await this.taskRepository.update({
      id,
      name,
      description,
      deadline,
      done,
    });

    return task;
  }
}
