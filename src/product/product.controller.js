// src/product/product.controller.js
const Product = require("./product.model");

const createProduct = async (req, res) => {
    try {
        const productData = req.body;

        const product = new Product(productData);

        const newProduct = await product.save();

        res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente',
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear un producto' });
    }
};


const readProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        if (!productId) {
            res.status(400).json({ error: 'Se requiere un ID de producto' });
            return;
        }

        const product = await Product.findById(productId);

        if (!product || !product.active) {
            res.status(404).json({ error: 'Producto no encontrado o inhabilitado' });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto por ID' });
    }
};



const readProducts = async (req, res) => {
    try {
        const category = req.query.category;

        if (!category) {
            res.status(400).json({ error: 'Se requiere una categoría para filtrar productos' });
            return;
        }

        // Find products by category
        const products = await Product.find({ category: category });

        if (products.length === 0) {
            res.status(404).json({ error: 'No se encontraron productos en esta categoría' });
            return;
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al filtrar productos por categoría' });
    }
};


const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        if (!productId) {
            res.status(400).json({ error: 'Se requiere un ID de producto' });
            return;
        }

        const product = await Product.findById(productId);

        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }

        if (!product.active) {
            res.status(400).json({ error: 'No se pueden actualizar productos inactivos' });
            return;
        }

        const updatedProductData = req.body;
        Object.assign(product, updatedProductData);

        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        if (!productId) {
            res.status(400).json({ error: 'Se requiere un ID de producto' });
            return;
        }

        const product = await Product.findById(productId);

        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }

        product.active = false;
        await product.save();

        res.status(200).json({ message: 'Producto inhabilitado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al inhabilitar el producto' });
    }
};



const viewAllProducts = async (req, res) => {
    try {
        // Retrieve all products from the database
        const products = await Product.find();

        if (products.length === 0) {
            res.status(404).json({ error: 'No se encontraron productos' });
            return;
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todos los productos' });
    }
};

module.exports = { createProduct, readProduct, readProducts, updateProduct, deleteProduct, viewAllProducts };