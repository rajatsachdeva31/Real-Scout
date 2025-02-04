import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search";
import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getProperties } from "@/lib/appwrite";
import NoResults from "@/components/NoResults";
import icons from "@/constants/icons";

const expolre = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 10,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 10,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 70 }}
        columnWrapperClassName="flex gap-5 px-5 pb-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size={"large"}
              className="text-primary-default"
            />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity onPress={() => router.back()} className="rounded-full size-10 flex flex-row items-center justify-center bg-primary-medium">
                <Image source={icons.backArrow} className="size-6"/>
              </TouchableOpacity>
              <Text className="text-base font-rubikMedium text-primary-default mr-4">
                Search for your Ideal Home
              </Text>
              <Image source={icons.bell} className="size-6"/>
            </View>
            <Search />
            <View>
              <Filters />
              <Text className="my-2 text-lg font-rubikBold">
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default expolre;
