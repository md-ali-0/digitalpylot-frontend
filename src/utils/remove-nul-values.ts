/* eslint-disable @typescript-eslint/no-unused-vars */
export function removeNullValues<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null),
  ) as Partial<T>;
}
