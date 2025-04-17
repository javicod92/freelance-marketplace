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

// Proxy hacia listings-service
app.use(
  "/api/listings",
  createProxyMiddleware({
    target: process.env.LISTINGS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/listings": "", // elimina el prefijo del path
    },
  })
);

app.get("/api/listings-with-users", async (_req, res) => {
  try {
    // Obtener todos los listings desde listings-service
    const listingsRes = await fetch(
      `${process.env.LISTINGS_SERVICE_URL}/listings`
    );
    const listings = await listingsRes.json();

    // Obtener usuario para cada listing
    const listingsWithUser = await Promise.all(
      listings.map(async (listing) => {
        try {
          const userRes = await fetch(
            `${process.env.USERS_SERVICE_URL}/auth/users/${listing.userId}`
          );
          const user = await userRes.json();
          return { ...listing, user };
        } catch (err) {
          console.error("Error obteniendo usuario:", err.message);
          return { ...listing, user: null };
        }
      })
    );

    res.json(listingsWithUser);
  } catch (err) {
    console.error("Error obteniendo listings con users:", err.message);
    res.status(500).json({ error: "Error al obtener listings con usuario" });
  }
});

app.get("/", (_req, res) => {
  res.send("🟢 Servicio de API-GATEWAY funcionando correctamente");
});

app.listen(PORT, () => {
  console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});
