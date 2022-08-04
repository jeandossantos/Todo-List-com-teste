import { prisma } from '../../connection';
import { Task } from '../../entities/Task';
import ITaskRepository, { PaginatedTasks } from './ITaskRepository';

export class TaskRepository implements ITaskRepository {
  async findByName(
    userId: string,
    page: number = 1,
    name?: string
  ): Promise<PaginatedTasks> {
    const limit = 4;
    const count = await prisma.task.count({
      where: {
        userId,
      },
    });

    const tasks = await prisma.task.findMany({
      take: limit,
      skip: page * limit - limit,
      where: {
        userId,
        name: {
          mode: 'insensitive',
          startsWith: name,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { tasks, count, limit };
  }

  async create({ name, description, deadline, done, userId }: Task) {
    const task = await prisma.task.create({
      data: {
        name: name,
        description: description,
        deadline: deadline,
        done: done,
        userId: userId,
      },
    });

    return task;
  }

  async remove(taskId: string) {
    const task = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return task;
  }

  async update({ id, name, description, done, deadline }: Task) {
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        deadline: deadline || null,
        done,
      },
    });

    return task;
  }
}
