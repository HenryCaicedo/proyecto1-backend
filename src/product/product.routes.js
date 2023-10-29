// src/product/product.routes.js
const { Router } = require("express");
const { createProduct, readProduct, readProducts, updateProduct, deleteProduct, viewAllProducts } = require("./product.controller");
const router = Router();

// Crear producto
router.post('/', createProduct);

// Buscar producto
router.get('/:productId', readProduct);

// Filtrar productos por categoría
router.get('/', readProducts);

// Actualizar info de producto
router.patch('/:productId', updateProduct);

// Inhabilitar producto
router.delete('/:productId', deleteProduct);



// ELIMINAR
// Ver todos los productos
router.post('/all', viewAllProducts);

module.exports = router;
