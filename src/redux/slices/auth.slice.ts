import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  userId: string | null;
  id: number | null;

}

const initialState: AuthState = {
  accessToken: null,
  userId: null,
  id: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ accessToken: string;}>) {
      state.accessToken = action.payload.accessToken;
      // state.password = action.payload.password;
      localStorage.setItem("accessToken", action.payload.accessToken); // Save to localStorage
    },
    setUserId(state, action: PayloadAction<{ id: number; userId: string}>) {
      state.id = action.payload.id;
      state.userId = action.payload.userId;
      // state.password = action.payload.password;
      localStorage.setItem("user", JSON.stringify({id:action.payload.id, userId: action.payload.userId}));
    },
    clearAuth(state) {
      state.accessToken = null;
      state.userId = null;
      state.id = null;
      localStorage.removeItem("accessToken"); // Clear from localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { setAuth,setUserId, clearAuth } = authSlice.actions;
export default authSlice.reducer;
