const express = require("express");
const router = express.Router();

const {
  obtenerAmbientes
} = require("../controllers/ambientesController");

router.get("/", obtenerAmbientes);

module.exports = router;