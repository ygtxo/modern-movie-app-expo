import RatingStars from "@/components/RatingStars";
import Title from "@/components/Title";
import { API_KEY, BASE_URL } from "@/contants";
import { useRouter } from "expo-router";

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
      setLoading(false);
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

  if (loading) {
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
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search movies..."
          style={styles.input}
          placeholderTextColor="#595d61"
        />
        <FlatList
          data={movies}
          style={{
            padding: 10,
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/movie/[id]",
                  params: { id: item.id.toString() },
                });
              }}
              style={{
                flexDirection: "row",
                gap: 20,
                padding: 20,
                marginBottom: 10,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: "#595d61",
              }}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={{ width: 100, height: 150, borderRadius: 8 }}
                resizeMode="cover"
              />
              <View
                style={{
                  flexDirection: "column",
                  gap: 8,
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    width: 200,
                    gap: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text>{new Date(item.release_date).getFullYear()}</Text>
                  <Text
                    style={{ color: "#595d61", width: 200, marginVertical: 10 }}
                  >
                    {item.overview.length > 50
                      ? `${item.overview.substring(0, 50)}...`
                      : item.overview}
                  </Text>
                </View>
                <RatingStars vote={item.vote_average} />
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
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
  input: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 16,
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: "#595d61",
    borderRadius: 8,
    fontSize: 14,
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
