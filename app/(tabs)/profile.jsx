import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import Text from "../../components/texts/Text";
import SubHeading from "../../components/texts/SubHeading";
import JoinModal from "../../components/modals/joinModal";
import { Link } from "expo-router";
import FormField from "../../components/forms/FormField";
import icons from "../../constants/icons";
import { useAuth } from "../../authProvider/AuthProvider";
import { updateUser } from "../../services/auth";
import SnackBar from "../../components/modals/SnackBar";
import edit from "../../assets/icons/profile/edit.svg";
import { updatePreferences } from "../../services/preferences";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarOpen2, setSnackBarOpen2] = useState(false);
  const [snackBarOpen3, setSnackBarOpen3] = useState(false);
  const [cpw, setCpw] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [isDataEnabled, setIsDataEnabled] = useState(false);
  const {
    onLogout,
    onLogin,
    setUserName,
    userPreferences,
    setUserPreferences,
    userId,
  } = useAuth();

  // const toggleSwitch = async (type) => {
  //   let newPref = { ...userPreferences.preferences };
  //   if (type === "location") {
  //     // setIsLocationEnabled((previousState) => !previousState);
  //     newPref.location = !newPref.location;
  //   }
  //   if (type === "data") {
  //     // setIsDataEnabled((previousState) => !previousState);
  //     newPref.dataCollection = !newPref.dataCollection;
  //   }
  //   setUserPreferences({ preferences, newPref });

  //   try {
  //     await updatePreferences(userId, newPref);
  //   } catch (error) {
  //     console.error("Error updating preferences:", error);
  //   }
  // };
  const toggleSwitch = async (type) => {
    if (!userPreferences.preferences) {
      console.error("User preferences are not available.");
      return;
    }

    let newPref = { ...userPreferences.preferences };
    if (type === "location") {
      newPref.location = !newPref.location;
    }
    if (type === "data") {
      newPref.dataCollection = !newPref.dataCollection;
    }

    setUserPreferences({ ...userPreferences, preferences: newPref });

    try {
      // console.log("updated pref", newPref);
      await updatePreferences(newPref);
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };
  const handleVerify = async () => {
    try {
      await onLogin(userInfo.email, cpw);
      return true;
    } catch (error) {
      console.log(error);
      Alert.alert(error.message || "Failed to login");
    }

    setisSubmitting(false);
  };
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await SecureStore.getItemAsync("userInfo");
        if (userInfo) {
          setUserInfo(JSON.parse(userInfo));
        }
        // console.log("User info loaded from secure store:", userInfo);
      } catch (error) {
        console.error("Error loading user info from secure store:", error);
      }
    };

    loadUserInfo();
  }, []);
  return (
    <ScrollView>
      <View>
        <SnackBar isOpen={snackBarOpen}>
          <Text className="text-white">Profile updated.</Text>
          <Pressable onPress={() => setSnackBarOpen(false)}>
            <Image source={icons.close} />
          </Pressable>
        </SnackBar>
        <SnackBar isOpen={snackBarOpen2}>
          <Text className="text-white">Password updated.</Text>
          <Pressable onPress={() => setSnackBarOpen2(false)}>
            <Image source={icons.close} />
          </Pressable>
        </SnackBar>
        <SnackBar isOpen={snackBarOpen3}>
          <Text className="text-white">
            New Password and Confirm Password don't match.
          </Text>
          <Pressable onPress={() => setSnackBarOpen3(false)}>
            <Image source={icons.close} />
          </Pressable>
        </SnackBar>
        <View className="m-4  p-4 bg-[#ffffff] rounded-lg">
          <View className="flex-row justify-between">
            <SubHeading className="text-xl color-primaryDark">
              Profile
            </SubHeading>
            <Pressable onPress={() => setModalOpen(!modalOpen)}>
              <Image source={icons.edit} />
            </Pressable>
          </View>
          <View className="divide-y-2 gap-2">
            {/* border-b-2 */}
            <View>
              <Text className="py-2 text-black">{userInfo.name}</Text>
            </View>
            <View>
              <Text className="py-2 text-black mt-1">{userInfo.email}</Text>
            </View>
          </View>
        </View>
        <JoinModal isOpen={modalOpen}>
          <View className="bg-white100 w-11/12 px-8 py-6 rounded-xl items-center justify-center">
            <Text className="font-extrabold mt-1 text-center text-[25.75rem] text-primary">
              Edit Profile
            </Text>
            <FormField
              title="Name"
              value={userInfo.name}
              handleChangeText={(e) => setUserInfo({ ...userInfo, name: e })}
              otherStyles="mt-4"
              keyboardType="email-address"
              placeholder={"Your email"}
            />
            {/* <FormField
              title="Email"
              value={userInfo.email}
              handleChangeText={(e) => setUserInfo({ ...userInfo, email: e })}
              otherStyles="mt-4"
              keyboardType="email-address"
              placeholder={"Your email"}
            /> */}

            <View className="flex-row gap-8 py-6 mt-1">
              <Pressable
                className="border border-primary bg-[#ffffff] w-3/12 h-8 self-center rounded-full justify-center items-center"
                onPress={() => {
                  setModalOpen(!modalOpen);
                }}
              >
                <Text className=" text-primary font-bold text-m">Cancel</Text>
              </Pressable>
              <Pressable
                className="bg-primary w-3/12 h-8 self-center rounded-full justify-center items-center"
                onPress={() => {
                  setModalOpen(!modalOpen);
                  updateUser(userInfo.name, undefined);
                  //triger the value in context
                  setUserName(userInfo.name);
                  setSnackBarOpen(true);
                }}
              >
                <Text className="text-white font-bold text-m">Save</Text>
              </Pressable>
            </View>
          </View>
        </JoinModal>
        <View className="m-4 p-4 bg-[#ffffff] rounded-lg">
          <View className="flex-row justify-between">
            <SubHeading className="text-xl color-primaryDark">
              Password
            </SubHeading>
            <Pressable onPress={() => setModalOpen2(!modalOpen2)}>
              <Image source={icons.edit} />
            </Pressable>
          </View>
          <View>
            <View>
              <Text className="mt-6 text-black">*******</Text>
            </View>
          </View>
        </View>
        <JoinModal isOpen={modalOpen2}>
          <View className="bg-white100 w-11/12 px-8 py-10 rounded-xl  justify-center">
            <Text className="font-extrabold text-center text-[25.75rem]  text-primary">
              Change Password
            </Text>
            <FormField
              title="Current Password"
              value={cpw}
              handleChangeText={(e) => setCpw(e)}
              otherStyles="mt-4"
              placeholder={"Current Password"}
            />
            <FormField
              title="New Password"
              value={pw}
              handleChangeText={(e) => setPw(e)}
              otherStyles="mt-4"
              placeholder={"New Password"}
            />
            <FormField
              title="Confirm New Password"
              value={pw2}
              handleChangeText={(e) => setPw2(e)}
              otherStyles="mt-4"
              placeholder={"Confirm New password"}
            />

            <View className="flex-row justify-between  py-4 mt-1">
              <Pressable
                className="border border-primary bg-[#ffffff] w-3/12 h-8  rounded-full justify-center items-center"
                onPress={() => {
                  setModalOpen2(!modalOpen2);
                }}
              >
                <Text className=" text-primary font-bold text-m">Cancel</Text>
              </Pressable>
              <Pressable
                className="bg-primary w-3/12 h-8  rounded-full justify-center items-center"
                onPress={() => {
                  setModalOpen2(!modalOpen2);

                  if (handleVerify() && pw === pw2) {
                    updateUser(undefined, pw);
                    setSnackBarOpen2(true);
                  } else {
                    setSnackBarOpen3(true);
                    console.log("Passwords do not match");
                  }
                }}
              >
                <Text className="text-white font-bold text-m">Save</Text>
              </Pressable>
            </View>
          </View>
        </JoinModal>
        <View className="flex-col  m-4 p-4 bg-[#ffffff] rounded-lg justify-between ">
          <View className="flex-row justify-between items-start">
            <View>
              <SubHeading className="text-black pb-2">
                Allow Location
              </SubHeading>
              <Text className="text-sm">
                Get better cleanup recommendations and
              </Text>
              <Text className="text-sm">
                updates based on your exact location.
              </Text>
            </View>

            <Switch
              trackColor={{ false: "#ffffff", true: "#005435" }}
              thumbColor={isLocationEnabled ? "#f7f8fb" : "#131313"}
              ios_backgroundColor="#ffffff"
              onValueChange={() => toggleSwitch("location")}
              value={userPreferences.preferences.location}
              style={{
                borderWidth: 1,
                borderColor: "#131313",
                borderRadius: 20,
              }}
            />
          </View>
          <View className="mt-4 mb-4 border-b-2 border-gray-400"></View>
          <View className="flex-row  justify-between items-start">
            <View>
              <SubHeading className="text-black pb-2">
                Consent to Data Collection
              </SubHeading>
              <Text className="text-sm">
                By enabling this option, you consent to the
              </Text>
              <Text className="text-sm">
                collection and use of your data, so we can
              </Text>
              <Text className="text-sm">
                track your cleanup activities and provide
              </Text>
              <Text className="text-sm">
                accurate information on all our efforts.
              </Text>
            </View>

            <Switch
              trackColor={{ false: "#ffffff", true: "#005435" }}
              thumbColor={isDataEnabled ? "#f7f8fb" : "#131313"}
              ios_backgroundColor="#ffffff"
              onValueChange={() => toggleSwitch("data")}
              value={userPreferences.preferences.dataCollection}
              style={{
                borderWidth: 1,
                borderColor: "#131313",
                borderRadius: 20,
              }}
            />
          </View>
        </View>

        <View className="flex-row items-center justify-center mt-1">
          <Pressable
            onPress={onLogout}
            className="border rounded-3xl border-primary px-6 py-2"
          >
            <SubHeading className="text-primary">Log out</SubHeading>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
