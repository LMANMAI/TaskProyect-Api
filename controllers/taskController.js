const TaskModel = require("../models/Tasks");
const ProyectModel = require("../models/Proyectos");
const { validationResult } = require("express-validator");

function verificarErrores(req, res) {
  //reviso si tengo errores de validacion
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
}

exports.crearTask = async (req, res) => {
  verificarErrores(req, res);
  try {
    //verifico que exista un proyecot para agregarle la tarea
    const { proyecto } = req.body;

    const proyectoExiste = await ProyectModel.findById(proyecto);

    if (!proyectoExiste) {
      return res.status(404).json({ msg: "no se encontro el proyecto" });
    }
    //verificar creador del proyecto
    if (proyectoExiste.creador.toString() !== req.user.id) {
      res
        .status(401)
        .json({ msg: "No se tiene autorizacion para editar el proyecto" });
    }

    const task = await TaskModel(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    res.status(500).json({ msg: "Ocurrio un problema agregando la tarea" });
  }
};

//obtener las tareas
exports.obtenerTareas = async (req, res) => {
  verificarErrores(req, res);
  try {
    //verifico que exista un proyecot para agregarle la tarea
    const { proyecto } = req.query;
    // //console.log(proyecto)
    const proyectoExiste = await ProyectModel.findById(proyecto);

    if (!proyectoExiste) {
      return res.status(404).json({ msg: "no se encontro el proyecto" });
    }
    //verificar creador del proyecto
    if (proyectoExiste.creador.toString() !== req.user.id) {
      res
        .status(401)
        .json({ msg: "No se tiene autorizacion para editar el proyecto" });
    }
    const task = await TaskModel.find({ proyecto });
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: "Ocurrio un problema al traer los proyectos" });
  }
};
exports.editarTarea = async (req, res) => {
  verificarErrores(req, res);
  try {
    //verifico que exista un proyecot para agregarle la tarea
    const { proyecto, nombre, estado } = req.body;
    // //console.log(proyecto)
    let tarea = await TaskModel.findById(req.params.id);
    const proyectoExiste = await ProyectModel.findById(proyecto);

    if (!tarea) {
      res.status(404).json({ msg: "No existe la tarea" });
    }
    //verificar creador del proyecto
    if (proyectoExiste.creador.toString() !== req.user.id) {
      res
        .status(401)
        .json({ msg: "No se tiene autorizacion para editar el proyecto" });
    }
    //creo un objeti con la nueva informacion
    const newTask = {};
    newTask.nombre = nombre;
    newTask.estado = estado;
    //guardo la tarea
    tarea = await TaskModel.findOneAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });
    res.json({ tarea });
  } catch (error) {
    res.status(500).json({ msg: "Ocurrio un problema editando la tarea" });
  }
};

//elimino la tarea
exports.eliminarTarea = async (req, res) => {
  verificarErrores(req, res);

  try {
    //verifico que exista un proyecot para agregarle la tarea
    const { proyecto } = req.query;
    // //console.log(proyecto)
    let tarea = await TaskModel.findById(req.params.id);
    const proyectoExiste = await ProyectModel.findById(proyecto);

    if (!tarea) {
      res.status(404).json({ msg: "No existe la tarea" });
    }
    //verificar creador del proyecto
    if (proyectoExiste.creador.toString() !== req.user.id) {
      res
        .status(401)
        .json({ msg: "No se tiene autorizacion para editar el proyecto" });
    }

    await TaskModel.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea eliminada correcatamente" });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ msg: "Ocurrio un problema eliminando la tarea" });
  }
};
