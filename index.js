const express = require('express');
const dbConnection = require('./db/config');
require('dotenv').config();
const cors = require('cors');

//Create express Server
const app = express();

//DataBase
dbConnection();

//CORS
app.use(cors());

//Directorio Publico
app.use(express.static('public'));

//Lectura y parseo dle body
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//Listen requests
app.listen(process.env.PORT, () => {
    console.log('Server is running on port 4000');
});