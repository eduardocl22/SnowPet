const express = require('express');
const router = express.Router();
const controller = require('../controllers/consejoController');

router.get('/obtener', controller.obtenerConsejos); 
router.post('/Guardar', controller.guardarConsejo);
router.delete('/Eliminar/:id', controller.eliminarConsejo);


module.exports = router;