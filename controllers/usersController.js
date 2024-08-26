// controllers/userController.js

const pool = require('../db/index');

// GET /users
exports.getUsers = async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /users/{userId}
exports.getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [userId];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PUT /users/{userId}
exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { name, email } = req.body; // assuming you're updating name and email
  try {
    const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';
    const values = [name, email, userId];
    await pool.query(query, values);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE /users/{userId}
exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const query = 'DELETE FROM users WHERE id = $1';
    const values = [userId];
    await pool.query(query, values);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};