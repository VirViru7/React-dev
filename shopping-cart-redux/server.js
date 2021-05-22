const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://MEAN:MEAN@mean.51y9u.mongodb.net/react-shopping-cart-db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(
    () => {
      console.log("database successfully connected");
    },
    (error) => {
      console.log("Database could not connected: " + error);
    }
  );

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    availableSizes: [String],
    price: Number,
  })
);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const saveProduct = await newProduct.save();
  res.send(saveProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const Order = mongoose.model(
  "orders",
  new mongoose.Schema(
    {
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamp: true,
    }
  )
);

app.post("/api/orders", async (req, res) => {
  console.log(req.body);
  if (
    !req.body.email ||
    !req.body.name ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ messaeg: "please enter all the reuired field" });
  }
  const order = await Order(req.body).save();
  res.send(order);
});

app.get("/api/orders", async (req, res) => {
  const order = await Order.find({});
  res.send(order);
});

const port = 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));
