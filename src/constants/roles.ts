/**
 * Generic role constants for role-based applications.
 */

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  ADVERTISER: "ADVERTISER",
  AFFILIATE: "AFFILIATE",
  USER: "USER",
  GUEST: "GUEST",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/**
 * Maps backend role names to frontend role constants
 */
export const ROLE_MAPPING: Record<string, Role> = {
  "Super Admin": ROLES.SUPER_ADMIN,
  "super admin": ROLES.SUPER_ADMIN,
  SUPER_ADMIN: ROLES.SUPER_ADMIN,

  Admin: ROLES.ADMIN,
  admin: ROLES.ADMIN,
  ADMIN: ROLES.ADMIN,

  Manager: ROLES.MANAGER,
  manager: ROLES.MANAGER,
  MANAGER: ROLES.MANAGER,

  Advertiser: ROLES.ADVERTISER,
  advertiser: ROLES.ADVERTISER,
  ADVERTISER: ROLES.ADVERTISER,

  Affiliate: ROLES.AFFILIATE,
  affiliate: ROLES.AFFILIATE,
  AFFILIATE: ROLES.AFFILIATE,

  User: ROLES.USER,
  user: ROLES.USER,
  USER: ROLES.USER,
};

/**
 * Normalize a role name to standard format
 */
export function normalizeRole(role: string): Role {
  // Direct mapping
  if (ROLE_MAPPING[role]) {
    return ROLE_MAPPING[role];
  }

  // Fallback to pattern matching
  const roleLower = role.toLowerCase();
  if (roleLower.includes("super") && roleLower.includes("admin")) {
    return ROLES.SUPER_ADMIN;
  }
  if (roleLower.includes("admin")) {
    return ROLES.ADMIN;
  }
  if (roleLower.includes("manager")) {
    return ROLES.MANAGER;
  }
  if (roleLower.includes("advertiser")) {
    return ROLES.ADVERTISER;
  }
  if (roleLower.includes("affiliate")) {
    return ROLES.AFFILIATE;
  }

  return ROLES.USER;
}
