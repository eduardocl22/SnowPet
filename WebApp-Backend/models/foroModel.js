const dao = require("../models/dao");
const objDao = new dao();

class foroModel {
  constructor() {}

  async obtenerForos() {
    const sql = "SELECT * FROM Foro ORDER BY ID_Foro";
    return objDao.select(sql);
  }

  async guardarForo(data) {
    const sql = `INSERT INTO Foro (Descripcion, Tipo, Fecha, ID_Usuario, ID_Noticias, ID_Consejo)
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING ID_Foro`;
    const params = [data.descripcion, data.tipo, data.fecha, data.id_usuario, data.id_noticias, data.id_consejo];
    return objDao.execute_one(sql, params);
  }

  async actualizarForo(data) {
    const sql = `UPDATE Foro
                 SET Descripcion = $1, Tipo = $2, Fecha = $3, ID_Usuario = $4, ID_Noticias = $5, ID_Consejo = $6
                 WHERE ID_Foro = $7`;
    const params = [data.descripcion, data.tipo, data.fecha, data.id_usuario, data.id_noticias, data.id_consejo, data.id_foro];
    return objDao.execute_none(sql, params);
  }

  async eliminarForo(idForo) {
    const sql = "DELETE FROM Foro WHERE ID_Foro = $1";
    const params = [idForo];
    return objDao.execute_none(sql, params);
  }
}

module.exports = foroModel;
