// routes/checkout.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

router.post('/', async (req, res) => {
    console.log('Checkout route accessed');
  try {
    const { orderItems } = req.body;

    // Loop through the order items and update the database
    for (const orderItem of orderItems) {
      const product = await Product.findById(orderItem.product);
      if (product) {
        product.countInStock -= orderItem.qty;
        await product.save();
      }
      console.log('Order successfully processed');
    }

    res.json({ message: 'Order successfully processed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
