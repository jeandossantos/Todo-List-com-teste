import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const payload = await this.authenticateUserUseCase.execute(email, password);

    return res.json(payload);
  }
}
