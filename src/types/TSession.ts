import { UserType } from "./global";

export type TSession = {
  isAuth: boolean;
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  roles: string[];
  user_type: UserType | "guest" | string;
  /** Current tenant id (UUID) for API context; set from token after login */
  tenantId?: string | null;
};

export type SessionUser = {
  name: string;
  email: string;
  avatar?: string;
  userId?: string;
};
