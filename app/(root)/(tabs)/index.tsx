import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <View>
      <Text className="font-bold font-rubik text-4xl my-10">Welcome to RealScout</Text>
      <Link href={"/sign-in"}>SignIn</Link>
      <Link href={"/explore"}>SignIn</Link>
      <Link href={"/profile"}>SignIn</Link>
      <Link href={"/properties/1"}>SignIn</Link>
    </View>
  );
};

export default index;
