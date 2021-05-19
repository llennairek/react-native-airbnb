import React from "react";
import { useNavigation } from "@react-navigation/core";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  Button,
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";

import Constants from "expo-constants";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

import Card from "../components/Card";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const tabBarHeight = useBottomTabBarHeight();
  console.log(tabBarHeight);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* <View style={styles.logoWrapper}>
        <Image source={require("../assets/logo-big.png")} style={styles.logo} />
      </View> */}

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="purple"
          style={{ marginTop: 100 }}
        />
      ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Card item={item} />}
          />
        </View>
      )}
      {/* <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    width: "100%",
    backgroundColor: "#fff",
  },
  logoWrapper: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  // logo: { height: 40, width: 40, alignSelf: "center" },
  flatListContainer: {},
  card: {
    width: "100%",
    // borderColor: "red",
    // borderWidth: 5,
    // height: 200,
    // marginBottom: 150,
  },
  text: {
    color: "red",
    fontSize: 16,
    zIndex: 10,
  },
});
