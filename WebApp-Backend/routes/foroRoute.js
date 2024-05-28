const express = require('express');
const router = express.Router();
const controller = require('../controllers/foroController');

router.get('/obtener', controller.obtenerForos); 
router.post('/Guardar', controller.guardarForo);
router.delete('/Eliminar/:id', controller.eliminarForo);


module.exports = router;