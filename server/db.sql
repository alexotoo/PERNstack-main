CREATE DATABASE todopgsql;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(200) NOT NULL
);