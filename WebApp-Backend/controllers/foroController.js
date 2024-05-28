const foroModel = require("../models/foroModel");

const foroService = new foroModel();

module.exports = {
  obtenerForos: async (req, res) => {
    try {
      const data = await foroService.obtenerForos();
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

  guardarForo: async (req, res) => {
    const data = {
      id_foro: req.body.id_foro || 0,
      descripcion: req.body.descripcion,
      tipo: req.body.tipo,
      fecha: req.body.fecha,
      id_usuario: req.body.id_usuario,
      id_noticias: req.body.id_noticias,
      id_consejo: req.body.id_consejo,
    };
    try {
      if (data.id_foro == 0) {
        const newId = await foroService.guardarForo(data);
        res
          .status(200)
          .json({ Success: true, results: newId, message: "creado exitoso" });
      } else {
        await foroService.actualizarForo(data);
        res
          .status(200)
          .json({ Success: true, results: 1, message: "actualizado exitoso" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ Success: false, results: null, message: error.message });
    }
  },

  eliminarForo: async (req, res) => {
    const idForo = parseInt(req.params.id);
    try {
      await foroService.eliminarForo(idForo);
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
