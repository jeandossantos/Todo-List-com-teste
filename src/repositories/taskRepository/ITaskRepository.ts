import { Task } from '../../entities/Task';

type PaginatedTasks = {
  tasks: Task[];
  count: number;
  limit: number;
};

export default interface ITaskRepository {
  create: (task: Task) => Promise<Task>;
  findByName: (userId: string, name?: string) => Promise<PaginatedTasks>;
  remove: (taskId: string) => Promise<Task>;
  update: (task: Task) => Promise<Task>;
}
