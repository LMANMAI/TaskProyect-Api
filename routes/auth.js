//ruta para autenticar datos que envia el usuario
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
//importo el controlador de la autenticacion
const authController = require('../controllers/authController');
//import middleware
const authMiddleware = require('../middlewares/auth');

// /api/auth
router.post('/', authController.autenticarUsuario);

//obtengo el usuario autenticado
router.get('/',
    authMiddleware,
    authController.userAuth);

module.exports = router;