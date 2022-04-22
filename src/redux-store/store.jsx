import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../bussinessLogic/todoSlice";

export default configureStore({
  reducer: {
    todo: todoReducer,
  },
});
