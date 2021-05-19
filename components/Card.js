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

// COMPONENTS
import ImagePrice from "../components/ImagePrice";
import TitleRating from "./TitleRating";

const Card = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.cradWrapper}
      onPress={() => navigation.navigate("Room", { id: item._id })}
    >
      <ImagePrice data={item} />
      <TitleRating data={item} />
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
});
