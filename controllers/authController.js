//controlador de la autenticacion 

//importo el modelo de usuario
const UserModel = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async ( req, res )=>{
    //reviso si tengo errores de validacion
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() })
    }
    try { 
        //reviso que el usario exista
        const { email, password }= req.body;         
        let user = await UserModel.findOne({ email });
        if(!user){
            return res.status(404).json({msg: 'No se encontro un usuario con ese email'})
        }
        //comparo los passwords
        const passCompare = await bcryptjs.compare(password, user.password);
        if(!passCompare){
            return res.status(400).json({msg: 'La contraseña es incorrecta'});
        }
        //si todo es correcto paso a crear el token
        //Firmo el token para manejar la sesion
        const payload = {
            user:{
                id: user.id
            }
        }
        //Firmo el jwt
        jwt.sign(payload, process.env.JWTOKEN, {
            expiresIn: 3600000
        },(error, token)=>{
            if(error) throw error;
            res.json({token});
        });  
        
    } catch (error) {
        //console.log(error)
        res.status(500).json({msg: 'Hubo un problema autenticando el usuario'});
    }
}

exports.userAuth = async ( req, res )=> {
     //reviso si tengo errores de validacion
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({ errores: errores.array() })
     }
    try {        
        const user = await UserModel.findById(req.user.id).select('-password');
        console.log(req.user.id);

        res.json({user});
        
    } catch (error) {
        console.log(error.response);
        res.status(500).json({msg: 'Ocurrio un problema autenticando el usuario'});
    }
}