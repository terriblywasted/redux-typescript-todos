import * as t from 'io-ts';

export const shouldNeverHappen = (_: never): never => {
  throw new Error('Should never happen!');
};

export function decode<T>(
  value: any,
  type: t.Type<T>,
  errorMsg: string = 'Decode error',
): Promise<T> {
  const validation = type.decode(value);

  return validation.fold(
    () => {
      return Promise.reject(new Error(errorMsg));
    },
    result => {
      return Promise.resolve(result);
    },
  );
}
