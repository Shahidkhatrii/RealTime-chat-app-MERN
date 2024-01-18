import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "./themeSlice";
import refreshSideBar from "./refreshSideBar";
export const store = configureStore({
  reducer: {
    themeKey: themeSliceReducer,
    refreshKey: refreshSideBar,
  },
});
