import { Request, Response } from 'express';
import ITaskRepository from '../../repositories/taskRepository/ITaskRepository';
import { CreateTaskUseCase } from './CreateTaskUseCase';

export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  async handle(req: Request, res: Response) {
    const { userId, name, description, deadline, done } = req.body;

    const task = await this.createTaskUseCase.execute({
      userId,
      name,
      description,
      deadline,
      done,
    });

    return res.json(task);
  }
}
