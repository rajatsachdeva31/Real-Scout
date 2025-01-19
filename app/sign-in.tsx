import {
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

const SignIn = () => {
  const handleLogin = () => {};

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-lg font-rubik text-center text-secondary-medium uppercase tracking-wider">
            Welcome To RealScout
          </Text>
          <Text className="mt-2 text-4xl font-rubikBold text-center text-secondary-default">
            Let's Get You Closer{"\n"}To
            <Text className="text-primary-default"> Your Dream Home</Text>
          </Text>
          <Text className="mt-8 text-lg text-center text-secondary-medium">
            Login to RealScout with Google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className="mt-4 bg-white rounded-full w-full py-4 shadow-md shadow-gray-200 flex flex-row items-center justify-center gap-2"
          >
            <Image
              source={icons.google}
              className="w-5 h-5"
              resizeMode="contain"
            />
            <Text className="text-lg text-center text-secondary-default font-rubikMedium">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
