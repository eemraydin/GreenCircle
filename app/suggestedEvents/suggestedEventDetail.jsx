import { Pressable, View } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Text from "../../components/texts/Text";
import CheckInButton from "../../components/buttons/CheckInButton";
import JoinModal from "../../components/modals/joinModal";
import { joinEvent } from "../../services/eventsAPI";
import SuggestedEvent from "../eventsDetail/suggestedEvent";

function page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [join, setJoin] = useState(false);

  const { singleEvent } = useLocalSearchParams();

  const eventData = singleEvent
    ? JSON.parse(decodeURIComponent(singleEvent))
    : null;

  console.log("Event data:", eventData);

  const handleJoinEvent = async () => {
    try {
      console.log("Joining event with ID:", eventData._id);
      const response = await joinEvent(eventData._id);
      console.log("Join event response:", response);
      router.push("/home");
      setJoin(true);
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  return (
    <View className="flex-1 relative">
      <SuggestedEvent eventData={eventData} />
      <View className="bg-gray-50 pb-10 p-5">
        {join === false ? (
          <CheckInButton text="Join" onPress={() => setModalOpen(true)} />
        ) : (
          <CheckInButton text="Joined" />
        )}
      </View>

      <JoinModal isOpen={modalOpen}>
        <View className="bg-white px-[24px] py-[30px] rounded-xl  justify-center w-[340px] h-[283px]">
          <Text className="font-extrabold text-center text-2xl font-redhat">
            Ready to Make a Difference?
          </Text>
          <Text className="text-center text-sm p-3 font-redhat">
            Ensure safety by wearing protective gear, staying hydrated. Respect
            nature, dispose of waste properly, and cooperate with others.
            Confirm your participation and make a positive impact!
          </Text>
          <Pressable
            className="bg-primary w-[241px] h-[56px] self-center rounded-full justify-center items-center"
            onPress={() => {
              setModalOpen(false);
              setModal2Open(true);
            }}
          >
            <Text className="text-white font-bold text-m font-redhat">
              Let's go
            </Text>
          </Pressable>
        </View>
      </JoinModal>
      <JoinModal isOpen={modal2Open}>
        <View className="bg-white px-[24px] py-[30px] rounded-xl  justify-center w-[340px] h-[283px]">
          <Text className="font-extrabold text-center text-2xl font-redhat">
            You're in!
          </Text>
          <Text className="text-center text-sm p-4 font-redhat">
            You have successfully joined the event! You're now part of a
            significant effort to improve our environment. Share the event with
            your friends and enjoy a safe and rewarding cleanup experience
          </Text>
          <Pressable
            className="bg-primary w-[241px] h-[56px] self-center rounded-full justify-center items-center"
            onPress={() => {
              setModal2Open(false);
              handleJoinEvent();
            }}
          >
            <Text className="text-white font-bold text-m font-redhat">
              Done
            </Text>
          </Pressable>
        </View>
      </JoinModal>
    </View>
  );
}

export default page;
