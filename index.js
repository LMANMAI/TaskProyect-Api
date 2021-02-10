const express = require('express');
const conectarDB = require('./config/database');
const app = express();
app.use(express.json({ extended: true }));
//conceto con la db
conectarDB();
const PORT = process.env.PORT || 4000;
app.use('/api/users', require('./routes/usurios'));

//inicio del servidor
app.listen(PORT, ()=>{
    console.log('desde el servidor, en el puerto:', PORT);
})