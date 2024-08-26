const pool = require('../db/index');

exports.getProductsByCategory = async (req, res) => {
  const categoryId = req.query.categoryId;

  try {
    const query = 'SELECT * FROM products WHERE category = $1';
    const values = [categoryId];

    const { rows } = await pool.query(query, values);

    res.json(rows);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.productId;

  try {
    const query = 'SELECT * FROM products WHERE id = $1';
    const values = [productId];

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, category } = req.body;

  try {
    const query = 'INSERT INTO products (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, description, price, category];

    const { rows } = await pool.query(query, values);

    res.json(rows[0]);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const { name, description, price, category } = req.body;

  try {
    const query = 'UPDATE products SET name = $1, description = $2, price = $3, category = $4 WHERE id = $5 RETURNING *';
    const values = [name, description, price, category, productId];

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const query = 'DELETE FROM products WHERE id = $1';
    const values = [productId];

    await pool.query(query, values);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};