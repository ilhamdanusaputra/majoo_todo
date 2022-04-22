import { useState } from "react";
import { useDispatch } from "react-redux";
import { remove } from "../bussinessLogic/todoSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export function RemoveTodo({ todo }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  const handleRemove = (data) => {
    dispatch(remove(data));
    handleClose();
  };
  return (
    <>
      <button onClick={handleClickOpen} className="text-red-600">
        {todo.status === 1 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
              clip-rule="evenodd"
            />
          </svg>
        ) : (
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`${
          todo.status === 0 ? "Detele Todo" : "Cannot Detele Todo"
        }`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {todo.status === 0 ? (
              <div class="w-full md:w-full mb-2 mt-2">
                <span className="font-bold">"{todo.title}"</span> will be
                permanently deleted
              </div>
            ) : (
              <div className="text-red-500">
                This action can't be completed because the task is completed
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          {todo.status === 0 && (
            <Button
              onClick={() => handleRemove(todo)}
              color="primary"
              autoFocus
            >
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
export default RemoveTodo;
