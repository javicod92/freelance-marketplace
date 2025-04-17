import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import cors from "cors";
import listingsRoutes from "./routes/listings.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// app.use(express.json()); // por si necesitás body

// Rutas especiales
app.use("/api", listingsRoutes);

// Proxies
app.use(
  "/api/users",
  createProxyMiddleware({
    target: process.env.USERS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/users": "",
    },
  })
);

app.use(
  "/api/listings",
  createProxyMiddleware({
    target: process.env.LISTINGS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/listings": "",
    },
  })
);

app.get("/", (_req, res) => {
  res.send("🟢 Servicio de API-GATEWAY funcionando correctamente");
});

app.listen(PORT, () => {
  console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});
