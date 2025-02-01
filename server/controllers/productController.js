const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductByQR = async (req, res) => {
  try {
    const product = await Product.findOne({ qrCode: req.params.qrCode });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyAndRemoveProduct = async (req, res) => {
  try {
    const qrData = req.body;
    
    // Find product that matches the QR data
    const product = await Product.findOne({
      name: qrData.name,
      category: qrData.category,
      price: qrData.price
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found in inventory' });
    }
    
    if (product.quantity <= 0) {
      return res.status(400).json({ message: 'Product out of stock' });
    }

    // Decrement quantity or remove if last item
    if (product.quantity === 1) {
      await Product.deleteOne({ _id: product._id });
    } else {
      product.quantity -= 1;
      await product.save();
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};