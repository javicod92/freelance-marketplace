import prisma from "../prisma/client.js";

// Function to obtain all listings
export const getAllListings = async (req, res) => {
  try {
    const listings = await prisma.listing.findMany();
    res.json(listings);
  } catch (error) {
    console.error("Error al obtener listings:", error);
    res.status(500).json({ error: "Error al obtener listings" });
  }
};

// Function to create listing
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

// Function to obtain the listing by id
export const getListingById = async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!listing)
      return res.status(404).json({ error: "Listing no encontrado" });

    res.json(listing);
  } catch (error) {
    console.error("❌ Error al obtener el listing:", error);
    res.status(500).json({ error: "Error al obtener el listing" });
  }
};

// Function to udate the listing
export const updateListing = async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  try {
    const listing = await prisma.listing.update({
      where: { id },
      data: {
        title,
        description,
        price: Number(price),
      },
    });

    res.json(listing);
  } catch (error) {
    console.error("❌ Error al actualizar el listing:", error);
    res.status(500).json({ error: "Error al actualizar el listing" });
  }
};

// Function to delete the listing by id
export const deleteListing = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.listing.delete({
      where: { id },
    });

    res.json({ message: "Listing eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el listing:", error);
    res.status(500).json({ error: "Error al eliminar el listing" });
  }
};
