export default function actionChecker(
  key: string,
  actions: ("CREATE" | "READ" | "UPDATE" | "DELETE")[],
  permission: Record<
    string,
    ("CREATE" | "READ" | "UPDATE" | "DELETE")[]
  > | null,
): boolean {
  if (!permission || !(key in permission)) {
    return false;
  }

  const userActions = permission[key];

  const hasAnyAction = actions.some((action) => userActions?.includes(action));

  return hasAnyAction;
}
