const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./conectdb");

//use middlewares========

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Routes========
//for create a todo
app.post("/todo", (req, res) => {
  const { description } = req.body;
  const newtodo = pool.query(
    "INSERT INTO todo (description) VALUES($1) RETURNING *",
    [description]
  );
  newtodo
    .then((result) => {
      const { todo_id, description } = result.rows[0];

      res.status(200).json({
        message: `A new item "${description}" added`,
        createdItem: {
          todo_id,
          description,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({ error: err });
    });
});

//for get all todos
app.get("/todo", (req, res) => {
  const alltodo = pool.query("SELECT * FROM todo;");
  alltodo
    .then((result) => {
      const data = result.rows;
      console.log(result);
      console.log(data);

      res.status(200).json({
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({ error: err });
    });
});

//for get a todos
app.get("/todo/:id", (req, res) => {
  const { id } = req.params;
  const todo = pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
  todo
    .then((result) => {
      console.log(result);
      const data = result.rows[0];
      console.log(data);
      res.status(200).json({
        message: `todo retreived`,
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({ error: err });
    });
});

//for update a todos
app.put("/todo/:id", (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const todo = pool.query(
    "UPDATE todo SET description = $1 WHERE todo_id = $2",
    [description, id]
  );
  todo
    .then((result) => {
      console.log(result);
      const data = result.rows[0];
      console.log(data);
      res.status(200).json({
        message: `todo has been updated`,
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({ error: err });
    });
});

//for delete a todos
app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;
  const deleteTodo = pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
  deleteTodo
    .then((results) => {
      console.log(results);
      res.json({ message: "todo has been deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({ error: err });
    });
});

//server
app.listen(3500, function () {
  console.log("Server started on port 3500");
});
