import { Image, View, ScrollView } from "react-native";
import Text from "../../texts/Text";
import Heading from "../../texts/Heading";
import icons from "../../../constants/icons";
import { getImageForLocation } from "../../../utils/imagesUtils";
import { useEffect, useState } from "react";
import EventOwnerIcon from "../../../assets/icons/iconsActive/EventOwner.svg";
import LocationPin from "../../../assets/icons/iconsActive/locationPin.svg";
import UserIcon from "../../../assets/icons/iconsActive/userIcon.svg";
import { getAllEvents } from "../../../services/eventsAPI";
import Redirect from "../../../assets/icons/iconsActive/Redirect";
import { Link } from "expo-router";

function EventDetails({ eventData, userInfo }) {
  const [image, setImage] = useState(null);
  const [lastCleanup, setLastCleanup] = useState(null);
  const [eventStarted, setEventStarted] = useState(false);

  const date = new Date(eventData.dateOfEvent);
  date.setUTCHours(24, 0, 0, 0);
  const month = date.toLocaleString("default", { month: "short" });
  const dayOfWeekNumber = date.getDay();
  const day = date.getDate();

  const convertEventStartTime = new Date(
    eventData.startTime
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  const convertEventEndTime = new Date(eventData.endTime).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    }
  );

  useEffect(() => {
    fetchImage();
    checkEventStarted();
  }, []);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayOfWeek = daysOfWeek[dayOfWeekNumber];

  const fetchImage = async () => {
    try {
      const image = await getImageForLocation(eventData.location._id);
      setImage(image);
    } catch (error) {
      console.error("Error fetching image for location:", error);
    }
  };

  const lastCleanupFunc = async () => {
    try {
      const events = await getAllEvents();
      const sameLocation = events.filter(
        (el) => el.location._id === eventData.location._id
      );
      const latestEventinLocation = sameLocation.reduce((latest, current) => {
        return new Date(latest.dateOfEvent) > new Date(current.dateOfEvent)
          ? latest
          : current;
      });
      const latestCleanUpDate = new Date(latestEventinLocation.dateOfEvent);
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const formattedDate = latestCleanUpDate.toLocaleDateString(
        "en-US",
        options
      );
      setLastCleanup(formattedDate);
    } catch (error) {
      console.log(error);
    }
  };

  const checkEventStarted = () => {
    const currentTime = new Date();
    const eventStartTime = new Date(eventData.startTime);
    setEventStarted(currentTime >= eventStartTime);
  };

  lastCleanupFunc();

  return (
    <ScrollView className="flex-1">
      <Image source={image} className="w-full h-[250px]" />
      <View className="mt-[-20px] bg-white rounded-t-3xl  p-4">
        <View className="flex-row justify-between items-center">
          <Heading className="pb-2">{eventData.name}</Heading>
          {userInfo === eventData.user._id && (
            <View className="w-9 h-9 flex justify-center items-center p-2 rounded-lg">
              <EventOwnerIcon />
            </View>
          )}
        </View>
        <View className="flex-row gap-4 pb-4">
          <View className="bg-[#d3d8d8] w-9 h-9 flex justify-center items-center p-2 rounded-lg">
            <Text className="font-semibold text-center text-primary text-base">
              {day}
            </Text>
            <Text className="font-semibold text-center text-primary text-xs">
              {month}
            </Text>
          </View>
          <View className="flex-col  item-center item-start">
            <Text className="font-bold">{dayOfWeek}</Text>
            <Text className="text-xs">
              {convertEventStartTime} - {convertEventEndTime}
            </Text>
          </View>
        </View>
        <View className="flex-row pb-4  gap-4">
          <View className="bg-[#d3d8d8] w-9 h-9 flex justify-center items-center p-2 rounded-lg">
            {<LocationPin />}
          </View>
          <View className="flex-col justify-center">
            <Link href="/browse">
              <Text className="font-bold text-accent">
                {eventData.location && eventData.location.name}
                <Redirect />
              </Text>
            </Link>
            <Text className="text-xs">{eventData.meetingLocation}</Text>
          </View>
        </View>
        <View className="flex-row gap-4">
          <View className="bg-[#d3d8d8] w-9 h-9 flex justify-center items-center p-2 rounded-lg">
            <UserIcon />
          </View>
          <View className="">
            {eventStarted ? (
              <>
                <Text className="font-bold">
                  {eventData.peopleCheckIn.length} People have checked in{" "}
                </Text>
                <Text className=" flex-col ">
                  {eventData.participants.length -
                    eventData.peopleCheckIn.length}{" "}
                  Awaiting
                </Text>
              </>
            ) : (
              <>
                <Text className="font-bold">
                  {eventData.participants.length} People have joined{" "}
                </Text>
              </>
            )}
          </View>
        </View>
        <View className="p-2">
          <Text className="font-semibold">
            Host: {eventData.user && eventData.user.name}
          </Text>
        </View>
        <View>
          <Heading className="text-lg">Description</Heading>
          <Text>{eventData.description}</Text>

          <Heading className="text-lg">Here's what you can expect</Heading>
          <Text> • Meet eco-warriors and clean!</Text>
          <Text>
            • Enjoy the beauty of{" "}
            {eventData.location && eventData.location.name} outdoors.
          </Text>
          <Text>• Make a real impact for wildlife and the environment!</Text>
          <Text> • Learn sustainable practices and waste disposal tips.</Text>

          <Text className="mt-3 text-xs text-primary">
            Last Cleanup Date: {lastCleanup}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default EventDetails;
