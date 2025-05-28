import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type MovieCardProps = {
  title: string;
  posterPath: string;
  releaseDate: string;
};

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  posterPath,
  releaseDate,
}) => {
  const releaseYear = new Date(releaseDate).getFullYear();
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>
        {title} ({releaseYear})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    color: "#333",
  },
});

export default MovieCard;
