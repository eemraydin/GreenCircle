import { View, TextInput, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import DropDown from "../../components/forms/createEventForm/DropDown.jsx";
import { getAllLocations } from "../../services/locationsAPI.js";
import DateAndTimePicker from "../../components/forms/createEventForm/DateAndTimePicker.jsx";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomTextInput from "../../components/textInput/CustomTextInput.js";
import Text from "../../components/texts/Text.jsx";
import SubHeading from "../../components/texts/SubHeading.jsx";
import { getImageForLocation } from "../../utils/imagesUtils.js";
import { getAllEvents } from "../../services/eventsAPI.js";

const Create = () => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [dropdownSelection, setDropdownSelection] = useState("");
  const [locationArr, setLocationArr] = useState([]);
  const [eventDate, setEventDate] = useState("");
  const [eventDateShown, setEventDateShown] = useState("");
  const [dateSelected, setDateSelected] = useState(false);
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventStartTimeShown, setEventStartTimeShown] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventEndTimeShown, setEventEndTimeShown] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [meetingLocationError, setMeetingLocationError] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [minimumEndTime, setMinimumEndTime] = useState(new Date());
  // State to manage the visibility of date and time pickers
  const [displayDate, setDisplayDate] = useState(false);
  const [displayStartTime, setDisplayStartTime] = useState(false);
  const [displayEndTime, setDisplayEndTime] = useState(false);
  const [lastCleanup, setLastCleanup] = useState("");

  const router = useRouter();
  const { eventObj } = useLocalSearchParams();

  // useEffect(() => {
  //   if (eventObj) {
  //     const eventData = JSON.parse(decodeURIComponent(eventObj));
  //     setName(eventData.name);
  //     setDescription(eventData.description);
  //     setDropdownSelection(eventData.location);
  //     setMeetingLocation(eventData.meetingLocation);
  //     setEventDate(eventData.eventDate);
  //     setEventStartTime(eventData.eventStartTime);
  //     setEventEndTime(eventData.eventEndTime);
  //     setEventDateShown(new Date(eventData.eventDate).toDateString());
  //     setDateSelected(true);
  //     setEventStartTimeShown(
  //       new Date(eventData.eventStartTime).toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //         hour12: false,
  //         timeZone: "UTC",
  //       })
  //     );
  //     setEventEndTimeShown(
  //       new Date(eventData.eventEndTime).toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //         hour12: false,
  //         timeZone: "UTC",
  //       })
  //     );
  //     setDateSelected(true);
  //     console.log(eventData, "this is the event object");
  //   }
  // }, [eventObj]);
  useEffect(() => {
    if (eventObj) {
      const eventData = JSON.parse(decodeURIComponent(eventObj));
      setName(eventData.name);
      setDescription(eventData.description);
      setDropdownSelection(eventData.location);
      setMeetingLocation(eventData.meetingLocation);
      setEventDate(eventData.eventDate);
      setEventStartTime(eventData.eventStartTime);
      setEventEndTime(eventData.eventEndTime);
      setEventDateShown(new Date(eventData.eventDate).toDateString());
      setDateSelected(true);
      setEventStartTimeShown(
        new Date(eventData.eventStartTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "UTC",
        })
      );
      setEventEndTimeShown(
        new Date(eventData.eventEndTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "UTC",
        })
      );
      setDateSelected(true);
    }
  }, [eventObj]);

  const createEventObject = () => {
    const event = {
      name,
      description,
      location: dropdownSelection,
      meetingLocation,
      eventDate: eventDate,
      eventStartTime,
      eventEndTime,
      lastCleanup,
    };

    return event;
  };

  const handleDateChange = (selectedDate) => {
    const formattedDate = new Date(
      selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
    ).toISOString();

    setEventDate(formattedDate);
    setEventDateShown(selectedDate.toDateString());

    setDisplayDate(false);
    setDateSelected(true);

    setEventStartTimeShown("00:00");
    setEventEndTimeShown("00:00");
    setEventStartTime("");
    setEventEndTime("");
  };

  const handleTimeChange = (selectedTime, type) => {
    if (type === "start") {
      // Update event start time

      setEventStartTimeShown(
        selectedTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      const newEventDate = new Date(eventDate);
      newEventDate.setUTCHours(24, 0, 0, 0);
      newEventDate.setHours(selectedTime.getHours());
      newEventDate.setMinutes(selectedTime.getMinutes());
      const formattedDate = new Date(
        newEventDate.getTime() - newEventDate.getTimezoneOffset() * 60000
      ).toISOString();
      setEventDate(formattedDate);

      setEventStartTime(formattedDate);
      setMinimumEndTime(new Date(selectedTime.getTime() + 60000));

      setDisplayStartTime(false);
    } else {
      const newEventEndDate = new Date(eventDate);
      newEventEndDate.setUTCHours(24, 0, 0, 0);
      newEventEndDate.setHours(selectedTime.getHours());
      newEventEndDate.setMinutes(selectedTime.getMinutes());
      const formattedTime = new Date(
        newEventEndDate.getTime() - newEventEndDate.getTimezoneOffset() * 60000
      ).toISOString();
      // Update event end time
      setEventEndTime(formattedTime);

      setEventEndTimeShown(
        selectedTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      setDisplayEndTime(false);
    }
  };

  const validateFields = () => {
    let isValid = true;

    if (name.length < 3) {
      setNameError("Name must be at least 3 characters long");
      isValid = false;
    } else {
      setNameError("");
    }

    if (description.length < 5) {
      setDescriptionError("Description must be at least 5 characters long");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (meetingLocation.length < 5) {
      setMeetingLocationError(
        "Meeting location must be at least 5 characters long"
      );
      isValid = false;
    } else {
      setMeetingLocationError("");
    }

    return isValid;
  };

  useEffect(() => {
    const fetchLocationImage = async () => {
      try {
        const imageUrl = await getImageForLocation(dropdownSelection);
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching location image:", error);
      }
    };
    const lastCleanup = async () => {
      try {
        const events = await getAllEvents();
        const sameLocation = events.filter(
          (el) => el.location._id === dropdownSelection
        );
        const latestEventinLocation = sameLocation.reduce((latest, current) => {
          return new Date(latest.dateOfEvent) > new Date(current.dateOfEvent)
            ? latest
            : current;
        });
        const latestCleanUpDate = new Date(latestEventinLocation.dateOfEvent);
        const options = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        const formattedDate = latestCleanUpDate.toLocaleDateString(
          "en-US",
          options
        );
        setLastCleanup(formattedDate);
        console.log(latestCleanUpDate, "hi");
        console.log(lastCleanup, "hi");
      } catch (error) {
        console.log(error);
      }
    };
    lastCleanup();
    fetchLocationImage();
  }, [dropdownSelection]);

  const handlePress = () => {
    const isValid = validateFields();

    if (isValid) {
      const locationName = locationArr.find(
        (location) => location.value === dropdownSelection
      )?.label;

      const event = {
        ...createEventObject(),
        locationName,
      };

      router.push({
        pathname: `eventsDetail/confirmEvent`,
        params: { eventObj: encodeURIComponent(JSON.stringify(event)) },
      });
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const result = await getAllLocations();

        const locationArr = result.map(({ _id, name }) => ({
          label: name,
          value: _id,
        }));
        setLocationArr(locationArr);
      } catch (error) {
        console.error("Error fetching all locations:", error);
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const checkFieldsFilled =
      name &&
      description &&
      dropdownSelection &&
      eventDate &&
      eventStartTime &&
      eventEndTime;
    setIsButtonEnabled(!!checkFieldsFilled);
  }, [
    name,
    description,
    dropdownSelection,
    eventDate,
    eventStartTime,
    eventEndTime,
  ]);

  return (
    // <SafeAreaView className="flex-1">
    <ScrollView>
      <View className="px-4 pb-6 pt-4 ">
        <SubHeading className="text-2xl mb-4 text-center">
          Create Cleanup Event
        </SubHeading>

        <View className="mb-4">
          <CustomTextInput
            label="Event Name"
            placeholder="Enter the event name"
            value={name}
            onChangeText={setName}
            error={nameError}
          />
        </View>

        <View className="mb-4 ">
          <CustomTextInput
            label="Description"
            placeholder="Explain about the cleanup event"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
            height="36"
            error={descriptionError}
          />
        </View>

        <View className="mb-4 ">
          <Text>Location</Text>
          <DropDown
            dropdownSelection={dropdownSelection}
            onDropDown={setDropdownSelection}
            selectionArr={locationArr}
          />
        </View>

        <View className="mb-4">
          <CustomTextInput
            label="Meeting Location"
            placeholder="Location to meet"
            value={meetingLocation}
            onChangeText={setMeetingLocation}
            error={meetingLocationError}
          />
        </View>

        <Pressable className="mb-4">
          <Text>Date of event</Text>
          <TextInput
            onPress={() => setDisplayDate(true)}
            placeholder="mm/dd/yyyy"
            value={eventDateShown}
            onChangeText={setEventDate}
            placeholderTextColor="#11182744"
            editable={false}
            className="w-full h-12 mt-1 px-4 bg-white rounded-xl border-2 border-gray-100 focus:border-gray-500 items-center flex-row"
          />
        </Pressable>
        {dateSelected && (
          <>
            <View className="flex-row gap-6">
              <Pressable className="mb-4">
                <Text>Start Time</Text>
                <TextInput
                  onPress={() => setDisplayStartTime(true)}
                  placeholder="00:00"
                  value={eventStartTimeShown}
                  onChangeText={setEventStartTime}
                  placeholderTextColor="#11182744"
                  editable={false}
                  className="w-40 h-12 mt-1 px-4 bg-white rounded-xl border-2 border-gray-100 focus:border-gray-500 items-center flex-row"
                />
              </Pressable>

              <Pressable className="mb-4">
                <Text>End Time</Text>
                <TextInput
                  onPress={() => setDisplayEndTime(true)}
                  placeholder="00:00"
                  value={eventEndTimeShown}
                  onChangeText={setEventEndTime}
                  placeholderTextColor="#11182744"
                  editable={false}
                  className="w-40 h-12 mt-1 px-4 bg-white rounded-xl border-2 border-gray-100 focus:border-gray-500 items-center flex-row"
                />
              </Pressable>
            </View>
          </>
        )}
        <DateAndTimePicker
          isVisible={displayDate}
          mode="date"
          onConfirm={handleDateChange}
          onCancel={() => setDisplayDate(false)}
          minimumDate={new Date()}
        />
        {dateSelected && (
          <>
            <DateAndTimePicker
              isVisible={displayStartTime}
              mode="time"
              onConfirm={(time) => handleTimeChange(time, "start")}
              onCancel={() => setDisplayStartTime(false)}
            />

            <DateAndTimePicker
              isVisible={displayEndTime}
              mode="time"
              onConfirm={(time) => handleTimeChange(time, "end")}
              onCancel={() => setDisplayEndTime(false)}
              minimumDate={minimumEndTime}
            />
          </>
        )}
        <View className="justify-center items-center ">
          <Text>Kindly read the safety tips on GreenGuide</Text>
          <Pressable
            onPress={handlePress}
            className={`bg-${
              isButtonEnabled ? "primary" : "primaryLight"
            } h-[48px] w-[324px] justify-center items-center rounded-full mt-4`}
            disabled={!isButtonEnabled}
          >
            <SubHeading className="text-white text-center">
              Create Event
            </SubHeading>
          </Pressable>
        </View>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

export default Create;
