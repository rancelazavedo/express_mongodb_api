const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const ProductModel = require("./models/Products")

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  ""
);

app.get("/getUsers", async (req, res) => {
    try {
      const result = await UserModel.find({});
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });

app.get("/getUser/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await UserModel.findOne({ _id: userId });
      if (user) {
        res.json(user);
      } else {
        res.json({ message: "User not found" });
      }
    } catch (err) {
      res.json(err);
    }
  });



app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.delete("/deleteUser/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (deletedUser) {
      res.json({ message: "User deleted successfully", deletedUser });
    } else {
      res.json({ message: "User not found" });
    }
  } catch (err) {
    res.json(err);
  }
});


app.get("/getProducts", async (req, res) => {
  try {
    const result = await ProductModel.find({});
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

app.post("/createProduct", async (req, res) => {
  const product = req.body;
  const newProduct = new ProductModel(product);
  await newProduct.save();

  res.json(product);
});

app.delete("/deleteProduct/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.json({ message: "Product deleted successfully", deletedProduct });
    } else {
      res.json({ message: "Product not found" });
    }
  } catch (err) {
    res.json(err);
  }
});


app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});

