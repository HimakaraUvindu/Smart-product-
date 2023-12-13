require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/productRoutes");
const checkoutRouter = require("./routes/checkout");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Define the Mongoose Product model and schema
const productSchema = new mongoose.Schema({
  name: String,
  // Other product fields...
});

const Product = mongoose.model("Product", productSchema);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

// Define the route for searching products
app.get("/api/products/search", async (req, res) => {
  const query = req.query.name;

  try{
  const regex = new RegExp(query, "i");
  const products = await Product.find({name: regex});
  res.json(products)
  } catch (error) {
    console.error("Error searching for producrs:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
  });


app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
