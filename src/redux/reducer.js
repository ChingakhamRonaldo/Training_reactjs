import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeMiddlematrix: new Array(5)
    .fill(0)
    .map(() => new Array(5).fill(0).map(() => new Array(2).fill(0))),
};

const storeSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setStoreMiddleMatrix: (state, action) => {
      state.storeMiddlematrix = action.payload;
      console.log("setStoreMiddleMatrix", state.storeMiddlematrix);
    },
  },
});

export const { setStoreMiddleMatrix } = storeSlice.actions;

export default storeSlice.reducer;
