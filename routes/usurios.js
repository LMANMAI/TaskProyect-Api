const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');
// /api/users
router.post('/', [
    check('nombre', 'El nombre es necesario').not().isEmpty(),
    check('email', 'Es necesario un email correcto').isEmail(),
    check('password', 'La contraseña debe ser del almenos 6 caracteres').isLength({min: 6})
], usuarioController.crearUsuario);

module.exports = router;