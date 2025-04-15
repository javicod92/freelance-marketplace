import express from "express";
import dotenv from "dotenv";
import listingsRoutes from "./routes/listings.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/listings", listingsRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`🟢 Listings service escuchando en http://localhost:${PORT}`);
});
