const express = require("express");
const productService = require("../service/product.service");
const validatorHandler = require("../middleware/validatorHandler");
const { createProductSchema, updateProductSchema, getProductSchema } = require("../schemas/product.schema");

const productsRouter = express.Router();
const productServ = new productService;

productsRouter.use(express.json());

productsRouter.get("/filter", (request, response) => {
  response.send("For filtering products");
});



productsRouter.get("/", async (request, response) => {
  const products = await productServ.find();
  response.json(products);
});

productsRouter.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const products = await productServ.findOne(id);
      response.json(products);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (request, response) => {
    const body = request.body;
    const products = await productServ.create(body);
    response.status(201).json(products);
  }
);

productsRouter.patch(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (request, response) => { // similar tu PUT method
    try {
      const { id } = request.params;
      const body = request.body;

      const product = await productServ.update(id, body);
      response.json(product);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;

  const message = await productServ.delete(id);
  response.json({message});
});

module.exports = productsRouter;
