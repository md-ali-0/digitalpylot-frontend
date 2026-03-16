export default function moduleChecker(
  key: string,
  permission: Record<
    string,
    ("CREATE" | "READ" | "UPDATE" | "DELETE")[]
  > | null,
) {
  if (!permission || !(key in permission)) {
    return null;
  }

  return true;
}
