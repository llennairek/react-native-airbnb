import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Image,
  Dimensions,
} from "react-native";

import { SwiperFlatList } from "react-native-swiper-flatlist";

const ImagePrice = ({ data }) => {
  return (
    <View>
      <SwiperFlatList
        data={data.photos}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.url }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      />
      <Text style={styles.absolute}>{data.price} €</Text>
    </View>
    // </ImageBackground>
  );
};

export default ImagePrice;

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  image: { height: 175, width: width },
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
});
