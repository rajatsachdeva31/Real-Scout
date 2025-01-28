import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debounceSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
  };
  return (
    <View className="w-full flex flex-row items-center justify-between rounded-lg border border-primary-light bg-accent mt-5">
      <View className="flex flex-1 flex-row items-center justify-start z-50 p-2">
        <Image source={icons.search} className="size-6" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          className="text-sm font-rubik ml-2 flex-1"
          placeholder="Search"
        />

        <TouchableOpacity>
          <Image source={icons.filter} className="size-6" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;
