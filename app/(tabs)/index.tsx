import MovieCard from "@/components/MovieCard";
import SearchInput from "@/components/SearchInput";
import Title from "@/components/Title";
import { API_KEY, BASE_URL } from "@/contants";
import { useMovieStore } from "@/store/movieStore";
import { useRouter } from "expo-router";

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

const HomeScreen = () => {
  const { movies, setMovies, isLoading, setIsLoading } = useMovieStore();
  const [searchText, setSearchText] = useState<string>("");
  const router = useRouter();

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      const fetchSearchResults = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchText}&language=en-US`
          );
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.error("Error searching movies:", error);
        }
      };
      fetchSearchResults();
    } else {
      fetchMovies();
    }
  }, [searchText]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Title text="Home" />
        <SearchInput
          searchText={searchText}
          setSearchText={setSearchText}
          placeholderText="Search movies..."
        />
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard item={item} />}
          contentContainerStyle={{ paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },

  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
