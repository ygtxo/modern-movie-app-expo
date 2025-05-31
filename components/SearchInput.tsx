import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const SearchInput = ({
  searchText,
  setSearchText,
  placeholderText,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
  placeholderText: string;
}) => {
  return (
    <View>
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder={placeholderText}
        style={styles.input}
        placeholderTextColor="#595d61"
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
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
});
