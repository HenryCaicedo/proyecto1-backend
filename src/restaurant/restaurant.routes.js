// src/restaurant/restaurant.routes.js
const { Router } = require("express");
const { createRestaurant, readRestaurant, readRestaurants, updateRestaurant, deleteRestaurant, showAllRestaurants } = require("./restaurant.controller");
const router = Router();

// Crear Restaurante
router.post('/', createRestaurant);

// Buscar restaurante
router.get('/:restaurantId', readRestaurant);

// Filtrar restaurantes por categoría
router.get('/', readRestaurants);

// Actualizar info de restaurante
router.patch('/:restaurantId', updateRestaurant);

// Inhabilitar restaurante
router.delete('/:restaurantId', deleteRestaurant);

// Mostrar a todos los restaurantes
router.post('/all', showAllRestaurants);

module.exports = router;
