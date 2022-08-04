import { Request, Response } from 'express';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';

export class UpdateTaskController {
  constructor(private updateTaskUseCase: UpdateTaskUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, description, deadline, done } = req.body;
    const { taskId } = req.params;

    await this.updateTaskUseCase.execute({
      id: taskId,
      name,
      description,
      deadline,
      done,
    });

    return res.send();
  }
}
