const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '24mb' }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bryam203A',
  database: 'sys',
  insecureAuth: true
});

connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos', err);
      return;
    }
    console.log('Conexión exitosa a la base de datos');
  });

  const port = 4000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});