const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/qr/:qrCode', productController.getProductByQR);
router.post('/verify-and-remove', productController.verifyAndRemoveProduct);

module.exports = router;