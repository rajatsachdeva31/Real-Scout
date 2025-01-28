import {
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React from "react";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";

interface SettingItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingItemProps) => {
  return (
    <TouchableOpacity
      className="flex flex-row items-center justify-between py-3 px-2"
      onPress={onPress}
    >
      <View className="flex flex-row items-center gap-3">
        <Image source={icon} className="size-6" />
        <Text className={`text-lg font-rubikMedium ${textStyle}`}>{title}</Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className="size-4" />}
    </TouchableOpacity>
  );
};

const profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "Failed to log out");
    }
  };
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-5"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubikBold">Profile</Text>
          <Image source={icons.bell} className="size-6" />
        </View>
        <View className="flex flex-row items-center justify-center mt-5">
          <View className="flex flex-col items-center relative">
            <Image
              source={{ uri: user?.avatar }}
              className="size-40 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-10 right-5">
              <Image
                source={icons.edit}
                className="size-8"
                tintColor="#0284C7"
              />
            </TouchableOpacity>
            <Text className="text-2xl font-rubikBold mt-2">{user?.name}</Text>
          </View>
        </View>
        <View className="flex flex-col justify-center mt-5">
          <SettingItem icon={icons.calendar} title="My Bookings" />
          <SettingItem icon={icons.wallet} title="Payments" />
        </View>
        <View className="flex flex-col justify-center mt-4 pt-2 border-t border-primary-medium">
          {settings.slice(2).map((item, index) => (
            <SettingItem key={index} {...item} />
          ))}
        </View>
        <View className="flex flex-col justify-center mt-4 pt-2 border-t border-primary-medium">
          <SettingItem
            icon={icons.logout}
            title="Logout"
            onPress={handleLogout}
            textStyle="text-danger"
            showArrow={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
