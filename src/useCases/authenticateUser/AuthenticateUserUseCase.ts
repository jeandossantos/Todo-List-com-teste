import jwt from 'jsonwebtoken';
import { compareSync } from 'bcrypt';
import { IUserRepository } from '../../repositories/userRepository/IUserRepository';
import { CustomException } from '../../exceptions/CustomException';

export class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string) {
    if (!email || !password) {
      throw new CustomException('Enter E-mail and password!');
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new CustomException('E-mail not registered!');

    const isMatch = compareSync(password, user.password);

    if (!isMatch) throw new CustomException('E-mail and/or password invalid.');

    const payload = {
      id: user.id,
      email: user.email,
      initials: user.initials,
    };

    const token = jwt.sign(payload, process.env.MY_SECRET, {
      subject: user.id,
    });

    return { ...payload, token };
  }
}
