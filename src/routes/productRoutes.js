// routers/productRouters.js

import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

// Ruta para obtener todos los productos
router.get('/products', productController.getAllproducts);

// Ruta para obtener un producto por ID
router.get('/product/:id', productController.getProductsById);

// Ruta para crear un nuevo producto
router.post('/newproduct', productController.createNewProduct);

// Ruta para actualizar un producto existente
router.put('/editproduct/:id', productController.updateProduct);

// Ruta para eliminar un producto existente
router.delete('/delproduct/:id', productController.deleteProduct);

export default router;
