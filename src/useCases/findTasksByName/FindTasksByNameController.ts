import { Request, Response } from 'express';
import FindTasksByNameUseCase from './FindTasksByNameUseCase';

export class FindTasksByNameController {
  constructor(private findTasksByNameUseCase: FindTasksByNameUseCase) {}

  async handle(req: Request, res: Response) {
    const { userId } = req.body;
    const search = req.query.search || '';
    const page = req.query.page || 1;

    const tasks = await this.findTasksByNameUseCase.execute(
      userId,
      Number(page),
      String(search)
    );

    return res.json(tasks);
  }
}
