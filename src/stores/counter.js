import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    onIncrement(state, action) {
      state.counter += 1;
    },
  },
});

export default counterSlice.reducer;

export const CounterActions = counterSlice.actions;
