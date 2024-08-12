import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter hook
import { getAllEvents, getUserEvents } from "../../services/eventsAPI";
import { getAllCollections } from "../../services/collectionsAPI";
import SubHeading from "../../components/texts/SubHeading";
import Text from "../../components/texts/Text";
import Owner from "../../assets/icons/owner";

const Clean = () => {
  const router = useRouter(); // Initialize router
  const [selectedTab, setSelectedTab] = useState("Joined");

  const [allEvents, setAllEvents] = useState(null);
  const [userEvents, setUserEvents] = useState(null);
  const [collections, setCollections] = useState(null);
  const [firstUser, setFirstUser] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedAllEvents = await getAllEvents();
        setAllEvents(fetchedAllEvents);

        const fetchedUserEvents = await getUserEvents();
        setUserEvents(fetchedUserEvents);

        const fetchedCollections = await getAllCollections();
        setCollections(fetchedCollections);

        if (fetchedCollections.collections.length > 0) {
          const firstUser = fetchedCollections.collections[0].user;
          setFirstUser(firstUser);

          const filteredEvents = fetchedAllEvents.filter(
            (event) => event.user._id === firstUser
          );
          setFilteredEvents(filteredEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  if (
    !allEvents ||
    !userEvents ||
    !collections ||
    !firstUser ||
    !filteredEvents
  ) {
    return null;
  }

  const tabTexts = ["Joined", "Hosted", "All"];
  const maxTextWidth = Math.max(...tabTexts.map((text) => text.length));

  const tabButtonStyle = {
    width: maxTextWidth * 15,
  };
// ?singleEvent=${encodeURIComponent(
//               JSON.stringify(data)
  const handleEventPress = (event) => {
    router.push(
      `upComingEvents/upComingEventsDetail?singleEvent=${encodeURIComponent(
        JSON.stringify(event)
      )}`
    );
  };

  const JoinedCard = () => {
    if (userEvents.length === 0) {
      return (
        <View style={styles.card}>
          <Text style={styles.noEventsText}>
            You have not joined any cleanup events yet.
          </Text>
        </View>
      );
    }
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {userEvents.map((event) => (
          <TouchableOpacity
            key={event._id}
            onPress={() => handleEventPress(event)}
          >
            <View style={styles.card}>
              <SubHeading style={styles.eventName}>{event.name}</SubHeading>
              <Text className="text-14" style={styles.eventDate}>
                {new Date(event.dateOfEvent).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </Text>
              <Text className="text-14" style={styles.eventParticipants}>
                {event.participants.length} participants
              </Text>
              {event.user._id === firstUser && (
                <View className="absolute top-2 right-2">
                  <Owner />
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const HostedCard = () => {
    if (filteredEvents.length === 0) {
      return (
        <View style={styles.card}>
          <Text style={styles.noEventsText}>
            You have not hosted any cleanup events yet.
          </Text>
        </View>
      );
    }
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredEvents.map((event) => (
          <TouchableOpacity
            key={event._id}
            onPress={() => handleEventPress(event)}
          >
            <View style={styles.card}>
              <SubHeading style={styles.eventName}>{event.name}</SubHeading>
              <Text className="text-14" style={styles.eventDate}>
                {new Date(event.dateOfEvent).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </Text>
              <Text className="text-14" style={styles.eventParticipants}>
                {event.participants.length} participants
              </Text>
              {event.user._id === firstUser && (
                <View className="absolute top-2 right-2">
                  <Owner />
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const AllCard = () => {
    if (allEvents.length === 0) {
      return (
        <View style={styles.card}>
          <Text style={styles.noEventsText}>
            You have not hosted any cleanup events yet.
          </Text>
        </View>
      );
    }
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {allEvents.map((event) => (
          <TouchableOpacity
            key={event._id}
            onPress={() => handleEventPress(event)}
          >
            <View style={styles.card}>
              <SubHeading style={styles.eventName}>{event.name}</SubHeading>
              <Text className="text-14" style={styles.eventDate}>
                {new Date(event.dateOfEvent).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </Text>
              <Text className="text-14" style={styles.eventParticipants}>
                {event.participants.length} participants
              </Text>
              {event.user._id === firstUser && (
                <View className="absolute top-2 right-2">
                  <Owner />
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>You can check all of your cleanup events history. </Text>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              tabButtonStyle,
              selectedTab === "Joined" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("Joined")}
          >
            <Text
              className="text-14"
              style={[
                styles.tabText,
                selectedTab === "Joined" && styles.activeTabText,
              ]}
            >
              Joined
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              tabButtonStyle,
              selectedTab === "Hosted" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("Hosted")}
          >
            <Text
              className="text-14"
              style={[
                styles.tabText,
                selectedTab === "Hosted" && styles.activeTabText,
              ]}
            >
              Hosted
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              tabButtonStyle,
              selectedTab === "All" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("All")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "All" && styles.activeTabText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {selectedTab === "Joined" && <JoinedCard />}
          {selectedTab === "Hosted" && <HostedCard />}
          {selectedTab === "All" && <AllCard />}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "#F7F8FB",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#DCDCDC",
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#004d40",
  },
  tabText: {
    color: "#777777",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  scrollViewContent: {
    alignItems: "center",
  },
  card: {
    marginBottom: 10,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    width: 300,
  },
  eventName: {
    fontWeight: "bold",
    color: "#003B22",
  },
  eventDate: {
    color: "#131313",
    marginBottom: 10,
    marginTop: 10,
  },
  eventParticipants: {
    color: "#131313",
  },
  header: {
    marginBottom: 15,
  },
});

export default Clean;
