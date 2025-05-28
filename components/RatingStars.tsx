import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";

const RatingStars = ({ vote }: { vote: number }) => {
  const stars = Math.round(vote);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {[...Array(stars)].map((_, index) => (
        <FontAwesome key={index} name="star" size={16} color="gold" />
      ))}
      <Text style={{ marginLeft: 4 }}>({vote.toFixed(1)})</Text>
    </View>
  );
};

export default RatingStars;
