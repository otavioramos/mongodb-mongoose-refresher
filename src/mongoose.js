const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
  .connect("mongodb://user1:password123@localhost:27017/admin")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection to database fails!");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();
  res.json({product: result});
};

const getProducts = async (req, res, next) => {
    const products = await Product.find().exec();
    res.json({ products: products});
}

module.exports = { createProduct, getProducts };
