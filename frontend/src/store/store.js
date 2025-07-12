import { configureStore } from "@reduxjs/toolkit";
import clearanceReducer from "../features/academicType/clearanceSlice";
import loanReducer from "../features/loan/loanSlice";
import userReducer from "../features/user/userSlice";
export const store = configureStore(
  {
    reducer: {
      clearance: clearanceReducer,
      loan: loanReducer,
      user: userReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
