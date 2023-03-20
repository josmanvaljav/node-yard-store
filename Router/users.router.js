const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/", (request, response) => {
  response.send("my express server in a /users");
});

module.exports = usersRouter;
