import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Title = ({ text }: { text: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
