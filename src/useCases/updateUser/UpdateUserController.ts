import { Request, Response } from 'express';
import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { userId } = req.params;
    const { name, initials } = req.body;

    await this.updateUserUseCase.execute(userId, name, initials);

    return res.send();
  }
}
