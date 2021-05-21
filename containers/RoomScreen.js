import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";

//ICONS
import { AntDesign } from "@expo/vector-icons";

//MAPS
import MapView, { Callout } from "react-native-maps";

// COMPONENTS
import ImagePrice from "../components/ImagePrice";
import TitleRating from "../components/TitleRating";
import ImageBackground from "react-native/Libraries/Image/ImageBackground";

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
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
          latitude: 48.856614,
          longitude: 2.3522219,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
          title={data.title}
          description={data.description}
        >
          {/* <Callout>
            <Text style={{ width: 100, height: 100 }}>
              <Image
                source={{ uri: data.photos[0].url }}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
            </Text>
          </Callout> */}
        </MapView.Marker>
      </MapView>
    </View>
  );
};

export default Room;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1 },
  infos: { paddingHorizontal: 20 },
  moreLess: { color: "#888", fontSize: 12, paddingVertical: 8 },
});
