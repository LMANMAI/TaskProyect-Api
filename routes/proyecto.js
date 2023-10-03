const express = require("express");
const router = express.Router();
const ProyectoController = require("../controllers/proyectController");
//importo el middleware de autenticacion
const authMiddleware = require("../middlewares/auth");
//valido
const { check } = require("express-validator");

// /api/proyect
//creo proyecto
router.post(
  "/",
  [check("nombre", "El nombre es necesario").not().isEmpty()],
  authMiddleware,
  ProyectoController.crearProyecto
);
//obtengo proyectos
router.get("/", authMiddleware, ProyectoController.obtenerProyectos);
//obtengo 1 proyecto
router.get("/:id", authMiddleware, ProyectoController.obtenerProyecto);
//actualizo proyecto
router.put("/:id", authMiddleware, ProyectoController.actualizarProyecto);
//eliminar un proyecto
router.delete("/:id", authMiddleware, ProyectoController.eliminarProyecto);

module.exports = router;
