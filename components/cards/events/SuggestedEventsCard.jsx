import { Image, Pressable, View } from "react-native";
import dummyImage from "../../../assets/images/dummy.png";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import Text from "../../texts/Text";
import SubHeading from "../../texts/SubHeading";
import { getImageForLocation } from "../../../utils/imagesUtils";

function SuggestedEventCard({ data, index }) {
  const [image, setImage] = useState();
  const date = new Date(data.dateOfEvent);
  const displayDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "short",
  })}`;

  const fetchImage = async () => {
    try {
      const image = await getImageForLocation(data.location._id);

      setImage(image);
    } catch (error) {
      console.error("Error fetching image for location:", error);
    }
  };
  fetchImage();

  return (
    <Link
      href={`suggestedEvents/suggestedEventDetail?singleEvent=${encodeURIComponent(
        JSON.stringify(data)
      )}&location=${data.locationId}`}
      asChild
    >
      <Pressable
        className="w-56 h-36 relative "
        style={{ marginLeft: index > 0 ? 20 : 0 }}
      >
        <View className="bg-[#fff] w-14 h-9 flex items-center justify-center absolute top-2 right-2 z-10 rounded-md">
          <Text>{displayDate}</Text>
        </View>

        <Image
          source={image}
          className="w-full h-28 rounded-t-xl flex items-center justify-center"
        />
        <View className="absolute bottom-0 z-10 bg-accent w-full h-11 flex items-center justify-center rounded-b-xl">
          <SubHeading className="text-white text-center">
            {data.name}
          </SubHeading>
        </View>
      </Pressable>
    </Link>
  );
}

export default SuggestedEventCard;
