import { Movie } from "@/contants";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RatingStars from "./RatingStars";

const MovieCard = ({ item }: { item: Movie }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/movie/[id]",
          params: { id: item.id.toString() },
        });
      }}
      style={styles.container}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.movieDetailContainer}>
        <View
          style={{
            flexDirection: "column",
            width: 200,
            gap: 4,
          }}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text>{new Date(item.release_date).getFullYear()}</Text>
          <Text style={styles.description}>
            {item.overview.length > 50
              ? `${item.overview.substring(0, 50)}...`
              : item.overview}
          </Text>
        </View>
        <RatingStars vote={item.vote_average} />
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    padding: 20,
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#595d61",
  },
  image: { width: 100, height: 150, borderRadius: 8 },
  movieDetailContainer: {
    flexDirection: "column",
    gap: 8,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: { color: "#595d61", width: 200, marginVertical: 10 },
});
