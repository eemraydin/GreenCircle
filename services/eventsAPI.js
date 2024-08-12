import { addData, fetchData, sendData, updateData } from "./api";
import { getToken } from "./auth";

const eventsEndpoint = "/events";

const getAllEvents = async () => {
  try {
    return await fetchData(`${eventsEndpoint}`);
  } catch (error) {
    console.error("Error fetching all events:", error);
    throw error;
  }
};

const getUserEvents = async () => {
  try {
    return await fetchData(`${eventsEndpoint}/user`);
  } catch (error) {
    console.error("Error fetching user events:", error);
    throw error;
  }
};

const getEventById = async (eventId) => {
  try {
    return await fetchData(`${eventsEndpoint}/${eventId}`);
  } catch (error) {
    console.error(`Error fetching event with ID ${eventId}:`, error);
    throw error;
  }
}


const joinEvent = async (eventId) => {
  try {
    const endpoint = `${eventsEndpoint}/${eventId}`;

    return await addData(endpoint, {}); 
  } catch (error) {
    console.error(`Error joining event ${eventId}:`, error);
    throw error;
  }
};


const checkInUser = async (eventId) => {
  try {
    const endpoint = `${eventsEndpoint}/${eventId}/checkin`;
    return await addData(endpoint, {});
  } catch (error) {
    console.error(`Error checking in to event ${eventId}:`, error);
    throw error;
  }
};


const updateEventCollections = async (eventId, collectionId) => {
  try {
    const endpoint = `${eventsEndpoint}/${eventId}/collections/${collectionId}`; 
    return await addData(endpoint); 
  } catch (error) {
    console.error(`Error updating collections for event ${eventId}:`, error);
    throw error;
  }
};





// const getEventById = async (eventId) => {
//   try {
//     // Assuming `eventsEndpoint` is the base URL for events
//     const endpoint = `${eventsEndpoint}/${eventId}`;
//     return await fetchData(endpoint);
//   } catch (error) {
//     console.error(`Error fetching event with ID ${eventId}:`, error);
//     throw error;
//   }
// };


const createEvent = async (eventData) => {
  try {
    return await sendData(eventsEndpoint, eventData);
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// const updateEvent = async (eventId, eventData) => {
//   try {
//     return await updateData("/events", eventId, eventData);
//   } catch (error) {
//     console.error(`Error updating event ${eventId}:`, error);
//     throw error;
//   }
// };

// const deleteEvent = async (eventId) => {
//   try {
//     return await deleteData("events", eventId);
//   } catch (error) {
//     console.error(`Error deleting event ${eventId}:`, error);
//     throw error;
//   }
// };

export {
  getAllEvents,
  getUserEvents,
  createEvent,
  joinEvent,
  checkInUser,
  getEventById,
  updateEventCollections,
};
