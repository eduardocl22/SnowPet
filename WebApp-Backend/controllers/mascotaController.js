const mascotaModel = require("../models/mascotaModel");

const mascotaService = new mascotaModel();

module.exports = {
  obtenerMascotas: async (req, res) => {
    try {
      const data = await mascotaService.obtenerMascotas();
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

  guardarMascota: async (req, res) => {
    const data = {
      idmascota: req.body.idmascota || 0,
      raza: req.body.raza,
      foto: req.body.foto || null,
      descripcion: req.body.descripcion,
      nombre: req.body.nombre,
      fechanac: req.body.fechanac,
      observacion: req.body.observacion,
      idusuario: req.body.idusuario,
    };
    try {
      if (data.idmascota === 0) {
        const newId = await mascotaService.guardarMascota(data);
        res
          .status(200)
          .json({ Success: true, results: newId, message: "creado exitoso" });
      } else {
        await mascotaService.modificarMascota(data);
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

  eliminarMascota: async (req, res) => {
    const idMascota = parseInt(req.params.id);
    try {
      await mascotaService.eliminarMascota(idMascota);
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
