import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Proxy hacia users-service
app.use(
  "/api/users",
  createProxyMiddleware({
    target: process.env.USERS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/users": "", // elimina el prefijo del path
    },
  })
);

app.get("/", (_req, res) => {
  res.send("🟢 Servicio de API-GATEWAY funcionando correctamente");
});

app.listen(PORT, () => {
  console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});
