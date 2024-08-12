// utils/timeUtils.js
const diffPDTtoUTC = 7 * 60 * 60 * 1000;

export const getTimeRemaining = (startTime) => {
  if (!startTime || isNaN(new Date(startTime).getTime())) {
    return "Invalid start time";
  }

  const eventTime = new Date(startTime);
  const currentTime = new Date();
  const formattedTime = new Date(
    currentTime.getTime() - currentTime.getTimezoneOffset() * 60000
  );

  const difference = eventTime - formattedTime;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);

  if (days > 0) {
    return `${days} Days ${hours} Hours`;
  }
  if (hours === 0) {
    return `${minutes} Minutes`;
  }
  return `${hours} Hours ${minutes} Minutes`;
};

export const isFutureDate = (date) => {
  return Number(new Date(date).getTime()) + diffPDTtoUTC >= Number(Date.now());
};

export const isWithinTargetTimeDuration = (
  currentDateTimestamp,
  targetDateTimestamp,
  durationDay
) => {
  const convertMilisecondToDay = 1000 * 60 * 60 * 24;
  diffDate =
    (targetDateTimestamp + diffPDTtoUTC - currentDateTimestamp) /
    convertMilisecondToDay;
  return 0 <= diffDate && diffDate <= durationDay;
};

export const getDateInfo = (dateStr) => {
  const date = new Date(dateStr);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let result = {};
  result.year = date.getFullYear().toString();
  result.month = date.toLocaleString("default", { month: "short" });
  result.day = date.getDate().toString();
  result.dayOfWeek = daysOfWeek[date.getDay()];
  return result;
};

export const convertTimeToMeridiem = (timeStr) => {
  const date = new Date(timeStr);
  let hours = date.getUTCHours(); // because time is registered as PDT time zone in database
  let minutes = date.getUTCMinutes();

  const meridiem = hours >= 12 ? "pm" : "am";
  hours = hours % 12 === 0 ? 12 : hours % 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes}${meridiem}`;
};
