import { fetchData, sendData, updateData } from "./api";

const collectionsEndpoint = "/collections";

const getUserCollections = async () => {
  try {
    return await fetchData(collectionsEndpoint);
  } catch (error) {
    console.error("Error fetching user collections:", error);
    throw error;
  }
};

const getCollectionById = async (collectionId) => {
  try {
    const endpoint = `${collectionsEndpoint}/${collectionId}`;
    return await fetchData(endpoint, {});
  } catch (error) {
    console.error(`Error fetching collection ${collectionId}:`, error);
    throw error;
  }
};

const getAllCollections = async () => {
  try {
    const endpoint = `${collectionsEndpoint}`;
    return await fetchData(endpoint, {});
  }
  catch (error) {
    console.error("Error fetching all collections:", error);
    throw error;
  }
}

const createCollection = async (eventId) => {
  try {
    const endpoint = `${collectionsEndpoint}/${eventId}`;
    return await sendData(endpoint, {});
  } catch (error) {
    console.error("Error creating collection:", error);
    throw error;
  }
};

// const incrementMaterialCount = async (collectionId, materialType) => {
//   try {
//      const id = `/${collectionId}/${materialType}`;
//      return await updateData(collectionsEndpoint,id, {});

//   } catch (error) {
//     console.error(
//       `Error incrementing material count for collection ${collectionId}:`,
//       error
//     );
//     throw error;
//   }
// };

const updateMaterialCount = async (collectionId, materialType, action) => {
  try {
    const endpoint = `${collectionsEndpoint}/${collectionId}/${materialType}`;
    return await updateData(endpoint, null, { action });
  } catch (error) {
    console.error(
      `Error updating material count for collection ${collectionId}:`,
      error
    );
    throw error;
  }
};

const clearCollectionCounts = async (collectionId) => {
  try {
    return await updateData(collectionsEndpoint, collectionId, {});
  } catch (error) {
    console.error(
      `Error clearing collection counts for collection ${collectionId}:`,
      error
    );
    throw error;
  }
};


const getCollectionStatus = async (collectionId) => {
  try {
    const endpoint = `${collectionsEndpoint}/${collectionId}/status`;
    return await fetchData(endpoint);
  } catch (error) {
    console.error(`Error fetching collection status ${collectionId}:`, error);
    throw error;
  }
};

const updateCollectionStatus = async (collectionId, status) => {
  try {
    const endpoint = `${collectionsEndpoint}/${collectionId}/status`;
    return await updateData(endpoint, null, status);
  } catch (error) {
    console.error(
      `Error updating collection status for collection ${collectionId}:`,
      error
    );
    throw error;
  }
}



export {
  getUserCollections,
  getCollectionById,
  createCollection,
  // incrementMaterialCount,
  updateMaterialCount,
  clearCollectionCounts,
  getAllCollections,
  getCollectionStatus,
  updateCollectionStatus,
};
