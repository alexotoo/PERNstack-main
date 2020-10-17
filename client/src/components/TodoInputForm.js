import React, { useState } from "react";

function TodoInputForm() {
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { description };
    fetch("http://localhost:3500/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => {
        const data = response;
        console.log(data);
        window.location = "/";
      })
      .catch((err) => console.log(err));
    setDescription("");
  };

  return (
    <>
      <h1 className="text-center mt-5 mb-4">Todo app with PERN</h1>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          type="text"
          value={description}
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
}

export default TodoInputForm;
