import { Request, Response } from 'express';
import { RemoveTaskUseCase } from './RemoveTaskUseCase';

export class RemoveTaskController {
  constructor(private removeTaskUseCase: RemoveTaskUseCase) {}

  async handle(req: Request, res: Response) {
    const { taskId } = req.params;

    await this.removeTaskUseCase.execute(taskId);

    return res.send();
  }
}
