import { Transform } from 'class-transformer';

export const ToBoolean = (): ((target: any, key: string) => void) =>
  Transform(
    ({ value }) =>
      value === 'true' || value === true || value === 1 || value === '1',
  );
