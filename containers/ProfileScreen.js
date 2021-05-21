import React from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen({ userToken, setToken, userId }) {
  const [userInfos, setUserInfos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getPermissionGaleryAddPhoto = () => {
    console.log("galery");
  };
  const getPermissionCameraAddPhoto = () => {
    console.log("camera");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          { headers: { authorization: `Bearer ${userToken}` } }
        );
        console.log(response.data);
        setUserInfos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="purple" style={{ marginTop: 150 }} />
  ) : (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <FontAwesome
          name="user"
          size={100}
          color="#eeeeee"
          style={{ zIndex: 0 }}
        />
        <View style={styles.absolute}>
          <View style={styles.btn}>
            <TouchableHighlight onPress={getPermissionGaleryAddPhoto}>
              <MaterialIcons name="photo-library" size={26} color="black" />
            </TouchableHighlight>
          </View>
          {/* <TouchableHighlight
            style={styles.btn}
            onPress={getPermissionCameraAddPhoto}
          >
            <FontAwesome name="camera" size={26} color="black" />
          </TouchableHighlight> */}
        </View>
      </View>
      <Text>user id : {userId}</Text>
      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  photoContainer: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 25,
    borderRadius: 100,
    borderColor: "#EB5A62",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    color: "#aaa",
    zIndex: 1,
  },
  absolute: {
    position: "absolute",
    right: -50,
    height: 90,
    justifyContent: "space-between",
    zIndex: 1,
    flex: 15,
    zIndex: 1,
  },
  btn: {
    zIndex: 1,
    width: "100%",
    height: 30,
  },
});
