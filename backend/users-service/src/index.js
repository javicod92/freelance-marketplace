import express, { request, response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

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
