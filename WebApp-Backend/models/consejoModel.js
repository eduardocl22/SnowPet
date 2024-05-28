const dao = require("../models/dao");
const objDao = new dao();

class consejoModel {
  constructor() {}

  async obtenerConsejos() {
    const sql = "SELECT * FROM Consejos ORDER BY ID_Consejo";
    return objDao.select(sql);
  }

  async guardarConsejo(data) {
    const sql = `INSERT INTO Consejos (Titulo, Descripcion, Fecha, ID_Usuario)
                 VALUES ($1, $2, $3, $4) RETURNING ID_Consejo`;
    const params = [data.titulo, data.descripcion, data.fecha, data.idusuario];
    return objDao.execute_one(sql, params);
  }

  async actualizarConsejo(data) {
    const sql = `UPDATE Consejos
                 SET Titulo = $1, Descripcion = $2, Fecha = $3, ID_Usuario = $4
                 WHERE ID_Consejo = $5`;
    const params = [
      data.titulo,
      data.descripcion,
      data.fecha,
      data.idusuario,
      data.idconsejo
    ];
    return objDao.execute_none(sql, params);
  }
  
  async eliminarConsejo(idConsejo) {
    const sql = "DELETE FROM Consejos WHERE ID_Consejo = $1";
    const params = [idConsejo];
    return objDao.execute_none(sql, params);
  }
}

module.exports = consejoModel;
