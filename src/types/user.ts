export interface User {
  id: string;
  email: string;
  name?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
  roles: string[];
  permissions: string[];
  status: string;
  tenantId?: string | null;
}
