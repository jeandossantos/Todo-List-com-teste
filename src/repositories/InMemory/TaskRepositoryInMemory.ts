import crypto from 'crypto';

import { Task } from '../../entities/Task';
import ITaskRepository from '../taskRepository/ITaskRepository';

export default class TaskRepositoryInMemory implements ITaskRepository {
  public items: Task[] = [];

  async create(task: Task) {
    task.id = crypto.randomUUID();
    task.createdAt = new Date();
    this.items.push(task);
    return task;
  }

  async findByName(userId: string, page: number, name?: string) {
    const tasks = this.items.filter(
      (task) => task.userId === userId && task.name.startsWith(name)
    );

    return { tasks, limit: 4, count: 10 };
  }

  async remove(taskId: string) {
    const task = this.items.find((task) => task.id === taskId);

    this.items = this.items.filter((task) => task.id !== taskId);

    return task;
  }

  async update(task: Task): Promise<Task> {
    let updatedTask: Task;

    this.items = this.items.map((item) => {
      if (item.id === task.id) {
        item.name = task.name;
        item.description = task.description;
        item.deadline = task.deadline;
        item.done = task.done;

        updatedTask = item;
      }
      return item;
    });

    return updatedTask;
  }
}
