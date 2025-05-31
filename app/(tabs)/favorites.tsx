import FavoriteCard from "@/components/FavoriteCard";
import SearchInput from "@/components/SearchInput";
import Title from "@/components/Title";
import { useMovieStore } from "@/store/movieStore";
import { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";

const FavoritesScreen = () => {
  const { favorites } = useMovieStore();
  const [searchText, setSearchText] = useState<string>("");

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Title text="Favorites" />
        <SearchInput
          searchText={searchText}
          setSearchText={setSearchText}
          placeholderText="Search favorites..."
        />

        <FlatList
          data={favorites}
          renderItem={({ item }) => {
            return <FavoriteCard favorite={item} />;
          }}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 100,
            flexDirection: "column",
            gap: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

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
  favoriteButton: { padding: 10 },
});

export default FavoritesScreen;
