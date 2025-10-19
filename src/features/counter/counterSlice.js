import { createSlice } from "@reduxjs/toolkit";

export const CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: CounterState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
