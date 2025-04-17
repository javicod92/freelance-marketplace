import prisma from "../prisma/client.js";

export const getAllListings = async (req, res) => {
  try {
    const listings = await prisma.listing.findMany();
    res.json(listings);
  } catch (error) {
    console.error("Error al obtener listings:", error);
    res.status(500).json({ error: "Error al obtener listings" });
  }
};

export async function createListing(req, res) {
  const { title, description, price } = req.body;
  const userId = req.user.id; // viene del token

  try {
    const newListing = await prisma.listing.create({
      data: {
        title,
        description,
        price,
        userId,
      },
    });
    res.status(201).json(newListing);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al crear listing", details: error.message });
  }
}
