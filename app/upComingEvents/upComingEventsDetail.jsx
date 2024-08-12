import { View, Pressable } from "react-native";
import Text from "../../components/texts/Text";
import icons from "../../constants/icons";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import CheckInButton from "../../components/buttons/CheckInButton";
import EventDetails from "../../components/cards/events/EventDetails";
import JoinModal from "../../components/modals/joinModal";
import { getTimeRemaining } from "../../utils/timeUtils";
import { checkInUser } from "../../services/eventsAPI";
import * as SecureStore from "expo-secure-store";
import {
  createCollection,
  getCollectionStatus,
} from "../../services/collectionsAPI";

function Page() {
  const { singleEvent } = useLocalSearchParams();
  const eventData = singleEvent
    ? JSON.parse(decodeURIComponent(singleEvent))
    : null;

  const [countdown, setCountdown] = useState("");
  const [isEventStarted, setIsEventStarted] = useState(false);
  const [isEventEnded, setIsEventEnded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [collectionId, setCollectionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollectionCompleted, setIsCollectionCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const eventStartTime = new Date(eventData.startTime).toISOString();
      const eventEndTime = new Date(eventData.endTime).toISOString();

      const now = new Date();

      setCountdown(getTimeRemaining(eventStartTime));

      const formattedTime = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
      ).toISOString();

      if (formattedTime >= eventStartTime && formattedTime <= eventEndTime) {
        setIsEventStarted(true);
        setIsEventEnded(false);
        clearInterval(interval);
      } else if (formattedTime > eventEndTime) {
        setIsEventStarted(false);
        setIsEventEnded(true);
        setIsCheckedIn(false);
        clearInterval(interval);
      } else {
        setIsEventStarted(false);
        setIsEventEnded(false);
        setCountdown(getTimeRemaining(eventStartTime));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [eventData.startTime, eventData.endTime]);

  useEffect(() => {
    const checkUserCheckInStatus = async () => {
      try {
        const userInfoStr = await SecureStore.getItemAsync("userInfo");
        if (userInfoStr) {
          const parsedUserInfo = JSON.parse(userInfoStr);
          setUserInfo(parsedUserInfo);

          const isCheckedIn = eventData.peopleCheckIn.includes(
            parsedUserInfo._id
          );
          setIsCheckedIn(isCheckedIn);
        }
      } catch (error) {
        console.error("Error checking user check-in status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserCheckInStatus();
  }, [eventData._id]);

  const handleCheckin = () => {
    if (isEventStarted) {
      setIsModalOpen(true);
    } else {
      alert("Event has not started yet.");
    }
  };

  useEffect(() => {
    const createOrFetchCollection = async () => {
      const createdCollection = await createCollection(eventData._id);
      setCollectionId(createdCollection.savedCollection._id);
    };
    createOrFetchCollection();
  }, [isCheckedIn]);

  useEffect(() => {
    const fetchCollectionStatus = async () => {
      if (collectionId) {
        try {
          const status = await getCollectionStatus(collectionId);
          setIsCollectionCompleted(status);
        } catch (error) {
          console.error("Error fetching collection status:", error);
        }
      }
    };

    fetchCollectionStatus();
  }, [collectionId]);

  const handleCheckInConfirm = async () => {
    setIsModalOpen(false);
    try {
      const checkIn = await checkInUser(eventData._id);
      setIsCheckedIn(true);
      router.navigate(`collections/${collectionId}`);
      return checkIn;
    } catch (error) {
      alert("Error checking in. Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-between bg-white">
      <EventDetails eventData={eventData} userInfo={userInfo._id} />
      <View className="p-8 bg-white">
        {isLoading ? (
          <Text className="text-primary text-center text-lg py-5 font-redhat">
            Loading...
          </Text>
        ) : isEventEnded ? (
          <Text className="text-primary font-bold text-lg text-center p-2 font-redhat">
            This event is over
          </Text>
        ) : isCheckedIn ? (
          isCollectionCompleted ? (
            <Text className="text-primary font-bold text-lg text-center p-2 font-redhat">
              Collection Completed
            </Text>
          ) : (
            <Pressable
              className="bg-primary w-full h-[50px] items-center justify-center rounded-3xl"
              onPress={() => router.navigate(`collections/${collectionId}`)}
            >
              <Text className="text-white font-bold text-lg text-center font-redhat">
                Continue Counting
              </Text>
            </Pressable>
          )
        ) : isEventStarted ? (
          <CheckInButton
            icon={icons.checkIn}
            text="Check In"
            onPress={handleCheckin}
          />
        ) : countdown ? (
          <Text className="text-primary font-bold text-lg text-center p-2 font-redhat">
            {`Event Starts In: ${countdown}`}
          </Text>
        ) : (
          <Text className="text-center text-lg py-5 font-redhat">
            Loading...
          </Text>
        )}
      </View>
      <JoinModal isOpen={isModalOpen}>
        <View className="bg-white justify-center items-center p-5 rounded-lg w-85 h-70">
          <Text className="text-2xl font-bold text-center w-52 pb-2.5 font-redhat">
            Ready to Make a Difference?
          </Text>
          <Text className="mb-2.5 text-sm w-65 text-center font-redhat">
            Ensure safety by wearing protective gear and staying hydrated.
            Respect nature, dispose of waste properly, and cooperate with
            others. Confirm your participation and make a positive impact!
          </Text>
          <Pressable
            className="w-60 h-14 bg-primary rounded-full justify-center items-center"
            onPress={handleCheckInConfirm}
          >
            <Text className="text-white font-bold text-xl p-2.5 text-center font-redhat">
              Let's Go
            </Text>
          </Pressable>
        </View>
      </JoinModal>
    </View>
  );
}

export default Page;
