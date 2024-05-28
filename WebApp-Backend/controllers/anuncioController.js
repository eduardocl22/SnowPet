const anuncioModel = require("../models/anuncioModel");
var anuncioService = new anuncioModel();

module.exports = {
  obtenerAnuncios: async (req, res) => {
    try {
      const data = await anuncioService.obtenerAnuncios();
      res
        .status(200)
        .json({ Success: true, results: data, message: "obtenido exitoso" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ Success: false, results: null, message: error.message });
    }
  },
  GuardarAnuncio: (req, res) => {
    var dataM = {
      idnoticias: req.body.idnoticias || 0,
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      estado: req.body.estado || 1,
      recompensa: req.body.recompensa,
      observacion: req.body.observacion,
      fecha: req.body.fecha,
      idusuario: req.body.idusuario,
      list_dataD: req.body.list_dataD,
      foto:req.body.fotoSend
    };

    if (dataM.idnoticias == 0) {
      anuncioService
        .GuardarAnuncio(dataM, dataM.list_dataD)
        .then((data) => {
          res
            .status(200)
            .json({ Success: true, results: data, message: "creado exitoso" });
        })
        .catch(function (error) {
          res
            .status(500)
            .json({ Success: false, results: null, message: error.message });
        });
    } else {
    }
  },
  eliminarAnuncio: async (req, res) => {
    const idAnuncio = parseInt(req.params.id);
    try {
      await anuncioService.eliminarAnuncio(idAnuncio);
      res
        .status(200)
        .json({ Success: true, results: 1, message: "eliminado exitoso" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ Success: false, results: null, message: error.message });
    }
  },
};
