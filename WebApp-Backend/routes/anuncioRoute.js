const express = require('express');
const router = express.Router();
const controller = require('../controllers/anuncioController');

router.get('/obtener', controller.obtenerAnuncios); 
router.post('/Guardar', controller.GuardarAnuncio);
router.delete('/Eliminar/:id', controller.eliminarAnuncio);

module.exports = router;