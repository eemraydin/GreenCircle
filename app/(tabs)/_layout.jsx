import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

import BackButton from "../../components/buttons/BackButton";
import Text from "../../components/texts/Text";
import Home from "../../assets/icons/iconsActive/home.svg";
import Browse from "../../assets/icons/iconsActive/browse.svg";
import Create from "../../assets/icons/iconsActive/create.svg";
import Achievement from "../../assets/icons/iconsActive/achievement.svg";
import Profile from "../../assets/icons/iconsActive/profileTab.svg";

import HomeInactive from "../../assets/icons/iconsInactive/homeInactive.svg";
import BrowseInactive from "../../assets/icons/iconsInactive/browseInactive.svg";
import CreateInactive from "../../assets/icons/iconsInactive/createInactive.svg";
import AchievementInactive from "../../assets/icons/iconsInactive/achievementInactive.svg";
import ProfileInactive from "../../assets/icons/iconsInactive/profileInactive.svg";

import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true);

const tabScreenOptions = (
  title,
  tabName,
  activeIcon,
  inactiveIcon,
  showHeader
) => {
  return {
    title: title,
    headerShown: showHeader,
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: "#007e4c",
    },
    headerTintColor: "#FFFFFF",

    tabBarIcon: ({ color, focused }) => (
      <TabIcon
        activeIcon={activeIcon}
        inactiveIcon={inactiveIcon}
        color={color}
        name={tabName}
        focused={focused}
      />
    ),
    headerLeft: () => {
      return showHeader && <BackButton />;
    },
    headerLeftContainerStyle: {
      paddingLeft: 16,
    },
    headerRightContainerStyle: {
      paddingRight: 16,
    },
  };
};

const TabIcon = ({ activeIcon, inactiveIcon, color, name, focused }) => {
  return (
    <View style={{ alignItems: "center" }}>
      {focused ? activeIcon : inactiveIcon}
      <Text style={{ color: color, fontSize: 11 }}>{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#005435",
          tabBarInactiveTintColor: "#6D6D6D",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#D3DBD8",
            borderTopWidth: 1,
            paddingTop: 12,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={tabScreenOptions(
            "Home",
            "Home",
            <Home width={20} height={20} />,
            <HomeInactive width={20} height={20} />,
            false
          )}
        />

        <Tabs.Screen
          name="browse"
          options={tabScreenOptions(
            "Browse Events",
            "Browse",
            <Browse width={20} height={20} />,
            <BrowseInactive width={20} height={20} />,
            false
          )}
        />
        <Tabs.Screen
          name="create"
          options={tabScreenOptions(
            "Create Event",
            "Create",
            <Create width={20} height={20} />,
            <CreateInactive width={20} height={20} />,
            true
          )}
        />
        <Tabs.Screen
          name="achievement"
          options={tabScreenOptions(
            "Achievements",
            "Achievements",
            <Achievement width={20} height={20} />,
            <AchievementInactive width={20} height={20} />,
            true
          )}
        />
        <Tabs.Screen
          name="profile"
          options={tabScreenOptions(
            "Profile",
            "Profile",
            <Profile width={20} height={20} />,
            <ProfileInactive width={20} height={20} />,
            true
          )}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
