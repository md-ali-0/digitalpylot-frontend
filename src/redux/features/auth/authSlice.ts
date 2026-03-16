import { normalizeRole } from "@/constants/roles";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  phone?: string | null;
  roles: string[];
  permissions: string[];
  status: string;
  tenantId: string;
}

export interface AuthOrganization {
  id: string;
  name: string;
  address: string;
  mapLink: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
}

interface AuthenticationState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: AuthUser | null;
  profile: Record<string, unknown> | null;
}

interface LoginResponseData {
  user: {
    id: string;
    email: string;
    name: string;
    roles: string[];
    permissions: string[];
    status: string;
    tenantId: string;
  };
  accessToken: string;
  refreshToken: string;
  profile: Record<string, unknown> | null;
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
  profile: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginResponseData>) => {
      state.isAuthenticated = true;
      state.user = {
        ...action.payload.user,
        // Normalize roles to standardized format (e.g., "Super Admin" -> "SUPER_ADMIN")
        roles: (action.payload.user.roles || []).map(normalizeRole),
        permissions: action.payload.user.permissions || [],
      };
      state.accessToken = action.payload.accessToken;
      state.profile = action.payload.profile;
    },
    update: (state, action: PayloadAction<Partial<AuthenticationState>>) => {
      if (action.payload.user) {
        state.user = {
          ...state.user!,
          ...action.payload.user,
        };
      }
      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken;
      }
      if (action.payload.profile) {
        state.profile = action.payload.profile;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.profile = null;
      state.accessToken = null;
    },
  },
});

export const { login, logout, update } = authSlice.actions;
export default authSlice.reducer;
