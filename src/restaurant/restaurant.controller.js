// src/restaurant/restaurant.controller.js
const Restaurant = require("./restaurant.model");

const createRestaurant = async (req, res) => {
    try {
        const restaurantData = req.body;
        const restaurant = new Restaurant(restaurantData);
        const newRestaurant = await restaurant.save();
        res.status(201).json({
            success: true,
            message: 'Restaurante creado exitosamente',
            restaurant: newRestaurant
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear un restaurante' });
    }
};


const readRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;

        if (!restaurantId) {
            res.status(400).json({ error: 'Se requiere un ID de restaurante' });
            return;
        }

        // Check if the restaurant with the given ID exists and is active
        const restaurant = await Restaurant.findOne({ _id: restaurantId, active: true });

        if (!restaurant) {
            res.status(404).json({ error: 'Restaurante no encontrado o inhabilitado' });
            return;
        }

        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el restaurante por ID' });
    }
};

const readRestaurants = async (req, res) => {
    try {
        const { category } = req.query;

        if (!category) {
            res.status(400).json({ error: 'Se requiere una categoría para filtrar restaurantes' });
            return;
        }

        const restaurants = await Restaurant.find({ category });

        if (restaurants.length === 0) {
            res.status(404).json({ error: 'No se encontraron restaurantes para la categoría especificada' });
            return;
        }

        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Error al filtrar restaurantes por categoría' });
    }
};


const updateRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;

        if (!restaurantId) {
            res.status(400).json({ error: 'Se requiere un ID de restaurante' });
            return;
        }

        const updates = req.body; 

        const existingRestaurant = await Restaurant.findOne({ _id: restaurantId, active: true });

        if (!existingRestaurant) {
            res.status(404).json({ error: 'Restaurante no encontrado o inactivo' });
            return;
        }


        const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, updates, { new: true });

        res.status(200).json(updatedRestaurant);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el restaurante' });
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;

        if (!restaurantId) {
            res.status(400).json({ error: 'Se requiere un ID de restaurante' });
            return;
        }

        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            res.status(404).json({ error: 'Restaurante no encontrado' });
            return;
        }

        if (!restaurant.active) {
            res.status(200).json({ message: 'El restaurante ya está inactivo' });
            return;
        }

        restaurant.active = false;

        await restaurant.save();

        res.status(200).json({ message: 'Restaurante inhabilitado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al inhabilitar el restaurante' });
    }
};


// ELIMINAR
const showAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});

        if (restaurants.length === 0) {
            res.status(404).json({ error: 'No se encontraron restaurantes' });
        } else {
            res.status(200).json(restaurants);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todos los restaurantes' });
    }
};

module.exports = { createRestaurant, readRestaurant, readRestaurants, updateRestaurant, deleteRestaurant, showAllRestaurants };