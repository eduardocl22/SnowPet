---Nombre BD Test_prueba

CREATE TABLE Usuario (
  ID_Usuario SERIAL PRIMARY KEY,
  Nombre VARCHAR(200) NOT NULL,
  Correo VARCHAR(400) NOT NULL,
  Contraseña VARCHAR(100) NOT NULL,
  Direccion VARCHAR(200) NULL
);


CREATE TABLE Mascota (
  ID_Mascota SERIAL PRIMARY KEY,
  Raza VARCHAR(200) NOT NULL,	
  Foto VARCHAR(400) NULL,
  Descripcion VARCHAR(400) NOT NULL,
  Nombre VARCHAR(200) NOT NULL,
  FechaNac DATE NOT NULL,
  Observacion VARCHAR(400) NOT NULL,
  ID_Usuario INTEGER NOT NULL REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Consejos(
  ID_Consejo SERIAL PRIMARY KEY,
  Titulo VARCHAR(200) NOT NULL,	
  Descripcion VARCHAR(400) NOT NULL,
  Fecha DATE NOT NULL,
  ID_Usuario INTEGER NOT NULL REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Anuncio(
  ID_Noticias SERIAL PRIMARY KEY,
  Titulo VARCHAR(200) NOT NULL,	
  Descripcion VARCHAR(400) NOT NULL,
  Telefono VARCHAR(30) NOT NULL,
  Direccion VARCHAR(200) NULL,
  Fecha DATE NOT NULL,
  Estado INT NOT NULL,
  Recompensa VARCHAR(400) NOT NULL,
  Observacion VARCHAR(400) NULL,
  ID_Usuario INTEGER NOT NULL REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE AnuncioMascota(
  ID_AnuncioMascota SERIAL PRIMARY KEY,
  ID_Mascota INTEGER NOT NULL REFERENCES Mascota(ID_Mascota),
  ID_Noticias INTEGER NOT NULL REFERENCES Anuncio(ID_Noticias)
);

CREATE TABLE Foro(
  ID_Foro SERIAL PRIMARY KEY,
  Descripcion VARCHAR(400) NOT NULL,
  Tipo VARCHAR(200) NULL,
  Fecha DATE NOT NULL,
  ID_Usuario INTEGER NOT NULL REFERENCES Usuario(ID_Usuario),
  ID_Noticias INTEGER NOT NULL REFERENCES Anuncio(ID_Noticias),
  ID_Consejo INTEGER NOT NULL REFERENCES Consejos(ID_Consejo)
);


ALTER TABLE Anuncio
ADD COLUMN Foto VARCHAR(1200) DEFAULT NULL;


