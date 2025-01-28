import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";

const index = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="px-5">
          <View className="flex flex-row items-center justify-between mt-5">
            <View className="flex flex-row items-center">
              <Image source={images.avatar} className="size-12 rounded-full" />
              <View className="flex flex-col items-start justify-center ml-2">
                <Text className="text-sm font-rubikLight">Welcome back,</Text>
                <Text className="text-md font-rubikMedium">John Doe</Text>
              </View>
            </View>
            <TouchableOpacity className="">
              <Image source={icons.bell} className="size-6" />
            </TouchableOpacity>
          </View>

          <Search />
          <View className="mt-5">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubikBold">Featured</Text>
              <TouchableOpacity className="flex flex-row items-center justify-center">
                <Text className="text-md font-rubikBold text-primary-default">
                  See all
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row gap-5 mt-5">
            <FeaturedCard />
            <FeaturedCard />
            {/* <Card /> */}
          </View>
          <View className="mt-5">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubikBold">Recommendations</Text>
              <TouchableOpacity className="flex flex-row items-center justify-center">
                <Text className="text-md font-rubikBold text-primary-default">
                  See all
                </Text>
              </TouchableOpacity>
            </View>
            <Filters />
          </View>
          <View className="flex flex-row gap-5 mt-5 mb-20">
            <Card />
            <Card />
            {/* <Card /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
