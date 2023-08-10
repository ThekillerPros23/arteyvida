require('dotenv').config();
const mysql = require('mysql2');

// Configurar la conexión a la base de datos usando las variables de entorno
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Controlador para obtener todos los datos
const getAllData = (req, res) => {
  const query = 'SELECT * FROM nombre_de_la_tabla';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los datos:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    } else {
      res.json(results);
    }
  });
};

// ... Otros controladores para crear, actualizar y eliminar datos

module.exports = {
  getAllData,
  // ... Otros controladores exportados
};
