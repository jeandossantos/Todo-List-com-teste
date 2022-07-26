import { Task } from '../../entities/Task';
import ITaskRepository from './ITaskRepository';

export class TaskRepository implements ITaskRepository {
  create: (task: Task) => Promise<Task>;
  find: (userId: string, search: string) => Promise<Task[]>;
  remove: (taskId: string) => Promise<Task>;
  update: (task: Task) => Promise<Task>;
}
