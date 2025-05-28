import { API_KEY, BASE_URL, Movie } from "@/contants";
import { useMovieStore } from "@/store/movieStore";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Page = () => {
  const { id: movieID } = useLocalSearchParams();
  const { movie, setMovie } = useMovieStore();
  const router = useRouter();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();

        const foundMovie = data.results.find(
          (m: Movie) => m.id === Number(movieID)
        );

        setMovie(foundMovie);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [movieID]);

  if (!movie) {
    return (
      <View style={styles.movieDetailContainer}>
        <Text>Movie not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.movieDetailContainer}>
      <Stack.Screen
        options={{
          title: movie.title,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              style={{ padding: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.imageWrapper}>
        <Image
          style={styles.movieImage}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            // if (addedToFavorites) {
            //   setAddedToFavorites(false);
            // } else {
            //   setAddedToFavorites(true);
            // }
          }}
          style={styles.favoriteButton}
        >
          <Ionicons
            name="heart"
            // name={addedToFavorites ? "heart" : "heart-outline"}
            size={30}
            color="red"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.movieOverview}>{movie.overview}</Text>

      <View style={styles.descriptionDetail}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Rating:</Text>
          <Text style={styles.ratingValue}>
            {Math.round(movie.vote_average)} ⭐
          </Text>
        </View>
        <Text style={styles.date}>
          {new Date(movie.release_date)
            .toLocaleDateString("en-GB")
            .split("/")
            .reverse()
            .join(".")}
        </Text>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  movieDetailContainer: {
    flex: 1,
    gap: 20,
    padding: 30,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  imageWrapper: {
    position: "relative",
  },
  movieImage: {
    height: 350,
    width: 450,
    resizeMode: "contain",
  },
  favoriteButton: {
    position: "absolute",
    top: 0,
    right: 60,
  },
  movieOverview: {
    textAlign: "left",
    fontSize: 16,
    color: "#595d61",
  },
  descriptionDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginRight: "auto",
  },
  ratingLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  ratingValue: {
    fontSize: 15,
  },
  date: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#595d61",
  },
});
