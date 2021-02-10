//logica del endpoint
//importo el modelo de usuarui
const UserModel = require('../models/Usuario');
const bcrytjs = require('bcryptjs');

exports.crearUsuario = async ( req, res ) => {
   try {
    //extraigo el usuario y la contraseña para ver que no se creo el mismo usuario
    const {email, password} = req.body;
    let user = await UserModel.findOne({email});
    if(user){
        return res.status(400).json({msg: 'El usuario ya existe'})
    }
   
    //creo el usuario con el modelo
    const usuario = new UserModel(req.body);
     //hasheo el password
     const salt = await bcrytjs.genSalt(5);
     usuario.password = await bcrytjs.hash(password, salt);

    console.log(usuario)
    await usuario.save();
    res.json({msg: 'Usuario creado correctamente'})
   } catch (error) {
       console.log(error);
       res.status(500).send(error);
   }
}