import { CustomException } from '../exceptions/CustomException';

export function isEmptyObject(obj: Object) {
  return !Object.values(obj).length;
}

export function validateEmail(email: string, msg) {
  const regex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if (!regex.test(email)) throw new CustomException(msg);
}

export function existsOrError(value: unknown, msg: string) {
  if (!value) throw new CustomException(msg);
  if (Array.isArray(value) && value.length === 0)
    throw new CustomException(msg);
  if (typeof value === 'string' && !value.trim())
    throw new CustomException(msg);
}

export function notExistsOrError(value: unknown, msg: string) {
  try {
    existsOrError(value, msg);
  } catch (e) {
    return;
  }
  throw new CustomException(msg);
}

export function equalsOrError(valueA: unknown, valueB: unknown, msg: string) {
  if (valueA !== valueB) throw new CustomException(msg);
}
