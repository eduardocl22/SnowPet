const consejoModel = require("../models/consejoModel");

const consejoService = new consejoModel();

module.exports = {
  obtenerConsejos: async (req, res) => {
    try {
      const data = await consejoService.obtenerConsejos();
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

  guardarConsejo: async (req, res) => {
    const data = {
      idconsejo: req.body.idconsejo || 0,
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      fecha: req.body.fecha,
      idusuario: req.body.idusuario,
    };

    try {
      if (data.idconsejo === 0) {
        const newId = await consejoService.guardarConsejo(data);
        res
          .status(200)
          .json({ Success: true, results: newId, message: "creado exitoso" });
      } else {
        await consejoService.actualizarConsejo(data);
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

  eliminarConsejo: async (req, res) => {
    const idConsejo = parseInt(req.params.id);
    try {
      await consejoService.eliminarConsejo(idConsejo);
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
