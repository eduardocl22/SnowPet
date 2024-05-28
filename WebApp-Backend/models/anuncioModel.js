const dao = require("./dao");
const objDao = new dao();
const fs = require("fs");
const path = require("path");

class anuncioModel {
  constructor() {}
  async obtenerAnuncios() {
    const sql = "SELECT * FROM Anuncio WHERE estado = 1 ORDER BY ID_Noticias";
    const data = await objDao.select(sql);
    console.table(data);
    for (const element of data) {
      const sql_dos = `
                SELECT AM.*, M.* FROM AnuncioMascota AS AM
                LEFT JOIN Mascota AS M ON M.ID_Mascota = AM.ID_Mascota
                WHERE AM.ID_Noticias = $1
            `;
      const data_dos = await objDao.select(sql_dos, [element.id_noticias]);
      element.mascotas = data_dos;
    }
    console.log(data);

    return data;
  }

  GuardarAnuncio(dataM, list_dataD) {
    console.log(dataM.foto);
    const base64Data = dataM.foto.base64.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");

    const publicDir = path.join(__dirname, "..", "public", "anuncios"); 
    const filename = `anuncio_${Date.now()}.${dataM.foto.estension}`;
    const filePath = path.join(publicDir, filename);

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true }); 
    }

    fs.writeFileSync(filePath, imageBuffer);

    var sqlm =
      "INSERT INTO Anuncio(Titulo,Descripcion,Telefono, Direccion, Fecha, Estado, Recompensa, Observacion, Foto, ID_Usuario) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id_noticias";
    var parm = [
      dataM.titulo,
      dataM.descripcion,
      dataM.telefono,
      dataM.direccion,
      dataM.fecha,
      1,
      dataM.recompensa,
      dataM.observacion,
      filename,
      dataM.idusuario,
    ];
    var sqld =
      "INSERT INTO AnuncioMascota( ID_Noticias,ID_Mascota) VALUES($1,$2) ";
    var list_pard = [];
    list_dataD.forEach((dataD) => {
      var elem = [0, dataD];
      list_pard.push(elem);
    });
    return objDao.master_detail(sqlm, sqld, parm, list_pard);
  }
  eliminarAnuncio(id_anuncio) {
    const sql = `UPDATE Anuncio
                     SET Estado = 0
                     WHERE ID_Noticias = $1`;
    const params = [id_anuncio];
    return objDao.execute_none(sql, params);
  }
}

module.exports = anuncioModel;
