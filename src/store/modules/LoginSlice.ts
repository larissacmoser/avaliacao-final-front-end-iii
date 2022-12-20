import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginType {
  email: string;
  password: string;
  logged: boolean;
  notes?: string[];
}

const initialState: LoginType = {
  email: "",
  password: "",
  logged: false,
  notes: [],
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginType>) {
      return action.payload;
    },
    logoff() {
      return initialState;
    },
  },
});

export const { login, logoff } = loginSlice.actions;
export default loginSlice.reducer;
