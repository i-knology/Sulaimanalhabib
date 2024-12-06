import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

interface User {
  id: string;
  language: string;
  expiration: string;
  userName: string;
  fullName: string;
  mobileNo: string;
  email: string;
  imageProfile: string;
  roles: string[];
  permissions: string[];
}

interface InitialState {
  user: User | null;
  token: string | null;
}

const cookies = new Cookies();

const initialState: InitialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  token: cookies.get("token") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogin: (state, action: PayloadAction<any>) => {
      const user: User = {
        userName: action.payload.userName,
        roles: action.payload.roles,
        permissions: action.payload.permissions,
        mobileNo: action.payload.mobileNo,
        language: action.payload.language,
        imageProfile: action.payload.imageProfile,
        id: action.payload.id,
        fullName: action.payload.fullName,
        expiration: action.payload.expiration,
        email: action.payload.email,
      };

      state.user = user;
      state.token = action.payload.token;
      cookies.set("user", JSON.stringify(user));
      cookies.set("token", action.payload.token, { path: "/" });
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      cookies.remove("user");
      cookies.remove("token", { path: "/" });
      cookies.remove("busOrders", { path: "/" });
      cookies.remove("version", { path: "/" });
    },
  },
});

export const { handleLogin, logout } = userSlice.actions;
export default userSlice.reducer;
