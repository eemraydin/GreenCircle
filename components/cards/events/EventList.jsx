import { FlatList, Pressable, View } from "react-native";
import Text from "../../texts/Text";
import SubHeading from "../../texts/SubHeading";
import Heading from "../../texts/Heading";
import UpcomingCard from "./UpcomingCard";
import SuggestedEventCard from "./SuggestedEventsCard";
import { useRef } from "react";
import { Link } from "expo-router";

function EventList({ title, events, eventType }) {
  const flatListRef = useRef();

  return (
    <View className="p-4">
      <View className="flex-row items-center justify-between">
        <Heading className="py-1">{title}</Heading>

        {eventType === "upcoming" && events.length > 0 && (
          <Link href="/cleanUpHistory/CleanHistory" asChild>
            <Pressable>
              <Text>See All</Text>
            </Pressable>
          </Link>
        )}

        {eventType === "suggested" && events.length > 5 && (
          <Link href="/browse" asChild>
            <Pressable>
              <Text>See All</Text>
            </Pressable>
          </Link>
        )}
      </View>

      {events.length === 0 ? (
        <View className="bg-primaryLight rounded-lg mb-4 items-center">
          <View className="flex-col rounded-lg w-full bg-white p-3 justify-center items-center">
            <SubHeading className="w-80 text-xl text-center text-gray300">
              No Events Joined
            </SubHeading>
            <Text className="w-80 text-sm text-center text-gray300">
              Events created and joined will be displayed here.
            </Text>
            <Text className="w-60 text-sm text-center text-gray300">
              Ready to make a difference?
            </Text>

            <Link href="/browse" asChild>
              <Pressable className="py-2 px-6 bg-primary rounded-3xl justify-center items-center h-10 mt-4">
                <SubHeading className="text-white">Browse Events</SubHeading>
              </Pressable>
            </Link>
          </View>
        </View>
      ) : null}

      <View>
        {events.length > 0 && (
          <FlatList
            ref={flatListRef}
            data={events}
            horizontal
            renderItem={({ item, index }) =>
              eventType === "upcoming" ? (
                <UpcomingCard data={item} />
              ) : (
                <SuggestedEventCard data={item} index={index} />
              )
            }
          />
        )}
      </View>
    </View>
  );
}

export default EventList;
