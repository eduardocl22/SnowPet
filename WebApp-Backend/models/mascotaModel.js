const dao = require("./dao");
const objDao = new dao();

class mascotaModel {
  constructor() {}

  obtenerMascotas() {
    const sql = "SELECT * FROM Mascota ORDER BY ID_Mascota";
    return objDao.select(sql);
  }

  guardarMascota(data) {
    const sql = `INSERT INTO Mascota (Raza, Foto, Descripcion, Nombre, FechaNac, Observacion, ID_Usuario)
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ID_Mascota`;
    const params = [data.raza, data.foto, data.descripcion, data.nombre, data.fechanac, data.observacion, data.idusuario];
    return objDao.execute_one(sql, params);
  }

  modificarMascota(data) {
    const sql = `UPDATE Mascota
                 SET Raza = $1, Foto = $2, Descripcion = $3, Nombre = $4, FechaNac = $5, Observacion = $6, ID_Usuario = $7
                 WHERE ID_Mascota = $8`;
    const params = [
      data.raza,
      data.foto,
      data.descripcion,
      data.nombre,
      data.fechanac,
      data.observacion,
      data.idusuario,
      data.idmascota,
    ];
    return objDao.execute_none(sql, params);
  }

  eliminarMascota(idMascota) {
    const sql = "DELETE FROM Mascota WHERE ID_Mascota = $1";
    const params = [idMascota];
    return objDao.execute_none(sql, params);
  }
}

module.exports = mascotaModel;
