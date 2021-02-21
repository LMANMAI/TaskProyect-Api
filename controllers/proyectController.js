const ProyectModel = require('../models/Proyectos');
const { validationResult } = require('express-validator');
function verificarErrores(req, res) {
    //reviso si tengo errores de validacion
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() });
    }
}

exports.crearProyecto = async( req, res) =>{
    verificarErrores(req, res);  
    try {
        const proyect = new ProyectModel(req.body);
        //guardar el creador via JWT
        proyect.creador = req.user.id
        await proyect.save();
        res.json({proyect});
        // //console.log(proyect);
    } catch (error) {
        //console.log(error);
        res.status(500).json({msg: 'Ocurrio un problema creando el proyecto'});
    }
}
//obtengo todos los proyectos del usuario
//ACA TENGO QUE FILTRAR LOS PROYECTOS QUE ESTEN ACTIVOS(false en el estado) y los que esten terminados true mostrarlos en otro componente
exports.obtenerProyectos = async(req, res) =>{
    verificarErrores(req, res);  
    ////console.log('desde el controlador de proyecto FN obtener proyectos');
    ////console.log(req.user)
    try {
        //uso los metodos del modelo para traerme con el find todos los proyectos del usuario, donde el creador tiene que ser igual que le id que esta encriptado en el JWT
        const proyects = await ProyectModel.find({creador: req.user.id});
        res.status(200).json(proyects);
    } catch (error) {
        //console.log(error);
        res.status(500).json({ msg: 'Ocurrio un problema al traer los proyectos'});
    }
}
//actualizo el proyecto
exports.actualizarProyecto = async(req, res) =>{ 
    verificarErrores(req, res);     
    try {
        const { estado } = req.body
        // //console.log(estado)
         //revisar el id del proyecto
       let proyecto = await ProyectModel.findById(req.params.id);
        //  //console.log(req.params.id)

        //revisar si el proyecto existe
            if(!proyecto){
                return res.status(404).json({msg: 'No se encontro el proyecto'}); 
            }
        //verificar creador del proyecto
            if(proyecto.creador.toString() !== req.user.id){
            res.status(401).json({msg: 'No se tiene autorizacion para editar el proyecto'})
            }
        //actualizar
        const proyectEdit = {};
        //Por cada campo tengo que agregar un if
        proyectEdit.estado = estado;
        proyecto = await ProyectModel.findOneAndUpdate({_id: req.params.id},{$set: proyectEdit}, {new: true});
        res.json({proyecto});

    } catch (error) {
        //console.log(error);
        res.status(500).json({msg: 'Hubo un problema actualizando el proyecto'});
    }
}
//eliminar el proyecto
exports.eliminarProyecto = async(req, res)=>{
    verificarErrores(req, res);  
    try {
        //revisar el id del proyecto
        let proyecto = await ProyectModel.findById(req.params.id);

       //revisar si el proyecto existe
        if(!proyecto){
            return res.status(404).json({msg: 'No se encontro el proyecto'}); 
        }
       //verificar creador del proyecto
        if(proyecto.creador.toString() !== req.user.id){
           res.status(401).json({msg: 'No se tiene autorizacion para editar el proyecto'})
        }
       
        //Elimino el proyecto
        await ProyectModel.findByIdAndRemove({_id: req.params.id});
        res.json({msg: 'Se elimino el proyecto '});
    } catch (error) {
        //console.log(error);
        res.status(500).json({ msg: 'Hubo un problema eliminando el proyecto'})
    }
}