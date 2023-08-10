const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

// Ruta para obtener todos los datos
router.get('/', dataController.getAllData);

// ... Otras rutas para crear, actualizar y eliminar datos

module.exports = router;