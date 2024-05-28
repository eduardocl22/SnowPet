const dao = require("./dao");
const objDao = new dao();

class usuarioModel {
  constructor() {}

  obtenerUsuarios() {
    const sql = "SELECT * FROM Usuario ORDER BY 1";
    return objDao.select(sql);
  }

  iniciarSesion(correo, contraseña) {
    const sql = "SELECT * FROM Usuario WHERE Correo = $1 AND Contraseña = $2";
    const params = [correo, contraseña];
    return objDao.select(sql, params);
  }

  GuardarUsuario(data) {
    const sql = `INSERT INTO Usuario (Nombre, Correo, Contraseña, Direccion)
                 VALUES ($1, $2, $3, $4) RETURNING ID_Usuario`;
    const params = [data.nombre, data.correo, data.contraseña, data.direccion];
    return objDao.execute_one(sql, params);
  }

  ModificarUsuario(data) {
    const sql = `UPDATE Usuario
                 SET Nombre = $1, Correo = $2, Contraseña = $3, Direccion = $4
                 WHERE ID_Usuario = $5`;
    const params = [
      data.nombre,
      data.correo,
      data.contraseña,
      data.direccion,
      data.idusuario,
    ];
    return objDao.execute_none(sql, params);
  }

  EliminarUsuario(idUsuario) {
    const sql = "DELETE FROM Usuario WHERE ID_Usuario = $1";
    const params = [idUsuario];
    return objDao.execute_none(sql, params);
  }
}

module.exports = usuarioModel;
