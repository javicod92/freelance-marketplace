// Import jwt library to use token functions
import jwt from "jsonwebtoken";

// Export middleware function
export const authenticateToken = (req, res, next) => {
  // Obtains the authorization token in "Bearer <token>" format
  const authHeader = req.headers.authorization;

  // Convert "Bearer <token>" to ["Bearer", "token"] to use only "token" value
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos los datos del usuario en la request
    next(); // Pasamos al siguiente middleware o controlador
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};
