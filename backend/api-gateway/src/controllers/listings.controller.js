import axios from "axios";

export const getListingsWithUsers = async (req, res) => {
  try {
    // 1. Extraemos el token de los headers del request original
    const authHeader = req.headers.authorization;

    // 2. Llamamos al servicio de listings con el token
    const listingsResponse = await axios.get("http://localhost:5002/listing", {
      headers: {
        Authorization: authHeader, // Paso el token para validar
      },
    });

    const listings = listingsResponse.data;
    console.log("📦 Listings recibidos:", listings);

    // 3. Recorremos y pedimos info del usuario para cada listing
    const listingsWithUser = await Promise.all(
      listings.map(async (listing) => {
        try {
          const userResponse = await axios.get(
            `http://localhost:5001/auth/user/${listing.userId}`,
            {
              headers: {
                Authorization: authHeader, // Paso el token para validad
              },
            }
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
