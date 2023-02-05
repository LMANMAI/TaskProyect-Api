const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //tengo que leer el token que envio por header
  //x-auth-token
  const token = req.header("x-auth-token");

  ////console.log(token);
  //reviso si no hay token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No hay token, No se pudo validar el permiso" });
  }
  //valido el token
  try {
    const cifrado = jwt.verify(token, process.env.JWTOKEN);
    req.user = cifrado.user;
    next();
  } catch (error) {
    //console.log(error);
    res.status(500).json({ msg: "Hubo un problema validando al usuario" });
  }
};
