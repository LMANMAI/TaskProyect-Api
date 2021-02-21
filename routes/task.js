const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
//importo el controlador
const taskController = require('../controllers/taskController');
//importo el middlewar de autenticacion para verificar el token
const authMiddleware = require('../middlewares/auth');
 
// api/task
//agregar las tareas
router.post('/',
    [check('nombre', 'El nombre de la tarea es necesaria').not().isEmpty()],
    authMiddleware, 
    taskController.crearTask);
//obtener las tareas por proyecto
router.get('/',
    authMiddleware,
    taskController.obtenerTareas);
//editar las tareas
router.put('/:id',
    authMiddleware,
    taskController.editarTarea);
//Eliminar las tareas
router.delete('/:id',
    authMiddleware,
    taskController.eliminarTarea);

module.exports = router;