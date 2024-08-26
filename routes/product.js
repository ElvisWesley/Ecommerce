const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
/**swagger
 * components:
  schemas:
    Product:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        description:
          type: string
        price:
          type: number
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
      required:
        - id
        - name
        - description
        - price
        - createdAt
        - updatedAt
 */
// GET /products?category={categoryId}
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products by category
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Products by category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Products not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/products', productController.getProductsByCategory);

// GET /products/{productId}
/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/products/:productId', productController.getProductById);

// POST /products (create a new product)
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal Server Error
 */
router.post('/products', productController.createProduct);

// PUT /products/{productId} (update a product)'
/**
 * @swagger
 * /products/{productId}:
 *   put:
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/products/:productId', productController.updateProduct);

// DELETE /products/{productId} (delete a product)
/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/products/:productId', productController.deleteProduct);

module.exports = router;