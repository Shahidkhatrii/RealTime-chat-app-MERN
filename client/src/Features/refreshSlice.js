import { createSlice } from "@reduxjs/toolkit";

export const refreshSlice = createSlice({
  name: "refreshSlice",
  initialState: true,
  reducers: {
    setRefresh: (state) => {
      console.log("Refreshing sidebar from Redux");
      return (state = !state);
    },
  },
});

export const { setRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
