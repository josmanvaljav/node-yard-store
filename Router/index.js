const express = require("express");

const productsRouter = require("./products.router");
const usersRouter = require("./users.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/products", productsRouter);
  router.use("/users", usersRouter);

  const routerv2 = express.Router();
  app.use("/api/v2", routerv2);
  routerv2.use("/products", productsRouter);
  routerv2.use("/users", usersRouter);
}

module.exports = routerApi;
