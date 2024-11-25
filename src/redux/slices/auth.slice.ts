import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  userId: string | null;

}

const initialState: AuthState = {
  accessToken: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ accessToken: string; userId: string}>) {
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      // state.password = action.payload.password;
      localStorage.setItem("accessToken", action.payload.accessToken); // Save to localStorage
      localStorage.setItem("userId", action.payload.userId);
    },
    clearAuth(state) {
      state.accessToken = null;
      state.userId = null;
      localStorage.removeItem("accessToken"); // Clear from localStorage
      localStorage.removeItem("userId");
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
