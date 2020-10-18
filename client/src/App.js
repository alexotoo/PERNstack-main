import React, { useEffect, useState } from "react";
import axios from "axios";

import TodoInputForm from "./components/TodoInputForm";
import ListTodo from "./components/ListTodo";

function App() {
  const [todos, setTodos] = useState([]);

  //get data on load
  useEffect(function getDate() {
    let url = "http://localhost:3500/todo";
    axios
      .get(url)
      .then((response) => {
        const todos = response.data.data;
        setTodos(todos);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //hendleDelete
  const handleDelete = (id) => {
    let url = `http://localhost:3500/todo/${id}`;
    axios
      .delete(url)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message));

    const filteredTodo = todos.filter((todo) => todo.todo_id !== id);
    setTodos(filteredTodo);
  };

  //hendleEdit
  const handleEdit = (id) => {
    let url = `http://localhost:3500/todo/${id}`;
    axios.put(url);
  };

  return (
    <>
      <div className="container ">
        <TodoInputForm />
        <ListTodo lists={todos} handleDelete={handleDelete} />
      </div>
    </>
  );
}

export default App;
