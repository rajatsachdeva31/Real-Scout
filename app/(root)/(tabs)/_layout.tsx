import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => (
  <View className="mt-4 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#0284C7" : "#8C8E98"}
      resizeMode="contain"
      className="size-6"
    />
    <Text
      className={` ${
        focused
          ? "text-primary-default font-rubikMedium"
          : "text-secondary-light font-rubik"
      } mt-1 w-full text-center text-xs`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          minHeight: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <TabIcon focused={focused} icon={icons.home} title="Home" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <TabIcon focused={focused} icon={icons.search} title="Explore" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <TabIcon focused={focused} icon={icons.person} title="Profile" />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
