import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { format } from 'date-fns';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    value: [{
    }],
  },
  reducers: {
    init: (state, action) => {
      state.value = action.payload
    },
    add: (state, action) => {
      var setID = Math.max.apply(Math, state.value.map(function (o) { return o.id; })) + 1
      if (state.value.length == 0) {
        setID = 1
      }
      var date = new Date()
      var formattedDate = format(date, "yyyy-MM-dd hh:mm");
      state.value.push(
        {
          ...action.payload,
          id: setID,
          status: "0",
          createdAt: formattedDate
        }
      )
    },
    edit: (state) => {

    },
    remove: (state, action) => {
      var id = action.payload;
      var index = state.value.map(x => {
        return x.id;
      }).indexOf(id);

      state.value.splice(index, 1)
    },

  },
})

export const { init, add, edit, remove } = todoSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const initAsync = () => (dispatch) => {
  axios.get('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list').then(
    (res) => {
      dispatch(init(res.data))
    }
  )
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.todo.value)`
export const selectTodos = (state) => state.todo.value

export default todoSlice.reducer
