import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

interface Props {
  onPress?: () => void;
}

export const Card = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70"
    >
      <Image source={images.japan} className="rounded-lg w-full h-40" />
      <View className="flex flex-row items-center absolute bg-white/90 px-2 py-1.5 top-5 right-5 p-1 z-50 rounded-full">
        <Image source={icons.star} className="size-3" />
        <Text className="text-xs ml-1 font-rubikSemiBold text-primary-default">
          4.5
        </Text>
      </View>
      <View className="flex flex-col mt-2">
        <Text className="text-base font-rubikBold text-secondary-default">
          Modern Apartment
        </Text>
        <Text className="text-xs font-rubik text-secondary-default">
          Tokyo, Japan
        </Text>
        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubikBold text-primary-default">$2500</Text>
          <Image source={icons.heart} className="size-5" tintColor="#191D31" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start rounded-lg w-60 h-80 relative"
    >
      <Image source={images.japan} className="rounded-3xl size-full" />
      <Image
        source={images.cardGradient}
        className="rounded-3xl size-full absolute bottom-0"
      />
      <View className="flex flex-row items-center absolute bg-white/90 px-3 py-1.5 top-4 right-4 rounded-full">
        <Image source={icons.star} className="size-4" />
        <Text className="text-sm ml-1 font-rubikSemiBold text-primary-default">
          4.5
        </Text>
      </View>
      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text className="text-xl font-rubikBold text-white" numberOfLines={1}>
          Modern Apartment
        </Text>
        <Text className="text-base font-rubikMedium text-white/80">
          Tokyo, Japan
        </Text>
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubikBold text-white">$2500</Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
