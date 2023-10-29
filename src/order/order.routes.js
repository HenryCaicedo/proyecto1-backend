// src/order/order.routes.js
const { Router } = require("express");
const { createOrder, readOrder, readOrders, updateOrder, deleteOrder, showAllOrders } = require("./order.controller");
const router = Router();

// Crear orden
router.post('/', createOrder);

// Buscar orden
router.get('/:orderId', readOrder);

// Buscar orden por usuario o restaurante
router.get('/', readOrders);

// Actualizar info de orden
router.patch('/:orderId', updateOrder);

// Inhabilitar orden
router.delete('/:orderId', deleteOrder);

// Mostrar todas las ordenes
router.post('/all', showAllOrders);

module.exports = router;
