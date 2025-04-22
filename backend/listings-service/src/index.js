import express from "express";
import dotenv from "dotenv";
import listingsRoutes from "./routes/listings.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/listing", listingsRoutes);

app.get("/", async (_req, res) => {
  res.send("🟢 Servicio de LISTINGS-SERVICE funcionando correctamente");
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(
    `🟢 Servicio de LISTINGS-SERVICE escuchando en http://localhost:${PORT}`
  );
});
