import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

// PRELIMINARY CONFIGURATIONS:

dotenv.config(); // Used for load .env files using "process.env.VAR"
const app = express();
app.use(express.json()); // Used to parse the request body to JSON

// ROUTES:

// Route used for test the server
app.get("/", async (_req, res) => {
  res.send("🟢 Servicio de USER-SERVICE funcionando correctamente");
});

// Route used for user authentications
app.use("/auth", authRoutes);

// SERVER:

// Script used to run the server in selected port, in this case 5001
const PORT = process.env.PORT || 5001; // Port 5000 is commoly used in BACKEND
app.listen(PORT, () => {
  console.log(`🟢 Users service escuchando en http://localhost:${PORT}`);
});
