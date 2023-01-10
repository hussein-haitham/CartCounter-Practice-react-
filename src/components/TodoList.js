import React, { useReducer, useState } from "react";

const ACTIONS = {
  ADD_TODO: "add-todo",
  DELETE_TODO: "delete-todo",
  COMPLETE_TODO: "complete-todo",
};
function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, { name: action.payload.name, complete: false }];
    case ACTIONS.DELETE_TODO:
      const newTodoList = todos.splice(action.payload, 1);

      return [newTodoList];
    default:
      return todos;
  }
}
function TodoList() {
  const [todos, dispatch] = useReducer(reducer, []);

  const addTodo = (event) => {
    event.preventDefault();
    dispatch({
      type: ACTIONS.ADD_TODO,
      payload: { name: event.target[0].value },
    });
  };
  return (
    <div>
      <form onSubmit={addTodo} className="border block">
        <input name="input" type="text" />
      </form>
      <div className="gap-1">
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              <button className="btn btn-sm text-sm">Set done</button>
              <button
                onClick={() => {
                  dispatch({
                    type: ACTIONS.DELETE_TODO,
                    payload: { index },
                  });
                }}
                className="btn btn-sm text-sm"
              >
                Delete
              </button>
              {todo.name}
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default TodoList;
