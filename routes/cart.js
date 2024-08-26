const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// CREATE
router.post('/', cartController.createCart);

// READ
router.get('/:cartId', cartController.getCartById);

// ADD PRODUCT TO CART
router.post('/:cartId/products/:productId', cartController.addProductToCart);

// REMOVE PRODUCT FROM CART
router.delete('/:cartId/products/:productId', cartController.removeProductFromCart);

// DELETE
router.delete('/:cartId', cartController.deleteCart);

module.exports = router;