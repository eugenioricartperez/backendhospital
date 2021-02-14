console.log('Hola Mundo');

const express=require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

dbConnection();

console.log( process.env );

//Rutas

app.get ('/', (req , res) => {
  res.status(200).json({ok: true,
            msg: 'Hola mudo' });
})


app.listen( 3000 , () => {
    console.log('Servidor corriendo en puerto ',process.env.PORT);
});