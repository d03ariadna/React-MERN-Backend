const path = require('path');

const express = require('express');
const dbConnection = require('./db/config');
require('dotenv').config();
const cors = require('cors');

//Create express Server
const app = express();

//DataBase
dbConnection();

//CORS
app.use(cors({
    origin: 'http://localhost:5173', // or the actual URL of your frontend
    credentials: true,
}));

//Directorio Publico
app.use(express.static('public'));

//Lectura y parseo dle body
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


//Listen requests
app.listen(process.env.PORT, () => {
    console.log('Server is running on port 4000');
});