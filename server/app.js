require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Configurar la conexión a la base de datos usando las variables de entorno
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Ruta para el inicio de sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Verificar si el usuario existe en la base de datos
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkUserQuery, [email], (error, results) => {
      if (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
      } else {
        if (results.length === 0) {
          // El usuario no está registrado
          res.status(401).json({ message: 'Usuario no registrado' });
        } else {
          // El usuario está registrado, comparar las contraseñas
          const user = results[0];
          if (user.password !== password) {
            // Las contraseñas no coinciden
            res.status(401).json({ message: 'Contraseña incorrecta' });
          } else {
            // Inicio de sesión exitoso, responder con un mensaje o token de autenticación
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
          }
        }
      }
    });
  });

// Ruta para el registro
app.post('/register', (req, res) => {
    const { email, password } = req.body;
  
    // Verificar si el usuario ya está registrado en la base de datos
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkUserQuery, [email], (error, results) => {
      if (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
      } else {
        if (results.length > 0) {
          // El usuario ya está registrado
          res.status(409).json({ message: 'El usuario ya está registrado' });
        } else {
          // El usuario no está registrado, realizar el registro en la base de datos
          const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
          connection.query(insertUserQuery, [email, password], (error, insertResult) => {
            if (error) {
              console.error('Error al registrar el usuario:', error);
              res.status(500).json({ message: 'Error en el servidor' });
            } else {
              // Registro exitoso, enviar una respuesta al cliente
              res.status(201).json({ message: 'Registro exitoso' });
            }
          });
        }
      }
    });
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

