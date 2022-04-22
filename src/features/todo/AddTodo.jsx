import { format } from "date-fns";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  add,
} from './todoSlice';

export function AddTodo() {
  const dispatch = useDispatch();
  const [data, setData] = useState({

  });

  const handleChange = (event) => {
    const id = event.target.id;
    setData({
      ...data,
      [id]: event.target.value,
    });
  };

  return (
    <>
      <input type="text" id="title" onChange={handleChange} />
      <input type="text" id="description" onChange={handleChange} />
      <button onClick={() => dispatch(add(data))}>Add</button>
    </>
  );
}
