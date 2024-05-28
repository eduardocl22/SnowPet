// npm install cors
const express = require('express');
const app = express();
const port = 3000;
const usuarioRoute = require('./routes/usuarioRoute');
const mascotaRoute = require('./routes/mascotaRoute');
const consejoRoute = require('./routes/consejoRoute');
const anuncioRoute = require('./routes/anuncioRoute');
const foroRoute = require('./routes/foroRoute');

const cors = require('cors');
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '30mb' })); 

app.use(express.static('public')); 

app.use('/usuario',usuarioRoute);
app.use('/mascota',mascotaRoute);
app.use('/consejo',consejoRoute);
app.use('/anuncio',anuncioRoute);
app.use('/foro',foroRoute);


app.listen(port, () => {
    console.log(`Escuchando en: http://localhost:${port}`);  
});