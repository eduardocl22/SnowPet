const express = require('express');
const router = express.Router();
const controller = require('../controllers/mascotaController');

router.get('/obtener', controller.obtenerMascotas); 
router.post('/Guardar', controller.guardarMascota);
router.delete('/Eliminar/:id', controller.eliminarMascota);


module.exports = router;