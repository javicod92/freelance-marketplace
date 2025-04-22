import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import cors from "cors";
import listingsRoutes from "./routes/listings.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use port 5000 to avoid conflicts with nextjs port 3000

app.use(cors()); // Use cors to prevent conflicts if the frontend is running in a different domain
// app.use(express.json());

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
  console.log(`🟢 API Gateway corriendo en http://localhost:${PORT}`);
});
