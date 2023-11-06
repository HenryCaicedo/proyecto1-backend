// src/order/order.routes.js
const { Router } = require("express");
const { createOrder, readOrder, readOrders, readSentOrder ,updateOrder, deleteOrder, showAllOrders } = require("./order.controller");
const router = Router();

// Crear orden
router.post('/', createOrder);

// Buscar orden
router.get('/:orderId', readOrder);

// New route to read filtered orders
router.get('/filter', readOrders);

// New route to read sent orders
router.get('/sent', readSentOrder);

// Actualizar info de orden
router.patch('/:orderId', updateOrder);

// Inhabilitar orden
router.delete('/:orderId', deleteOrder);


//BORRAR
// Mostrar todas las ordenes
router.post('/all', showAllOrders);




module.exports = router;
