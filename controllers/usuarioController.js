//importo el modelo de usuario
const UserModel = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  //reviso si tengo errores de validacion
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    //extraigo el usuario y la contraseña para ver que no se creo el mismo usuario
    const { email, password } = req.body;
    let userCompare = await UserModel.findOne({ email });
    if (userCompare) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }
    //creo el usuario con el modelo
    const user = new UserModel(req.body);

    //hasheo el password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    //guardo el usuario
    await user.save();
    //Firmo el token para manejar la sesion
    const payload = {
      user: {
        id: user.id,
      },
    };
    //Firmo el jwt
    jwt.sign(
      payload,
      process.env.JWTOKEN,
      {
        expiresIn: 3600000,
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};
