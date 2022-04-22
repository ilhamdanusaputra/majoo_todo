import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "./todoSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export function AddTodo({}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
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
  const handleAdd = () => {
    dispatch(add(data));
    handleClose();
  };
  return (
    <>
      <button
        onClick={handleClickOpen}
        class="ml-2 border-2 border-green-500 p-2 text-green-500 hover:text-white hover:bg-green-500 rounded-lg flex"
      >
        <svg
          class="h-6 w-6"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <circle cx="12" cy="12" r="9" />{" "}
          <line x1="9" y1="12" x2="15" y2="12" />{" "}
          <line x1="12" y1="9" x2="12" y2="15" />
        </svg>
        <span>Add Todo</span>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div class="w-full md:w-full mb-2 mt-2">
              <input
                onChange={handleChange}
                id="title"
                class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full  py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white mb-3"
                name="body"
                placeholder="Title"
                required
              ></input>
              <textarea
                id="description"
                class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
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
          <Button onClick={handleAdd} color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
