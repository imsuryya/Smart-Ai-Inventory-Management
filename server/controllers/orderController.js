// controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { customerName, address, products } = req.body;
    const totalAmount = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const order = new Order({
      customerName,
      address,
      products,
      totalAmount
    });
    
    await order.save();
    
    // Update product quantities
    for (const item of products) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { quantity: -item.quantity } }
      );
    }
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};