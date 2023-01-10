import "./App.css";
import React from "react";
import Carts from "./components/Carts";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div>
      <TodoList />
      <Carts />
    </div>
  );
}

export default App;
