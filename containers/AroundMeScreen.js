import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import MapView from "react-native-maps";

// import * as Location from "expo-location";
import * as Location from "expo-location";
import axios from "axios";

const AroundMeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [coords, setCoords] = useState(null);

  const fetchdata = async ({ latitude, longitude }) => {
    try {
      if (latitude && longitude) {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around?longitude=${longitude}&latitude=${latitude}`
        );

        setData(response.data);
      } else {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around`
        );
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Ask user to give location permissions
  const askPermission = async () => {
    setIsLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      //the true command to get the useposition
      // const location = await Location.getCurrentPositionAsync();

      //fake coords to simulate that we are in the center of Paris to seen annouces around
      const location = {
        coords: { latitude: "48.8498514", longitude: "2.2841681" },
      };
      setCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        // latitude: "48.8498514",
        // longitude: "2.2841681",
      });
      fetchdata({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setError(false);
      setIsLoading(false);
    } else {
      fetchdata({ latitude: null, longitude: null });
      setCoords({ latitude: 48.8534, longitude: 2.3488 });
      // setError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="purple" style={{ marginTop: 100 }} />
  ) : error ? (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
        paddingTop: 150,
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontSize: 16 }}>
        If you want to visualize the map, please grant access to location
      </Text>
      <TouchableOpacity
        onPress={askPermission}
        style={{
          marginTop: 150,
          backgroundColor: "#F06B73",
          paddingHorizontal: 25,
          paddingVertical: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff" }}>Click there to grant access</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 50, fontSize: 12 }}>
        If the button does not trigger the permission , please go to your phone
        settings and grant acess to location for this app
      </Text>
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
          latitude: Number(coords.latitude) || 48.8534,
          longitude: Number(coords.longitude) || 2.3488,
        }}
        showsUserLocation={true}
      >
        {data &&
          data.map((item, index) => (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: item.location[1],
                longitude: item.location[0],
              }}
              title={item.title}
              description={item.description}
            />
          ))}
      </MapView>
    </View>
  );
};

export default AroundMeScreen;

const styles = StyleSheet.create({});
