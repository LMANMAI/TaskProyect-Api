const express = require("express");
const router = express.Router();

// /api/hello
//_Ruta de prueba
router.get("/", function (req, res) {
  res.send(
    "Esta es una ruta de prueba parsa revisar el funcionamiento de la api, andando ok"
  );
});
module.exports = router;
