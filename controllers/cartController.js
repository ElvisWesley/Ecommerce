// controllers/cartController.js

const pool = require('../db/index');

// CREATE CART
exports.createCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const query = 'INSERT INTO carts (userId) VALUES ($1) RETURNING *';
    const values = [userId];

    const { rows } = await pool.query(query, values);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// ADD PRODUCT TO CART
exports.addProductToCart = async (req, res) => {
    try {
      const { cartId } = req.params;
      const { productId, quantity } = req.body;
  
      // Check if the product already exists in the cart
      const existingProductQuery = 'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2';
      const existingProductValues = [cartId, productId];
      const { rows } = await pool.query(existingProductQuery, existingProductValues);
  
      if (rows.length > 0) {
        // Update the quantity if the product already exists
        const updateQuantityQuery = 'UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3';
        const updateQuantityValues = [quantity, cartId, productId];
        await pool.query(updateQuantityQuery, updateQuantityValues);
      } else {
        // Insert the new product into the cart
        const insertProductQuery = 'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)';
        const insertProductValues = [cartId, productId, quantity];
        await pool.query(insertProductQuery, insertProductValues);
      }
  
      res.json({ message: 'Product added to cart successfully' });
    } catch (error) {
      console.error('Error querying the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  // REMOVE PRODUCT FROM CART
exports.removeProductFromCart = async (req, res) => {
    try {
      const { cartId } = req.params;
      const { productId } = req.body;
  
      const query = 'DELETE FROM cart_products WHERE cart_id = $1 AND product_id = $2';
      const values = [cartId, productId];
  
      await pool.query(query, values);
  
      res.json({ message: 'Product removed from cart successfully' });
    } catch (error) {
      console.error('Error querying the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// READ CART BY ID
exports.getCartById = async (req, res) => {
  try {
    const { cartId } = req.params;
    const query = 'SELECT * FROM carts WHERE id = $1';
    const values = [cartId];

    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Cart not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// DELETE CART
exports.deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const query = 'DELETE FROM carts WHERE id = $1';
    const values = [cartId];

    await pool.query(query, values);
    res.json({ message: 'Cart deleted successfully' });
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
