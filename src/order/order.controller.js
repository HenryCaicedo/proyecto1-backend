const Order = require("./order.model");

const createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const order = new Order(orderData);
        const newOrder = await order.save();
        res.status(201).json({
            success: true,
            message: 'Orden creada exitosamente',
            order: newOrder
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear una orden' });
    }
};

const readOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);

        if (!order) {
            res.status(404).json({ error: 'Orden no encontrada o inhabilitada' });
            return;
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la orden por ID' });
    }
};

const readOrders = async (req, res) => {
    try {
        


        const filteredOrders = await Order.find({});

        if (filteredOrders.length === 0) {
            res.status(404).json({ error: 'No se encontraron órdenes que coincidan con los filtros' });
        } else {
            res.status(200).json(filteredOrders);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las órdenes con los filtros proporcionados' });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        if (!orderId) {
            res.status(400).json({ error: 'Se requiere un ID de orden' });
            return;
        }

        const order = await Order.findById(orderId);

        if (!order) {
            res.status(404).json({ error: 'Orden no encontrada' });
            return;
        }

        if (!order.active) {
            res.status(400).json({ error: 'No se pueden actualizar órdenes inactivas' });
            return;
        }

        const updatedOrderData = req.body;
        Object.assign(order, updatedOrderData);

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la orden' });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        if (!orderId) {
            res.status(400).json({ error: 'Se requiere un ID de orden' });
            return;
        }

        const order = await Order.findById(orderId);

        if (!order) {
            res.status(404).json({ error: 'Orden no encontrada' });
            return;
        }

        order.active = false;
        await order.save();

        res.status(200).json({ message: 'Orden inhabilitada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al inhabilitar la orden' });
    }
};



// ELIMINAR
const showAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});

        if (orders.length === 0) {
            res.status(404).json({ error: 'No se encontraron órdenes' });
        } else {
            res.status(200).json(orders);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todas las órdenes' });
    }
};

module.exports = { createOrder, readOrder, readOrders, updateOrder, deleteOrder, showAllOrders };
