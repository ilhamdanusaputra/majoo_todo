import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { format } from "date-fns";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    value: { fiterBy: "all", todos: [] },
  },
  reducers: {
    init: (state, action) => {
      state.value.todos = action.payload;
    },
    setTodoFilter: (state, action) => {
      state.value.filterBy = action.payload;
    },
    add: (state, action) => {
      var setID =
        Math.max.apply(
          Math,
          state.value.todos.map(function (o) {
            return o.id;
          })
        ) + 1;
      if (state.value.todos.length === 0) {
        setID = 1;
      }
      var date = new Date();
      var formattedDate = format(date, "yyyy-MM-dd hh:mm");
      state.value.todos.push({
        ...action.payload,
        id: setID,
        status: 0,
        createdAt: formattedDate,
      });
    },
    edit: (state, action) => {
      const data = action.payload;
      const newList = state.value.todos.map((item) => {
        if (item.id === action.payload.id) {
          const updatedItem = {
            ...item,
            ...data,
          };

          return updatedItem;
        }

        return item;
      });
      state.value.todos = newList;
    },
    changeStatus: (state, action) => {
      const handleActive = (status) => {
        if (status === 0) {
          return 1;
        } else {
          return 0;
        }
      };
      const newList = state.value.todos.map((item) => {
        if (item.id === action.payload.id) {
          const updatedItem = {
            ...item,
            status: handleActive(item.status),
          };

          return updatedItem;
        }

        return item;
      });

      state.value.todos = newList;
    },
    remove: (state, action) => {
      var id = action.payload.id;
      var index = state.value.todos
        .map((x) => {
          return x.id;
        })
        .indexOf(id);

      state.value.todos.splice(index, 1);
    },
  },
});

export const {
  init,
  setTodoFilter,
  getAll,
  getActive,
  getCompleted,
  add,
  edit,
  changeStatus,
  remove,
} = todoSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const initAsync = () => (dispatch) => {
  axios
    .get("https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list")
    .then((res) => {
      dispatch(init(res.data));
    });
};
function noFilter(todo) {
  return true;
}
function checkActive(todo) {
  return todo.status === 0;
}
function checkCompleted(todo) {
  return todo.status === 1;
}
function sortAsc(a, b) {
  // Convert string dates into `Date` objects
  const date1 = new Date(a.createdAt);
  const date2 = new Date(b.createdAt);

  return date1 - date2;
}
function sortDesc(a, b) {
  // Convert string dates into `Date` objects
  const date1 = new Date(a.createdAt);
  const date2 = new Date(b.createdAt);

  return date2 - date1;
}
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.todo.value)`
export const selectTodos = (state) =>
  state.todo.value.todos
    .filter(
      state.todo.value.filterBy === "completed"
        ? checkCompleted
        : state.todo.value.filterBy === "active"
        ? checkActive
        : noFilter
    )
    .sort(state.todo.value.filterBy === "active" ? sortAsc : sortDesc);
export default todoSlice.reducer;
