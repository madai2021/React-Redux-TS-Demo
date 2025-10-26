import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum FilterType {
  All = "all",
  Active = "active",
  Completed = "completed",
}

export interface FilterState {
  value: FilterType;
}

const initialState: FilterState = {
  value: FilterType.All,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.value = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
