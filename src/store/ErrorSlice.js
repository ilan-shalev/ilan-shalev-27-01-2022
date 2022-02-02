import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
};

const ErrorSlice = createSlice({
  name: "errorSlice",
  initialState,
  reducers: {
    setError(state, action) {
      const message = action.payload;
      state.error = message;
    },
  },
});

export const ErrorActions = ErrorSlice.actions;

export default ErrorSlice;
