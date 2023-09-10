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

  app.get('/api/recientes', (req, res) => {
    const query = 'SELECT * FROM peliculas ORDER BY fecha_estreno DESC';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error al consultar películas', err);
        res.status(500).json({ error: 'Error al consultar películas' });
      } else {
        res.json(results);
      }
     });
  });

  app.get('/api/calificacion', (req, res) => {
    const query = 'SELECT * FROM peliculas ORDER BY calificacion DESC';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error al consultar películas', err);
        res.status(500).json({ error: 'Error al consultar películas' });
      } else {
        res.json(results);
      }
     });
  });

const port = 4000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});