import { useMovieStore } from "@/store/movieStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FavoriteCard = ({
  favorite,
}: {
  favorite: {
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
  };
}) => {
  const { favorites, setFavorites } = useMovieStore();

  const handleRemoveFavorite = () => {
    setFavorites(favorites.filter((fav) => fav.title !== favorite.title));
  };

  if (!favorite) {
    return (
      <View style={{ padding: 20 }}>
        <Text>
          No favorite movies found. Please add some to your favorites list.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${favorite?.poster_path}`,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{favorite?.title}</Text>
        <Text>{new Date(favorite?.release_date).getFullYear()}</Text>
        <Text style={styles.description}>
          {favorite?.overview.length > 50
            ? `${favorite?.overview.substring(0, 50)}...`
            : favorite?.overview}
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleRemoveFavorite}
        style={styles.favoriteButton}
      >
        <Ionicons name="heart" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteCard;

const styles = StyleSheet.create({
  favoritesContainer: { padding: 20, flexDirection: "column", gap: 10 },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%",
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    shadowColor: "#000",
  },
  image: {
    width: 90,
    height: 120,
    backgroundColor: "red",
    borderRadius: 12,
  },
  cardİnfos: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    height: 120,
    gap: 4,
    width: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  description: {
    color: "#595d61",
    marginVertical: 10,
  },
  favoriteButton: { padding: 10 },
});
