const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  location: {
    type: String,
    enum: ['Inventory', 'E-commerce', 'Both'],
    default: 'Inventory'
  },
  qrCode: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    default: '/placeholder.svg'
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;