const usuarioModel = require("../models/usuarioModel");

const usuarioService = new usuarioModel();

module.exports = {
  obtenerUsuarios: async (req, res) => {
    try {
      const data = await usuarioService.obtenerUsuarios();
      res.type("json");
      res.send({ Success: true, Data: data });
    } catch (error) {
      res.type("json");
      res.send({ Success: false, Mensaje: error.message });
    }
  },
  iniciarSesion: async (req, res) => {
    console.log(req.body);
    try {
      const usuario = await usuarioService.iniciarSesion(req.body.correo, req.body.contrasena);

      if (usuario && usuario.length > 0) {
        res.status(200).json({ Success: true, Data: usuario[0] });
        console.log("ok");
        console.log(usuario);
      }
      else{
        console.log('cred. incorrec');
        console.log(usuario);
        res.status(401).json({ Success: false, Mensaje: "Credenciales incorrectas" });
      }
    } catch (error) {
      res.status(500).json({ Success: false, Mensaje: error.message });
    }
  },
  GuardarUsuario: async (req, res) => {
    const data = {
      idusuario: req.body.idusuario || 0,
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      correo: req.body.correo,
      contraseña: req.body.contraseña,
    };
    console.log(data);

    try {
      if (data.idusuario === 0) {
        const newId = await usuarioService.GuardarUsuario(data);
        res.type("json");
        res.send({ Success: true, Data: newId });
      } else {
        await usuarioService.ModificarUsuario(data);
        res.type("json");
        res.send({ Success: true });
      }
    } catch (error) {
      res.type("json");
      res.send({ Success: false, Mensaje: error.message });
    }
  },
  EliminarUsuario: async (req, res) => {
    const data = { idusuario: parseInt(req.body.idusuario) };

    try {
      await usuarioService.EliminarUsuario(data.idusuario);
      res.type("json");
      res.send({ Success: true });
    } catch (error) {
      res.type("json");
      res.send({ Success: false, Mensaje: error.message });
    }
  },
};
