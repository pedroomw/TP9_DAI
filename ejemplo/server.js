const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Clave secreta para firmar el JWT
const secretKey = 'your_secret_key';

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Ruta para el login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validación de usuario (esto es solo un ejemplo, normalmente validarías contra una base de datos)
  if (username === 'user' && password === 'password') {
    // Datos del payload del token
    const payload = {
      username: username,
      role: 'user'
    };

    // Generación del token
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    // Envío del token al cliente
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// Middleware para proteger rutas

// verificacion si se envia el token en la cabecera
 const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
};

// verificacion si se envia el token por Authorization > Bearer

// const verifyToken = (req, res, next) => {
//     const bearerHeader = req.headers['authorization'];
  
//     if (typeof bearerHeader !== 'undefined') {
//       const bearer = bearerHeader.split(' ');
//       const token = bearer[1];
  
//       jwt.verify(token, secretKey, (err, decoded) => {
//         if (err) {
//           return res.status(401).json({ message: 'Token inválido' });
//         }
  
//         req.user = decoded;
//         next();
//       });
//     } else {
//       res.status(403).json({ message: 'Token requerido' });
//     }
//   };

// Ruta protegida
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Ruta protegida accedida', user: req.user });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});







// En postman

// 1. Enviar una solicitud POST a http://localhost:3000/login con el siguiente cuerpo:
    
//     {
//     "username": "user",
//     "password": "password"
//     }

// 2. Copiar el token que se recibe en la respuesta.

// 3. Enviar una solicitud GET a http://localhost:3000/protected con un encabezado Authorization con el valor del token copiado en el paso anterior.
//(ejemplo comentado)
// Si se hace la soliciutud Get por Authorization > Bearer
// S completya el token recibido  y hacer el get (ejemplo activo)