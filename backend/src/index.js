const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//task//
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM task", (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.post("/tasks", (req, res) => {
  const { taskname, taskdescription } = req.body;
  db.query("INSERT INTO task (taskname, taskdescription) VALUES (?, ?)", [taskname, taskdescription], (err, results)  => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { taskname, taskdescription } = req.body;
  db.query("UPDATE task SET taskname = ?, taskdescription = ? WHERE id = ?", [taskname, taskdescription, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM task WHERE id = ?", [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

//user//
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});