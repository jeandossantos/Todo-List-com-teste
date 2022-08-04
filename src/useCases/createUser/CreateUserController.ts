import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async handle(req: Request, res: Response) {
    const { name, email, initials, password, confirmPassword } = req.body;

    const user = await this.createUserUseCase.execute({
      name,
      initials,
      email,
      password,
      confirmPassword,
    });

    return res.json(user);
  }
}
