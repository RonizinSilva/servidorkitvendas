// middleware/auth.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'ronizin'; // Substitua pela sua chave secreta JWT

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Falha na autenticação do token' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
