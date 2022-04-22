import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddTodo } from "../components/AddTodo";
import {
  changeStatus,
  setTodoFilter,
  initAsync,
  selectTodos,
} from "../bussinessLogic/todoSlice";
import ViewEditTodo from "./ViewEditTodo";

function Todo() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    dispatch(initAsync());
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return (
    <div className="w-full h-screen bg-gray-100 pt-8">
      <div className="bg-white p-3 max-w-xl mx-auto ">
        <div className=" mt-4 flex ">
          <h1 className="text-3xl font-bold">Majoo Test Case</h1>
          <div className="flex-1"></div>
          <AddTodo />
        </div>
        <div className="mt-8">
          <div className="mt-8 flex place-items-center">
            <button
              onClick={() => dispatch(setTodoFilter("all"))}
              className="border-2 border-gray-500 p-2 text-gray-500"
            >
              All Task
            </button>
            <button
              onClick={() => dispatch(setTodoFilter("active"))}
              className="border-2 border-indigo-500 p-2 text-indigo-500 ml-4"
            >
              Active Task
            </button>
            <button
              onClick={() => dispatch(setTodoFilter("completed"))}
              className="border-2 border-green-500 p-2 text-green-500 ml-4"
            >
              Completed
            </button>
          </div>
          <ul>
            {todos.map((todo) => (
              <li className="p-2 rounded-lg " key={todo.id}>
                <div className="flex flex-row place-items-center hover:bg-green-200">
                  <div className="my-auto">
                    <input
                      type="checkbox"
                      className="h-5 w-5 "
                      value="true"
                      checked={todo.status}
                      onChange={() => dispatch(changeStatus(todo))}
                    />
                  </div>
                  <div className="p-2 flex-1">
                    <p
                      className={`text-lg ${
                        todo.status ? "line-through" : ""
                      } text-gray-500 `}
                    >
                      {todo.title}
                    </p>
                    <p className="text-xs">{todo.createdAt}</p>
                  </div>
                  <ViewEditTodo todo={todo} />
                </div>
                <hr className="mt-2" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Todo;
