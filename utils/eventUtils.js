import { isFutureDate } from "./timeUtils";

export const getUpcomingEvents = (userEvents) => {
  return userEvents
    .filter((event) => isFutureDate(event.endTime)) // Filter out past events
    .sort((a, b) => new Date(a.dateOfEvent) - new Date(b.dateOfEvent));
};

export const getSuggestedEvents = (
  allEvents,
  userEvents,
  isAllowDataCollection
) => {
  const evaluatedEvents = allEvents
    .filter(
      (event) => !userEvents.find((userEvent) => userEvent._id === event._id) // Filter out events that the user is already attending
    )
    .filter((event) => isFutureDate(event.endTime)) // Filter out past events
    .map((event) => ({
      ...event,
      points: evaluateEvent(event, userEvents, isAllowDataCollection),
    }));

  return evaluatedEvents.sort(
    (a, b) =>
      b.points - a.points || new Date(a.dateOfEvent) - new Date(b.dateOfEvent)
  );
};

const evaluateEvent = (event, userEvents, isAllowDataCollection) => {
  let points = 0;

  // Timeframe
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
  if (event.dateOfEvent <= twoWeeksFromNow) {
    points += 1;
  }

  // Past Location
  if (
    isAllowDataCollection &&
    userEvents.some((e) => e.location.id === event.location.id)
  ) {
    points += 1;
  }

  // Past Host
  if (
    isAllowDataCollection &&
    userEvents.some((e) => e.hostId === event.hostId)
  ) {
    points += 1;
  }

  return points;
};
