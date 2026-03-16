import {
  removeUser,
  setUser,
  UserState,
} from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const login = (userData: UserState) => {
    dispatch(setUser(userData));
  };

  const logout = () => {
    dispatch(removeUser());
  };

  return {
    login,
    logout,
    user,
  };
}
