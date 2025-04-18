import express, { request, response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

// Rutas
app.get("/", async (_req, res) => {
  res.send("🟢 Servicio de USER-SERVICE funcionando correctamente");
});

app.use("/auth", authRoutes);

// Servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🟢 Users service escuchando en http://localhost:${PORT}`);
});
