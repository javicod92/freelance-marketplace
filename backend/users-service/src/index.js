import express, { request, response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rutas
app.get("/", async (req, res) => {
  res.json("Probando desde la perla");
});

app.use("/api/auth", authRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`🟢 Users service escuchando en http://localhost:${PORT}`);
});
