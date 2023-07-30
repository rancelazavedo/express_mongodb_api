const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const ProductModel = require("./models/Products")

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://user123:hitohitonomi@cluster0.evo7a7c.mongodb.net/merchappdb?retryWrites=true&w=majority"
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

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});

