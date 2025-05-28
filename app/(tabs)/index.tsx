import Title from "@/components/Title";
import { API_KEY, BASE_URL } from "@/contants";

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const HomeScreen = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  console.log("Movies fetched:", movies);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Title text="Home" />
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search movies..."
          style={styles.input}
          placeholderTextColor="#595d61"
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
  input: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 16,
    padding: 12,
    borderWidth: 0.5,
    borderColor: "#595d61",
    borderRadius: 8,
    fontSize: 16,
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
