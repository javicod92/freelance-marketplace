import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  console.log("Authorization header:", authHeader);

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // mismo secret que en users-service
    console.log(decoded);
    req.user = decoded; // contiene userId, email, role, etc.
    console.log("token decodificado", decoded);
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido" });
  }
}
