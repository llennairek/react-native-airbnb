import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const TitleRating = ({ data }) => {
  const rating = (numberOfStars) => {
    const array = [];
    for (let i = 1; i <= numberOfStars; i++) {
      array.push(<FontAwesome name="star" size={16} color="#FFB203" />);
    }
    while (array.length < 5) {
      array.push(<FontAwesome name="star" size={16} color="#ccc" />);
    }
    return array;
  };

  return (
    <View style={styles.infos}>
      <View style={styles.titleRatingwrapper}>
        <Text style={styles.title} numberOfLines={1}>
          {data.title}
        </Text>
        <View style={styles.ratingWrapper}>
          <FlatList
            style={{
              flexGrow: 0,
              marginRight: 10,
            }}
            horizontal={true}
            data={rating(data.ratingValue)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <View style={styles.star}>{item}</View>}
          />
          <Text style={styles.ratingText}>{data.reviews} reviews</Text>
        </View>
      </View>
      <View>
        <Image
          source={{ uri: data.user.account.photo.url }}
          style={styles.avatar}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default TitleRating;

const styles = StyleSheet.create({
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
