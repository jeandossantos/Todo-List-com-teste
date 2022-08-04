import { Task } from '../../entities/Task';

export type PaginatedTasks = {
  tasks: Task[];
  count: number;
  limit: number;
};

export default interface ITaskRepository {
  create: (task: Task) => Promise<Task>;
  findByName: (
    userId: string,
    page: number,
    name?: string
  ) => Promise<PaginatedTasks>;
  remove: (taskId: string) => Promise<Task>;
  update: (task: Omit<Task, 'userId'>) => Promise<Task>;
}
