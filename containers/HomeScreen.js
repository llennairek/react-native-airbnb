import React from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";

import Constants from "expo-constants";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

import Card from "../components/Card";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

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
  flatListContainer: {},
  card: {
    width: "100%",
  },
  text: {
    color: "red",
    fontSize: 16,
    zIndex: 10,
  },
});
