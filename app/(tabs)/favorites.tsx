import Title from "@/components/Title";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Title text="Favorites" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
