import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  accessToken: string | null;
  userId: string | null;
  id: number | null;

}

const initialState: AuthState = {
  accessToken: typeof window !== "undefined" && localStorage.getItem("accessToken") || null,
  userId: typeof window !== "undefined" && localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).userId : null,
  id: typeof window !== "undefined" && localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).id : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ accessToken: string;}>) {
      state.accessToken = action.payload.accessToken;
      // state.password = action.payload.password;
      typeof window !== "undefined" && localStorage.setItem("accessToken", action.payload.accessToken); // Save to localStorage
    },
    setUserId(state, action: PayloadAction<{ id: number; userId: string}>) {
      state.id = action.payload.id;
      state.userId = action.payload.userId;
      // state.password = action.payload.password;
      typeof window !== "undefined" && localStorage.setItem("user", JSON.stringify({id:action.payload.id, userId: action.payload.userId}));
    },
    clearAuth(state) {
      state.accessToken = null;
      state.userId = null;
      state.id = null;
      typeof window !== "undefined" && localStorage.removeItem("accessToken"); // Clear from localStorage
      typeof window !== "undefined" && localStorage.removeItem("user");
    },
  },
});

export const { setAuth,setUserId, clearAuth } = authSlice.actions;
export const isAuthenticated = (state: RootState) => !!state.auth.accessToken;

export default authSlice.reducer;
