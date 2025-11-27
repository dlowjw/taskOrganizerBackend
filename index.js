require("dotenv").config(); // load environment variables from .env file

const express = require("express"); // import express module
const fs = require("fs"); // import file system module

const usersController = require("./controllers/users.controller.js");

const app = express(); // initialize express app
const PORT = process.env.PORT || 8888; // set port from environment variable or default to 8888

app.use(express.json());

app.get("/ping", usersController.test);

app.post("/users", usersController.write);

app.get("/users", usersController.read);

app.put("/users/:index", usersController.update);

app.delete("/users/:index", function (req, res) {
  try {
    // first thing you need to read file ( fs.readFileSync(<filename>))
    usersController.delete(req.params.index);
    res.status(200).json({
      msg: `data delted at index ${req.params.index}`,
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
