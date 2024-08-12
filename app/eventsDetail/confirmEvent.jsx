import { useEffect, useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, ScrollView, View, Share } from "react-native";
import CheckInButton from "../../components/buttons/CheckInButton";
import { createEvent, getAllEvents } from "../../services/eventsAPI";
import JoinModal from "../../components/modals/joinModal";
import { useAuth } from "../../authProvider/AuthProvider";
import { getImageForLocation } from "../../utils/imagesUtils";
import Text from "../../components/texts/Text";

function ConfirmEvent() {
  const { userId, userName } = useAuth();
  const { eventObj } = useLocalSearchParams();
  const [eventData, setEventData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  const router = useRouter();

  useEffect(() => {
    if (eventObj) {
      const eventDataParsed = JSON.parse(decodeURIComponent(eventObj));
      setEventData(eventDataParsed);
    }
  }, [eventObj]);

  if (!eventData) {
    return <Text>Loading...</Text>;
  }



  const EventDataForBackEnd = (eventData) => {
    return {
      user: userId,
      name: eventData.name,
      description: eventData.description,
      location: eventData.location,
      meetingLocation: eventData.meetingLocation,
      dateOfEvent: new Date(eventData.eventDate),
      startTime: eventData.eventStartTime,
      endTime: eventData.eventEndTime,
      participants: [userId],
    };
  };

  const eventStartTime = new Date(eventData.eventStartTime).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    }
  );

  const eventEndTime = new Date(eventData.eventEndTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });


  const handleShare = async () => {
    try {
      // Generate a deep link or URL to the event details page of event.
      // UPDATE THIS URL
      const eventUrl = `https://green-circle.ca/event/${eventData.name}`;

      // Construct the share message including the event details and link
      const shareMessage = `Check out "${eventData.name}" on ${new Date(
        eventData.eventDate
      ).toDateString()} at ${
        eventData.locationName
      }. Hosted by ${userName}. ${eventUrl}`;

      // Share message with link using Share API
      await Share.share({
        message: shareMessage,
      });
    } catch (error) {
      console.error("Error sharing event:", error);
    }
  };

  return (
    <ScrollView>
      <View className="flex-1 p-6  justify-between">
        <View>
          <Text className="text-center text-2xl mt-10 font-redhat text-primary font-semibold">
            {eventData.name} Cleanup
          </Text>
          <Text className="text-center text-lg mt-2 mb-10 font-redhat font-semibold">
            Event Details
          </Text>
          <View className=" bg-white rounded-xl p-6 gap-3 ">
            <View className="flex">
              <Pressable
                className="self-end"
                onPress={() =>
                  router.push({
                    pathname: "/create",
                    params: {
                      eventObj: encodeURIComponent(JSON.stringify(eventData)),
                    },
                  })
                }
              >
                <Text className="font-redhat">Edit</Text>
              </Pressable>

              <View className="flex-row">
                <Text className="font-semibold text-base pr-2 font-redhat">
                  Date:
                </Text>
                <Text className="text-base font-redhat">
                  {new Date(eventData.eventDate).toDateString()}
                </Text>
              </View>

              <View className="flex flex-row items-center pb-2 border-b-[1px] border-solid border-black">
                <Text className="font-semibold text-base pr-2 font-redhat">
                  Time:
                </Text>
                <Text className="text-base font-redhat">
                  {eventStartTime} - {eventEndTime}
                </Text>
              </View>
            </View>
            <View className="pb-2 border-b-[1px] border-solid border-black">
              <Text className="font-semibold font-redhat">Host</Text>
              <Text className="font-redhat">{userName}</Text>
            </View>
            <View className="pb-2 border-b-[1px] border-solid border-black">
              <Text className="font-semibold font-redhat">Description</Text>
              <Text className="font-redhat">{eventData.description}</Text>
            </View>
            <View className="pb-2 border-b-[1px] border-solid border-black">
              <Text className="font-semibold font-redhat">Location</Text>
              <Text className="font-redhat">{eventData.locationName}</Text>
            </View>
            <View className="pb-2 border-b-[1px] border-solid border-black">
              <Text className="font-semibold font-redhat">
                Meeting Location
              </Text>
              <Text className="font-redhat">{eventData.meetingLocation}</Text>
            </View>
            <View className="pb-2 border-black">
              <Text className="font-semibold font-redhat">
                Last cleanup with GreenCircle
              </Text>
              <Text>
                {eventData.lastCleanup || "No previous clean up events"}
              </Text>
            </View>
          </View>
        </View>
        <Text className="text-center text-sm p-4 font-redhat ">
          Events are not editable after confirming.
        </Text>
        <CheckInButton
          text="Confirm Details"
          onPress={() => {
            console.log("confirm!", EventDataForBackEnd(eventData));
            createEvent(EventDataForBackEnd(eventData));
            setModalOpen(true);
          }}
        />
        <JoinModal isOpen={modalOpen}>
          <View className=" bg-white w-80 h-75 p-6 pt-0   rounded-xl  ">
            {/* h-[544px] */}
            {/* bg-white w-[340px] */}
            <View className="pb-4  items-center justify-center  border-b   pt-6  w-full border-[#E5E7EB] ">
              <Text className="text-[24px] text-center font-redhatTextSemi w-[160px] ">
                Event Created Succesfully!
              </Text>
            </View>
            <View className="px-5 py-5 ">
              <Text className=" text-xl font-bold font-redhatTextBold">
                {eventData.name} Cleanup
              </Text>
              <View className="justify-between  ">
                <View className="flex-col mt-4  ">
                  <View className="flex-col ">
                    <Text className="text-sm text-gray-400 font-redhat">
                      Date
                    </Text>
                    <Text className="text-base font-redhatTextSemi text-black2">
                      {new Date(eventData.eventDate).toDateString()}
                    </Text>
                  </View>
                </View>

                <View className="flex-col mt-4  ">
                  <View className="flex-col">
                    <Text className="text-sm text-gray-400 font-redhat">
                      Host
                    </Text>
                    <Text className="text-base font-redhatTextSemi text-black2">
                      {userName}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex-col mt-4 ">
                <View className="flex-col">
                  <Text className="text-sm text-gray-400 font-redhat">
                    Time
                  </Text>
                  <Text className="text-base font-redhatTextSemi text-black2">
                    {eventStartTime} - {eventEndTime}
                  </Text>
                </View>
              </View>
              <View className="flex-col mt-4 ">
                <View className="flex-col">
                  <Text className="text-sm text-gray-400 font-redhat">
                    Location
                  </Text>
                  <Text className="text-base font-redhatTextSemi text-black2">
                    {eventData.locationName}
                  </Text>
                  <Text className="text-xs  font-redhat text-black2">
                    {eventData.meetingLocation}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between gap-2 mt-1 ">
              <Link href="/home" asChild>
                <Pressable
                  className="bg-white border-primary border-[1px] w-32 h-14 self-center rounded-full justify-center items-center"
                  onPress={() => {
                    setModalOpen(false);
                  }}
                >
                  <Text className=" text-primary font-redhatTextSemi font-bold text-m">
                    Home Page
                  </Text>
                </Pressable>
              </Link>
              <Pressable
                onPress={handleShare}
                className="bg-primary w-32 h-14 font-redhatTextSemi  self-center rounded-full justify-center items-center"
              >
                <Text className="text-white text-center text-sm">Share</Text>
              </Pressable>
            </View>
          </View>
        </JoinModal>
      </View>
    </ScrollView>
  );
}

export default ConfirmEvent;
