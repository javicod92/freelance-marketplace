import axios from "axios";

export const getListingsWithUsers = async (_req, res) => {
  try {
    const listingsResponse = await axios.get("http://localhost:5002/listing");
    const listings = listingsResponse.data;

    console.log("📦 Listings recibidos:", listings);

    const listingsWithUser = await Promise.all(
      listings.map(async (listing) => {
        try {
          const userResponse = await axios.get(
            `http://localhost:3001/auth/users/${listing.userId}`
          );

          return {
            ...listing,
            user: userResponse.data,
          };
        } catch (err) {
          console.error("❌ Error al obtener usuario:", err.message);
          return {
            ...listing,
            user: null,
          };
        }
      })
    );

    res.json(listingsWithUser);
  } catch (error) {
    console.error("❌ Error general:", error);
    res.status(500).json({
      error: "Error al obtener listings con usuarios",
      details: error?.message || "Sin mensaje de error",
    });
  }
};
