import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AddTodo } from "./features/todo/AddTodo";
import Todo from "./features/todo/Todo";

function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;
