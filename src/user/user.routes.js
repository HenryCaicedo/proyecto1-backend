// src/user/user.routes.js
const { Router } = require("express");
const { getUserById, createUser, readUser, updateUser, deleteUser, showAllUsers } = require("./user.controller");
const router = Router();

// Crear usuario
router.post('/', createUser);

// Buscar usuario por email y password
router.post('/credentials', readUser);

// Actualizar info de usuario
router.patch('/:userId', updateUser);

// Inhabilitar usuario
router.delete('/:userId', deleteUser);




// ELIMINAR DESPUÉS

// Buscar usuario por ID
router.get('/:userId', getUserById);

// Mostrar a todos los usuarios
router.post('/all', showAllUsers);



module.exports = router;
