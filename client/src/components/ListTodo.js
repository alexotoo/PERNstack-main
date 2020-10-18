import React from "react";

function ListTodo({ lists, handleDelete }) {
  return (
    <>
      <table className="table table-dark text-center mt-4">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody className="table-secondary">
          {lists.map((list) => (
            <tr key={list.todo_id}>
              <td>{list.description}</td>
              <td>
                <button className="btn btn-success">Edit</button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(list.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ListTodo;
