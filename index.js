require('dotenv').config();


const express=require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

//configurar cors (middleware)

app.use(cors());

//lectura y parseo del body   (middleware)

app.use(express.json());

dbConnection();

console.log( process.env );

app.use ('/api/usuarios', require('./routes/usuarios'));

app.use ('/api/login', require('./routes/auth'));


//Rutas

app.get ('/', (req , res) => {
  res.status(200).json({ok: true,
            msg: 'Hola mudo' });
});




app.listen(3000, () => {
    console.log('Servidor corriendo en puerto ',process.env.PORT);
});