const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const {
  getProducts,
  getProductById,
} = require("../controller/prouductControllers");

router.get("/", getProducts);
router.get("/:id", getProductById);
// Define a search route that accepts query parameters and searches for products by name
router.get("/search", async (req, res) => {
  const query = req.query.name;

  try {
    const regex = new RegExp(query, "i"); // Create a case-insensitive regex
    const products = await Product.find({ name: regex });
    res.json(products);
  } catch (error) {
    console.error("Error searching for products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;