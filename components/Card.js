import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

const Card = ({ item }) => {
  const navigation = useNavigation();

  const rating = (numberOfStars) => {
    const array = [];
    for (let i = 1; i < numberOfStars; i++) {
      array.push(<FontAwesome name="star" size={16} color="#FFB203" />);
    }
    while (array.length < 5) {
      array.push(<FontAwesome name="star" size={16} color="#ccc" />);
    }
    return array;
  };

  return (
    <TouchableOpacity
      style={styles.cradWrapper}
      onPress={() => console.log("coucou")}
    >
      <ImageBackground
        source={{ uri: item.photos[0].url }}
        style={styles.image}
        resizeMode="cover"
      >
        <Text style={styles.absolute}>{item.price} €</Text>
      </ImageBackground>
      <View style={styles.infos}>
        <View style={styles.titleRatingwrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.ratingWrapper}>
            <FlatList
              style={{
                flexGrow: 0,
                marginRight: 10,
              }}
              horizontal={true}
              data={rating(item.ratingValue)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <View style={styles.star}>{item}</View>}
            />
            <Text style={styles.ratingText}>{item.reviews} reviews</Text>
          </View>
        </View>
        <View>
          <Image
            source={{ uri: item.user.account.photo.url }}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  cradWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  image: { height: 175, width: "100%" },
  absolute: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "black",
    fontSize: 18,
    fontWeight: "normal",
    color: "#ccc",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  infos: { flexDirection: "row", paddingTop: 10 },
  titleRatingwrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: { fontWeight: "700", fontSize: 16 },
  avatar: { width: 70, height: 70, borderRadius: 50, marginLeft: 10 },
  ratingWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    alignItems: "center",
  },
  // rating: { flexDirection: "row", borderColor: "red", borderWidth: 1 },
  star: { marginHorizontal: 3 },
  ratingText: {
    color: "#aaa",
    fontSize: 13,
    flex: 1,
  },
});
