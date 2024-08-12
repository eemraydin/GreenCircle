import React from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/MaterialIcons";
import Text from "../../texts/Text";
import SubHeading from "../../texts/SubHeading";

import ParkIcon from "../../../assets/icons/browse/park-icon.svg";
import BeachIcon from "../../../assets/icons/browse/beach-icon.svg";
import TrailIcon from "../../../assets/icons/browse/trail-icon.svg";

const CATEGORIES = ["Park", "Beach", "Trail"];
const DATE_DURATIONS = ["1", "7", "14"];
const AMENITIES = [
  "Restroom",
  "Dog-friendly",
  "Wheelchair",
  "Drinking water",
  "Parking",
];

const PRIMARY_COLOR = "#005435";
const GRAY_COLOR = "#7C7C7C";
const LIGHT_GRAY_COLOR = "#CCC";
const SLIGHT_GRAY_COLOR = "#DCDCDC";
const ICON_SIZE = 48;

const LocationFilterModal = ({
  visible,
  onClose,
  selectedCategory,
  setSelectedCategory,
  selectedDateDuration,
  setSelectedDateDuration,
  selectedAmenities,
  setSelectedAmenities,
  selectedRadius,
  setSelectedRadius,
  isAllowLocation,
}) => {
  const CategoryButton = (category) => {
    let iconComponent = null;
    switch (category) {
      case "Park":
        iconComponent = (
          <ParkIcon width={ICON_SIZE} height={ICON_SIZE} fill={PRIMARY_COLOR} />
        );
        break;
      case "Beach":
        iconComponent = (
          <BeachIcon
            width={ICON_SIZE}
            height={ICON_SIZE}
            fill={PRIMARY_COLOR}
          />
        );
        break;
      case "Trail":
        iconComponent = (
          <TrailIcon
            width={ICON_SIZE}
            height={ICON_SIZE}
            fill={PRIMARY_COLOR}
          />
        );
        break;
      default:
        iconComponent = <></>;
    }

    return (
      <TouchableOpacity
        key={category}
        className="justify-center items-center px-4 py-2 my-1"
        style={[
          styles.categoryButton,
          selectedCategory === category && styles.selectedCategoryButton,
        ]}
        onPress={() => {
          setSelectedCategory(category === selectedCategory ? "" : category);
        }}
      >
        {iconComponent}
        <Text
          className="text-sm"
          style={[
            styles.categoryButtonText,
            selectedCategory === category && styles.selectedCategoryButtonText,
          ]}
        >
          {category === "Beach" ? category + "es" : category + "s"}
        </Text>
      </TouchableOpacity>
    );
  };

  const CustomRadioButton = ({ selected, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          className="border-primary justify-center items-center rounded-full"
          style={styles.radioButtonOuterCircle}
        >
          {selected && (
            <View
              className="bg-primary rounded-full"
              style={styles.radioButtonInnerCircle}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const DateButton = (dateDuration) => {
    return (
      <View
        key={dateDuration}
        className="flex-row justify-between items-center px-4 my-2"
      >
        <Text className="text-base">
          {dateDuration === "1"
            ? "Last " + "24" + " hours"
            : "Last " + dateDuration + " days"}
        </Text>
        <CustomRadioButton
          selected={selectedDateDuration === dateDuration}
          onPress={() => {
            setSelectedDateDuration(
              dateDuration === selectedDateDuration ? "" : dateDuration
            );
          }}
        />
      </View>
    );
  };

  const AmenityButton = (amenity) => {
    return (
      <TouchableOpacity
        className="justify-center items-center rounded-full px-3 py-1 mx-1 my-2"
        key={amenity}
        style={[
          styles.amenityButton,
          selectedAmenities.includes(amenity) && styles.selectedAmenityButton,
        ]}
        onPress={() => {
          let updatedAmenities;
          if (selectedAmenities.includes(amenity)) {
            updatedAmenities = selectedAmenities.filter(
              (item) => item !== amenity
            );
          } else {
            updatedAmenities = [...selectedAmenities, amenity];
          }
          setSelectedAmenities(updatedAmenities);
        }}
      >
        <Text
          className="text-sm"
          style={[
            styles.amenityButtonText,
            selectedAmenities.includes(amenity) &&
              styles.selectedAmenityButtonText,
          ]}
        >
          {amenity}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View className="justify-center items-center" style={styles.container}>
        <View
          className="relative bg-white px-5 py-5"
          style={styles.contentWrapper}
        >
          <SubHeading className="text-xl ml-3">Filter</SubHeading>
          <TouchableOpacity
            className="absolute"
            style={styles.closeButton}
            onPress={onClose}
          >
            <Icon name="close" size={24} color={GRAY_COLOR} />
          </TouchableOpacity>

          {/* Location Type Section */}
          <View style={styles.separator} />
          <View style={styles.contentSection}>
            <SubHeading style={styles.contentTitle}>Location Type</SubHeading>
            <View className="flex-row flex-wrap justify-between px-4 mt-1">
              {CATEGORIES.map((item) => CategoryButton(item))}
            </View>
          </View>

          {/* Custom Local Radius Section */}
          <View style={styles.separator} />
          <View style={styles.contentSection}>
            <SubHeading
              style={[
                styles.contentTitle,
                !isAllowLocation && styles.disabledText,
              ]}
            >
              Custom Local Radius
            </SubHeading>
            <Text
              className="mb-1"
              style={!isAllowLocation && styles.disabledText}
            >
              Select the cleanup within a specific distance
            </Text>
            <View className="flex-row justify-between items-center">
              <Slider
                style={{ width: "84%", height: 40 }}
                minimumTrackTintColor={PRIMARY_COLOR}
                thumbTintColor={PRIMARY_COLOR}
                disabled={!isAllowLocation}
                tapToSeek={true}
                minimumValue={1}
                maximumValue={100}
                step={1}
                value={selectedRadius}
                onValueChange={(value) => setSelectedRadius(value)}
              />
              <Text style={!isAllowLocation && styles.disabledText}>
                {selectedRadius} km
              </Text>
            </View>
          </View>

          {/* Find event by Section */}
          <View style={styles.separator} />
          <View style={styles.contentSection}>
            <SubHeading style={styles.contentTitle}>Find event by</SubHeading>
            <View>{DATE_DURATIONS.map((item) => DateButton(item))}</View>
          </View>

          {/* Amenities Section */}
          <View style={styles.separator} />
          <View style={styles.contentSection}>
            <SubHeading style={styles.contentTitle}>Amenities</SubHeading>
            <View className="flex-row flex-wrap items-center px-2 mt-2">
              {AMENITIES.map((item) => AmenityButton(item))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentWrapper: {
    width: Dimensions.get("window").width,
    borderRadius: 30,
  },
  closeButton: {
    top: 20,
    right: 20,
  },
  separator: {
    height: 1.2,
    backgroundColor: SLIGHT_GRAY_COLOR,
    marginVertical: 16,
  },
  contentSection: {
    marginVertical: 8,
  },
  contentTitle: {
    marginBottom: 4,
  },
  categoryButton: {
    minWidth: 96,
    borderColor: "#CCC",
    borderWidth: 1.2,
    borderRadius: 8,
  },
  selectedCategoryButton: {
    borderColor: PRIMARY_COLOR,
  },
  categoryButtonText: {
    color: "#333",
  },
  selectedCategoryButtonText: {
    color: PRIMARY_COLOR,
  },
  amenityButton: {
    borderWidth: 1.2,
    borderColor: LIGHT_GRAY_COLOR,
  },
  selectedAmenityButton: {
    backgroundColor: PRIMARY_COLOR,
  },
  amenityButtonText: {
    color: GRAY_COLOR,
  },
  selectedAmenityButtonText: {
    color: "white",
  },
  radioButtonOuterCircle: {
    height: 24,
    width: 24,
    borderWidth: 1.5,
  },
  radioButtonInnerCircle: {
    height: 12,
    width: 12,
  },
  disabledText: {
    color: "#a9a9a9",
  },
});

export default LocationFilterModal;
