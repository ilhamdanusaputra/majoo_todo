import { useState } from "react";
import { useDispatch } from "react-redux";
import { edit, changeStatus } from "../bussinessLogic/todoSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import RemoveTodo from "../components/RemoveTodo";

function ViewEditTodo({ todo }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(todo);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const id = event.target.id;
    setData({
      ...data,
      [id]: event.target.value,
    });
  };
  const handleEdit = () => {
    dispatch(edit(data));
    handleClose();
  };
  const handleComplete = (todo) => {
    dispatch(changeStatus(todo));
    handleClose();
  };
  return (
    <>
      <button
        onClick={handleClickOpen}
        class="ml-2 border-2 h-full border-blue-500 p-2 text-blue-500 hover:text-white hover:bg-blue-500 rounded-lg flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span>View Todo</span>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div className="flex">
            <div>
              <div>{todo.title}</div>
              {todo.status === 1 && (
                <div className="text-green-600 text-sm">Completed</div>
              )}
            </div>
            <div className="flex-1"></div>

            <RemoveTodo todo={todo} />
          </div>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <div class="w-full md:w-full mb-2 mt-2">
              <input
                onChange={handleChange}
                id="title"
                defaultValue={todo.title}
                class="text-black bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full  py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white mb-3"
                name="body"
                placeholder="Title"
                required
                disabled={todo.status === 1}
              ></input>
              <textarea
                disabled={todo.status === 1}
                onChange={handleChange}
                id="description"
                defaultValue={todo.description}
                class="text-black bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                name="body"
                placeholder="Description"
                required
              ></textarea>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          {todo.status === 0 && (
            <Button onClick={() => handleEdit(todo)} color="primary" autoFocus>
              Edit
            </Button>
          )}
          <Button onClick={() => handleComplete(todo)} color="primary">
            Mark as {`${todo.status === 0 ? "Completed" : "Incompleted"}`}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ViewEditTodo;
