import { View, ScrollView, ActivityIndicator, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EventList from "../../components/cards/events/EventList";
import GreenGuide from "../../components/cards/guides/GreenGuide";
import { getUser } from "../../services/auth";
import { getAllEvents, getUserEvents } from "../../services/eventsAPI";
import { getPreferences } from "../../services/preferences";
import AchievementsCard from "../../components/cards/achievements/AchievementsCard";
import { useAuth } from "../../authProvider/AuthProvider";
import * as SecureStore from "expo-secure-store";
import Heading from "../../components/texts/Heading";
import { getSuggestedEvents, getUpcomingEvents } from "../../utils/eventUtils";
import Splash from "../../assets/Splash";
import SplashIcon from "../../assets/splashIcon";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const { userName } = useAuth();
  const [user, setUser] = useState(null);
  const [isAllowDataCollection, setIsAllowDataCollection] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user info
        const userInfo = await getUser();
        setUser(userInfo.user);

        // Store user info in SecureStore
        const userInfoSerialized = JSON.stringify(userInfo.user);
        await SecureStore.setItemAsync("userInfo", userInfoSerialized);

        // Fetch all events
        const eventsData = await getAllEvents();
        setEvents(eventsData);

        // Fetch user-specific events
        const userEventsData = await getUserEvents();
        setUserEvents(userEventsData);

        // Fetch preferences
        const preferences = await getPreferences();
        setIsAllowDataCollection(
          preferences &&
            preferences.preferences &&
            preferences.preferences.dataCollection
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const upcomingEvents = getUpcomingEvents(userEvents);
  const suggestedEvents = getSuggestedEvents(
    events,
    userEvents,
    isAllowDataCollection
  );

  return (
    <View className="flex-1 bg-white">
      {loading ? (
        <Modal
          
          visible={loading}
          animationType="fade"
          statusBarTranslucent
        >
          <View className="flex-1 justify-center items-center bg-primary z-50">
            <Splash /> 
          </View>
        </Modal>
      ) : (
        <ScrollView className="bg-slate-100">
          <SafeAreaView className="bg-white" />
          <View className="flex-row justify-between pb-3 bg-white">
            <Heading className="text-32 p-4 py-1">Hello {userName}!</Heading>
          </View>

          <AchievementsCard />
          <EventList
            title="Upcoming Events"
            events={upcomingEvents}
            eventType="upcoming"
          />
          <EventList
            title="Suggested Events"
            events={suggestedEvents}
            eventType="suggested"
          />
          <GreenGuide />
        </ScrollView>
      )}
    </View>
  );
};

export default Home;
