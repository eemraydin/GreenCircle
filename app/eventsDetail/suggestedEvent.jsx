import { Image, View, ScrollView } from "react-native";
import LocationPin from "../../assets/icons/iconsActive/Pin_Location.svg";
import Profile from "../../assets/icons/iconsActive/Profile.svg";
import Facebook from "../../assets/icons/iconsActive/facebook.svg";
import Instagram from "../../assets/icons/iconsActive/instagram.svg";
import Twitter from "../../assets/icons/iconsActive/twitter.svg";
import { getImageForLocation } from "../../utils/imagesUtils";
import { useEffect, useState } from "react";
import Text from "../../components/texts/Text";

function SuggestedEvent({ eventData }) {
  const [image, setImage] = useState(null);

  const date = new Date(eventData.dateOfEvent);
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

  // SHARE TO INSTAGRAM STORY
  //  function getErrorString(error, defaultValue) {
  //    let e = defaultValue || "Something went wrong. Please try again";
  //    if (typeof error === "string") {
  //      e = error;
  //    } else if (error && error.message) {
  //      e = error.message;
  //    } else if (error && error.props) {
  //      e = error.props;
  //    }
  //    return e;
  //  }

  // const shareToInstagramStory = async () => {
  //   const shareOptions = {
  //     title: "Share image to instastory",
  //     backgroundImage: image,
  //     social: Share.Social.INSTAGRAM_STORIES,
  //     appId: "app/instagram",
  //   };

  //   try {
  //     const ShareResponse = await Share.shareSingle(shareOptions);
  //     console.log("Response =>", ShareResponse);
  //     setResult(JSON.stringify(ShareResponse, null, 2));
  //   } catch (error) {
  //     console.log("Error =>", error);
  //     setResult("error: ".concat(getErrorString(error)));
  //   }
  // };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <Image source={image} className="w-full h-[250px]" />
        <View className="mt-[-20px] bg-white rounded-t-3xl  p-4">
          <Text className="font-extrabold text-primaryDark text-2xl pb-2 font-redhat">
            {eventData.name}
          </Text>
          <View className="flex-row gap-4 pb-4">
            <View className="bg-[#d3d8d8] w-[48px] h-[48px] flex justify-center items-center p-2 rounded-lg">
              <Text className="font-semibold text-center text-primary text-base font-redhat">
                {day}
              </Text>
              <Text className="font-semibold text-center text-primary text-sm font-redhat">
                {month}
              </Text>
            </View>
            <View className="flex-col justify-center item-center item-start">
              <Text className="font-bold font-redhat">{dayOfWeek}</Text>
              <Text className="text-xs font-redhat">
                {convertEventStartTime} - {convertEventEndTime}
              </Text>
            </View>
          </View>
          <View className="flex-row gap-4 p-2">
            <View className="bg-[#d3d8d8] w-9 h-9 flex justify-center items-center p-2 rounded-lg">
              <LocationPin />
            </View>
            <View className="flex-col  item-center item-start">
              <Text className="font-bold font-redhat">
                {eventData.location && eventData.location.name}
              </Text>
              <Text className="text-xs font-redhat">
                {eventData.meetingLocation}
              </Text>
            </View>
          </View>
          <View className="flex-row gap-4 p-2">
            <View className="bg-[#d3d8d8] w-9 h-9 flex justify-center items-center p-2 rounded-lg">
              <Profile />
            </View>
            <View className="flex-col justify-center item-center item-start">
              <Text className="font-bold font-redhat">
                {eventData.participants.length} Participants Are Joining
              </Text>
            </View>
          </View>
          <View>
            <Text className="text-primaryDark font-extrabold text-xl font-redhat">
              Description
            </Text>
            <Text className="font-redhat">{eventData.description}</Text>

            <Text className="text-primaryDark font-extrabold text-xl font-redhat">
              Here's what you can expect
            </Text>
            <Text className="font-redhat">
              • Find a community who share the same passion as you!
            </Text>
            <Text className="font-redhat">
              • Enjoy the beauty of{" "}
              {eventData.location && eventData.location.name} outdoors.
            </Text>
            <Text className="font-redhat">
              • Make a real impact for wildlife and the environment!
            </Text>
            <Text className="font-redhat">
              • Learn sustainable practices and waste disposal tips.
            </Text>
            <Text className="font-redhat">
              • Add it onto your list of accomplished clean ups!
            </Text>

            <Text className="mt-3 text-xs text-gray-500 font-redhat">
              Last Cleanup Date: 1st August 2024
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default SuggestedEvent;
