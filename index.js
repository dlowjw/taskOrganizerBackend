require("dotenv").config(); // load environment variables from .env file

const express = require("express"); // import express module
const fs = require("fs"); // import file system module

const usersController = require("./controllers/users.controller.js");

const app = express(); // initialize express app
const PORT = process.env.PORT || 8888; // set port from environment variable or default to 8888

app.use(express.json());

app.get("/ping", function (req, res) {
  console.log("req =", req);
  res.html("<img src='https://http.cat/200' />");
});

app.post("/users", async function (req, res) {
  try {
    const data = req.body;
    const read = usersController.read();
    usersController.write([...read, data]);
    res.status(201).json({
      msg: "data saved...",
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/users", async function (req, res) {
  const json = usersController.read();
  res.status(200).json({
    data: json,
    total: json.length,
  });
});

app.put("/users/:index", function (req, res) {
  const json = usersController.update(req.params.index, req.body);
  res.status(200).json({
    msg: "data updated",
    data: json[req.params.index],
  });
});

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
