const ProyectModel = require("../models/Proyectos");
const { validationResult } = require("express-validator");
function verificarErrores(req, res) {
  //reviso si tengo errores de validacion
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
}

exports.crearProyecto = async (req, res) => {
  verificarErrores(req, res);
  try {
    const proyect = new ProyectModel(req.body);
    proyect.creador = req.user.id;
    await proyect.save();
    res.json({ proyect });
  } catch (error) {
    res.status(500).json({ msg: "Ocurrio un problema creando el proyecto" });
  }
};
//obtengo todos los proyectos del usuario
exports.obtenerProyectos = async (req, res) => {
  verificarErrores(req, res);
  try {
    //uso los metodos del modelo para traerme con el find todos los proyectos del usuario, donde el creador tiene que ser igual que le id que esta encriptado en el JWT
    const proyects = await ProyectModel.find({ creador: req.user.id });
    res.status(200).json(proyects);
  } catch (error) {
    res.status(500).json({ msg: "Ocurrio un problema al traer los proyectos" });
  }
};
exports.obtenerProyecto = async (req, res) => {
  verificarErrores(req, res);
  try {
    //uso los metodos del modelo para traerme con el find todos los proyectos del usuario, donde el creador tiene que ser igual que le id que esta encriptado en el JWT
    const proyect = await ProyectModel.findById(req.params.id);
    res.status(200).json(proyect);
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrio un problema al traer el proyecto correspondiente",
    });
  }
};
//actualizo el proyecto
exports.actualizarProyecto = async (req, res) => {
  verificarErrores(req, res);
  try {
    const { estado, nombre } = req.body;
    let proyecto = await ProyectModel.findById(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ msg: "No se encontro el proyecto" });
    }
    if (proyecto.creador.toString() !== req.user.id) {
      res
        .status(401)
        .json({ msg: "No se tiene autorizacion para editar el proyecto" });
    }
    const proyectEdit = {};
    proyectEdit.estado = estado;
    proyectEdit.nombre = nombre;
    proyecto = await ProyectModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: proyectEdit },
      { new: true }
    );
    res.json({ proyecto });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un problema actualizando el proyecto" });
  }
};
//eliminar el proyecto
exports.eliminarProyecto = async (req, res) => {
  verificarErrores(req, res);
  try {
    //revisar el id del proyecto
    let proyecto = await ProyectModel.findById(req.params.id);

    //revisar si el proyecto existe
    if (!proyecto) {
      return res.status(404).json({ msg: "No se encontro el proyecto" });
    }
    //verificar creador del proyecto
    if (proyecto.creador.toString() !== req.user.id) {
      res
        .status(401)
        .json({ msg: "No se tiene autorizacion para editar el proyecto" });
    }

    //Elimino el proyecto
    await ProyectModel.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Se elimino el proyecto " });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un problema eliminando el proyecto" });
  }
};
