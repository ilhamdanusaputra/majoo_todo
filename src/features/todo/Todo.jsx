import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  remove,
  initAsync,
  selectTodos,
} from './todoSlice';

export function Todo() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    dispatch(initAsync())
    return () => mounted = false;
  }, [dispatch])


  return (
    <div>
      <div>
        {todos.map((todo) =>
          <div key={todo.id}>
            <div>{todo.id}</div>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
            <div>{todo.status}</div>
            <div>{todo.createdAt}</div>
            <button onClick={() => dispatch(remove(todo.id))}>delete</button>
            <hr />
          </div>
        )}
      </div>

    </div>
  );
}
