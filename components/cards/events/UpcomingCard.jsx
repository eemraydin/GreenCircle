import { Image, Pressable, View } from "react-native";
import icons from "../../../constants/icons";
import dummyImage from "../../../assets/images/dummy.png";
import { Link } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../../authProvider/AuthProvider";
import { useState, useEffect } from "react";
import Text from "../../texts/Text";
import SubHeading from "../../texts/SubHeading";
import { getImageForLocation } from "../../../utils/imagesUtils";
import { getTimeRemaining } from "../../../utils/timeUtils";

function UpcomingCard({ data }) {
  const [image, setImage] = useState();
  const { userName } = useAuth();
  const [remainingTime, setRemainingTime] = useState("");
  const [timeColor, setTimeColor] = useState("green");

  let { name, location, user, dateOfEvent, startTime, endTime, participants } =
    data;

  // date formatting
  const newDate = new Date(dateOfEvent);
  newDate.setUTCHours(24, 0, 0, 0);
  const formattedDate = newDate.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  startTime = new Date(startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  endTime = new Date(endTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  // Calculate remaining time using getTimeRemaining
  // Calculate remaining time using getTimeRemaining
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
      ).getTime();
      const end = new Date(data.endTime).getTime();

      if (formattedTime < end) {
        const diff = end - formattedTime;

        if (diff <= 60 * 60 * 1000) {
          // Format remaining time as "Ends in XX:YY mins"
          const remainingMinutes = Math.floor((diff / (1000 * 60)) % 60);
          const minutesString = remainingMinutes.toString().padStart(2, "0");

          // Set remaining time state
          setRemainingTime(`Ends in 00:${minutesString} mins`);
        } else {
          // Hide remaining time if longer than 60 minutes
          setRemainingTime("");
        }

        // Set time color based on remaining time
        if (diff <= 60 * 1000) {
          setTimeColor("red"); // Less than or equal to 1 minute
        } else {
          setTimeColor("green"); // More than 1 minute
        }
      } else {
        setTimeColor("red");
        setRemainingTime("Event ended");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch image for location
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await getImageForLocation(location._id);
        setImage(image);
      } catch (error) {
        console.error("Error fetching image for location:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <View className="w-80 max-w-[330px] max-h-[240px] mr-4 border-solid rounded-2xl relative ">
      <View className="h-full w-full">
        <Image source={image} className="w-full h-1/2 rounded-t-2xl" />
        {remainingTime && (
          <View className="relative bottom-10 left-1 w-[120px] rounded-lg ">
            <Text
              className={`text-white p-1 text-xs rounded-lg ${
                timeColor === "red" ? "bg-red-500" : "bg-green-500"
              } `}
            >
              {remainingTime}
            </Text>
          </View>
        )}
      </View>
      {user.name === userName && (
        <View className="absolute top-2 right-2">
          <Image source={icons.hosted} className="h-7 w-7 " />
        </View>
      )}

      <View className="px-[8px] py-[13px] rounded-b-2xl bg-white absolute bottom-0 h-1/2 w-full">
        <View className="bg-gray-300 rounded-full w-[24%]">
          <Text className="text-center text-xs py-[2] px-[2]">
            {location.category ? location.category : "TYPE"}
          </Text>
        </View>
        <SubHeading className="py-1.5">{name}</SubHeading>
        <View className="flex-row gap-1 py-1 justify-start">
          <View className="flex-row">
            <Image source={icons.date} className="w-4 h-4 mr-1" />
            <Text className="text-xs">{formattedDate}</Text>
          </View>
          <View className="flex-row pl-2">
            <Image source={icons.clock} className="w-4 h-4 mr-1" />
            <Text className="text-xs">
              {startTime} - {endTime}
            </Text>
          </View>
        </View>
        <View className="mt-1  flex-row  items-center">
          <Image source={icons.attendee} className="w-[9px] h-[10px] mr-1 " />
          <Text className="text-xs">+{participants.length} attendees</Text>
          <Link
            href={`upComingEvents/upComingEventsDetail?singleEvent=${encodeURIComponent(
              JSON.stringify(data)
            )}&location=${data.locationId}`}
            asChild
          >
            <Pressable className="w-[100px] h-[40px] bg-primary rounded-full justify-center absolute bottom-4 right-0.5">
              <SubHeading className="text-white text-center">View</SubHeading>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

export default UpcomingCard;
