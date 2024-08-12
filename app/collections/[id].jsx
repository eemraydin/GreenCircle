import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Modal, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router, Link } from "expo-router";
import {
  createCollection,
  updateMaterialCount,
  getCollectionById,
  updateCollectionStatus,
} from "../../services/collectionsAPI";
// import { TouchableHighlight } from "react-native";
import Text from "../../components/texts/Text";

import GreenCircle from "../../assets/icons/collections/greenCircle.svg";
import Plastic from "../../assets/icons/collections/plastic.svg";
import Tobacco from "../../assets/icons/collections/tobacco.svg";
import Metal from "../../assets/icons/collections/metal.svg";
import Glass from "../../assets/icons/collections/glass.svg";
import Fabric from "../../assets/icons/collections/fabric.svg";
import Paper from "../../assets/icons/collections/paper.svg";
import Next from "../../assets/icons/iconsActive/next.png";
import { updateEventCollections } from "../../services/eventsAPI";
import SwipeButton from "../../components/buttons/SwipeButton";

const initialCounts = [
  { material: "plastic", count: 0 },
  { material: "tobacco", count: 0 },
  { material: "metal", count: 0 },
  { material: "glass", count: 0 },
  { material: "fabric", count: 0 },
  { material: "paper", count: 0 },
];

const CollectionsPage = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState(initialCounts);
  const [totalCounts, setTotalCounts] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const [summryModalVisible, setSummryModalVisible] = useState(false);
  const [isCollectionCompleted, setIsCollectionCompleted] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      try {
        let eventData;
        if (id) {
          // Fetch or create collection based on ID
          eventData = await createOrFetchCollection(id);
        }
        if (eventData) {
          setData(eventData.savedCollection);
          setCounts(eventData.savedCollection.counts);
          setTotalCounts(eventData.savedCollection.totalCount || 0);
          setIsCollectionCompleted(eventData.savedCollection.completed);
        }
      } catch (error) {
        console.error("Error fetching event data", error);
        setError("Failed to fetch event data");
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);
  console.log("data", data);

  const createOrFetchCollection = async (eventId) => {
    try {
      // Check if collection already exists for the event ID
      const existingCollection = await getCollectionById(eventId);
      if (existingCollection) {
        return { savedCollection: existingCollection };
      } else {
        // If collection doesn't exist, create a new one
        const newCollection = await createCollection(eventId);
        return { savedCollection: newCollection };
      }
    } catch (error) {
      console.error("Error creating or fetching collection", error);
      throw error;
    }
  };

  const handleIncrement = async (material) => {
    try {
      const updatedCollection = await updateMaterialCount(
        data._id,
        material,
        "increment"
      );
      const updatedCounts = counts.map((item) =>
        item.material === material ? { ...item, count: item.count + 1 } : item
      );
      setCounts(updatedCounts);
      setTotalCounts(totalCounts + 1);
    } catch (error) {
      console.error("Error incrementing material count", error);
    }
  };

  const handleDecrement = async (material) => {
    try {
      // Find the item in counts array
      const item = counts.find((item) => item.material === material);

      // Check if count is already 0
      if (item.count === 0) {
        return;
      }

      // Proceed with decrement
      const updatedCollection = await updateMaterialCount(
        data._id,
        material,
        "decrement"
      );

      // Update counts state
      const updatedCounts = counts.map((item) =>
        item.material === material ? { ...item, count: item.count - 1 } : item
      );
      setCounts(updatedCounts);
      setTotalCounts(totalCounts - 1);
    } catch (error) {
      console.error("Error decrementing material count", error);
    }
  };

  const handleEndCount = async () => {
    try {
      // Set collection as completed
      await updateCollectionStatus(data._id, { completed: true });

      // Fetch the updated collection to ensure it's completed
      const updatedCollection = await getCollectionById(data._id);
      setIsCollectionCompleted(updatedCollection.completed);

      // Update the event with the collection ID
      await updateEventCollections(data.event._id, data._id);

      console.log("Collection completed", updatedCollection);
      setSummryModalVisible(true);
    } catch (error) {
      console.error("Error fetching collection details", error);
    }
  };

  const iconProvider = (material) => {
    switch (material) {
      case "plastic":
        return <Plastic />;
      case "tobacco":
        return <Tobacco />;
      case "metal":
        return <Metal />;
      case "glass":
        return (
          <Glass
            height="72"
            stroke="white"
            strokeWidth="4.8"
            strokeMiterlimit="10"
          />
        );
      case "fabric":
        return <Fabric />;
      case "paper":
        return <Paper />;
      default:
        return "❓";
    }
  };

  return (
    <SafeAreaView className="flex mt-12 justify-center items-center pb-2">
      <Text className="text-lg">Waste Collected: {totalCounts}</Text>
      <View className="flex-row flex-wrap items-center p-8 pb-0 pt-0 w-full justify-center">
        {counts.map((item) => (
          <View
            key={item.material}
            className="
              flex-wrap justify-center items-center p-4"
          >
            <Pressable
              onPress={() => handleIncrement(item.material)}
              onLongPress={() => handleDecrement(item.material)}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.5 : 1,
                  stroke: pressed ? "#7CFC00" : "transparent",

                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <View className="flex justify-center items-center">
                <GreenCircle className="bg-green-500 w-[124px] h-[124px] rounded-full ml-4  " />
                <Text className="text-white font-bold absolute">
                  {iconProvider(item.material)}
                </Text>
              </View>
            </Pressable>
            <Text className="ml-4 capitalize">{item.material}</Text>
            <Text className="text-xl"> {item.count}</Text>
          </View>
        ))}
        <View>
          <View>
            <SwipeButton
              title="End Cleanup"
              onSwipeSuccess={handleEndCount}
              width={270}
              height={56}
            />

            {loading && <ActivityIndicator size="large" color="#005435" />}
            {error && <Text className="text-red-400">{error}</Text>}
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center ">
          <View className="m-20 bg-white rounded-xl p-10 align-center w-[355px] text-start">
            <Text className="text-lg font-bold">Tip:</Text>
            <Text className="mt-4 text-[16px]">
              <Text className="text-green-800 font-bold  ">Tap</Text> to add a
              quantity of this material.
            </Text>
            <Text className="mt-2">
              <Text className="text-red-600 font-bold">Hold</Text> to remove.
            </Text>
            <Pressable
              className="mt-6 bg-accent p-4 rounded-full align-center"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="text-white text-center">Got it!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={summryModalVisible}
        onRequestClose={() => {
          setSummryModalVisible(!summryModalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center mt-22">
          <View className="m-20 bg-white rounded-xl p-10 align-center w-[334px]">
            <Text className="text-lg font-bold">🥳 Congratulations!</Text>
            <Text className="mt-4">You made a difference today!</Text>
            <Text className="mt-4 text-primary text-base font-bold">
              Collection Summary:
            </Text>
            <Text className="mt-2">Total waste collected: {totalCounts}</Text>
            <Text className="mt-4 text-primary text-base font-bold">
              Waste Breakdown:
            </Text>
            {counts.map((item) => (
              <Text key={item.material} className="mt-2 capitalize">
                {item.material}: {item.count}
              </Text>
            ))}
            <Link href="/home" asChild>
              <Pressable
                className="mt-6 bg-accent p-4 rounded-full align-center"
                onPress={() => setSummryModalVisible(!summryModalVisible)}
              >
                <Text className="text-white text-center">Return Home</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CollectionsPage;
