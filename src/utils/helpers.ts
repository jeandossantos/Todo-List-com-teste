import { genSaltSync, hashSync } from 'bcrypt';

export function encryptPassword(password: string, rounds: number = 10) {
  const salt = genSaltSync(rounds);

  const passwordHash = hashSync(password, salt);

  return passwordHash;
}
