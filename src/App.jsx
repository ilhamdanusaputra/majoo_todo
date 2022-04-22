import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Todo } from './features/todo/Todo';
import { AddTodo } from './features/todo/AddTodo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AddTodo />
        <Todo />
      </header>
    </div>
  );
}

export default App;
