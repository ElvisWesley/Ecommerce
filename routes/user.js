// routes/user.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /users
router.get('/', userController.getUsers);

// GET /users/{userId}
router.get('/:userId', userController.getUserById);

// PUT /users/{userId}
router.put('/:userId', userController.updateUser);

// DELETE /users/{userId}
router.delete('/:userId', userController.deleteUser);

module.exports = router;