import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🟢 Users service escuchando en http://localhost:${PORT}`);
});
