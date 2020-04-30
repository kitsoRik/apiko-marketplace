const productsRouter = require("express").Router();

productsRouter.use("/products", require("./add"));

module.exports = productsRouter;