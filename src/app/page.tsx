"use client";

import { FormEvent, useMemo, useState } from "react";

export default function Home() {
  console.log("render");

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", isCompleted: false },
    { id: 2, text: "Learn Next.js", isCompleted: false },
    { id: 3, text: "Learn TypeScript", isCompleted: false },
    { id: 4, text: "Push to Vercel", isCompleted: false },
  ]);

  /** useMemo = only update this state as an effect of another defined piece of state changing */
  // const incompleteTodos = todos.filter((todo) => !todo.isCompleted).length; // less efficient
  const numIncompleteTodos = useMemo(
    () => todos.filter((todo) => !todo.isCompleted).length,
    [todos]
  );

  function addTodo(e: FormEvent) {
    setTodos([
      ...todos, // copy existing todos
      {
        id: todos.length + 1,
        text: newTodo,
        isCompleted: false,
      },
    ]);
    setNewTodo("");
    e.preventDefault(); // prevent reloading page
  }

  function toggleTodo(index: number) {
    const todoCopy = [...todos];
    todoCopy[index].isCompleted = !todoCopy[index].isCompleted;
    setTodos(todoCopy);
  }

  return (
    <div className="wrapper">
      <main className="container">
        <div className="header">
          <h1 className="title">Todo List</h1>

          <div className="incomplete-tasks">
            <span className="badge">{numIncompleteTodos}</span> incomplete tasks
          </div>
        </div>

        <form className="todo-form" onSubmit={addTodo}>
          <input
            className="todo-input"
            placeholder="What do you want to do today?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />

          <button disabled={newTodo === ""} className="todo-button">
            +
          </button>
        </form>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={todo.id} className="todo">
              <label
                className={`todo-label ${
                  todo.isCompleted ? "line-through" : ""
                }`}
              >
                <input
                  type="checkbox"
                  className="todo-checkbox"
                  checked={todo.isCompleted}
                  onChange={() => toggleTodo(index)}
                />
                {todo.text}
              </label>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
