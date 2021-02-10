const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// /api/users
router.post('/', usuarioController.crearUsuario);

module.exports = router;