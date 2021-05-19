import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

// COMPONENTS
import ImagePrice from "../components/ImagePrice";
import TitleRating from "../components/TitleRating";

const Room = ({ route }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [moreLess, setMoreLess] = useState("more");

  const moreOrLess = () => {
    if (moreLess === "more") {
      setMoreLess("less");
    } else {
      setMoreLess("more");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="purple" style={{ marginTop: 100 }} />
  ) : (
    <View style={styles.container}>
      <ImagePrice data={data} />
      <View style={styles.infos}>
        <TitleRating data={data} />
        <Text
          numberOfLines={moreLess === "more" ? 3 : 0}
          style={{ marginTop: 10 }}
        >
          {data.description}
        </Text>
        <Text style={styles.moreLess} onPress={moreOrLess}>
          Show {moreLess}{" "}
          {moreLess === "more" ? (
            <AntDesign name="caretdown" size={12} color="#888" />
          ) : (
            <AntDesign name="caretup" size={12} color="#888" />
          )}
        </Text>
      </View>
    </View>
  );
};

export default Room;

const styles = StyleSheet.create({
  infos: { paddingHorizontal: 20 },
  moreLess: { color: "#888", fontSize: 12, paddingVertical: 8 },
});
