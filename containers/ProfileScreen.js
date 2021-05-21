import React from "react";
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ userToken, setToken, userId }) {
  const [userInfos, setUserInfos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);

  console.log(userInfos);

  const getPermissionGaleryAddPhoto = async () => {
    try {
      const libraryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      // console.log(libraryPermission);
      if (libraryPermission.status === "granted") {
        const result = await ImagePicker.launchImageLibraryAsync();
        console.log(result);
        if (!result.cancelled) {
          setImage(result.uri);
        }
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getPermissionCameraAddPhoto = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    console.log(cameraPermission);
    if (cameraPermission.status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  const sendPicture = async (uri) => {
    console.log(uri);
    const urlArray = uri.split(".");

    const formData = new FormData();
    formData.append("photo", {
      uri: uri,
      name: "avatar",
      type: `image/${urlArray.pop()}`,
    });

    const response = await axios.put(
      "https://express-airbnb-api.herokuapp.com/user/upload_picture",
      formData,
      { headers: { authorization: `Bearer ${userToken}` } }
    );

    console.log(response.data);
  };

  const handleUpdate = async () => {
    try {
      sendPicture(image);
      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/update",
        {
          email: userInfos.email,
          description: userInfos.description,
          username: userInfos.username,
        },
        { headers: { authorization: `Bearer ${userToken}` } }
      );

      if (response.status === 200) {
        alert("informations updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          { headers: { authorization: `Bearer ${userToken}` } }
        );
        console.log(response.data);
        if (response.data.photo) {
          setImage(response.data.photo[0].url);
        }
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
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 150, height: 150, borderRadius: 100 }}
            resizeMode="cover"
          />
        ) : (
          <FontAwesome
            name="user"
            size={100}
            color="#eeeeee"
            style={{ zIndex: 0 }}
          />
        )}
      </View>
      <View style={styles.absolute}>
        <TouchableHighlight onPress={getPermissionGaleryAddPhoto}>
          <MaterialIcons name="photo-library" size={32} color="#888" />
        </TouchableHighlight>
        <TouchableHighlight onPress={getPermissionCameraAddPhoto}>
          <FontAwesome name="camera" size={32} color="#888" />
        </TouchableHighlight>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.formInput}
          value={userInfos.email}
          onChangeText={(text) => setUserInfos({ ...userInfos, email: text })}
        />
        <TextInput
          style={styles.formInput}
          value={userInfos.username}
          onChangeText={(text) =>
            setUserInfos({ ...userInfos, username: text })
          }
        />
        <TextInput
          style={styles.formTextArea}
          multiline={true}
          numberOfLines={5}
          value={userInfos.description}
          textAlignVertical="top"
          onChangeText={(text) =>
            setUserInfos({ ...userInfos, description: text })
          }
        />
      </View>
      <TouchableOpacity onPress={handleUpdate} style={styles.btn}>
        <Text style={styles.btnText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#ececec" }]}
        onPress={() => {
          setToken(null);
        }}
      >
        <Text style={styles.btnText}>Log Out</Text>
      </TouchableOpacity>
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
    right: 60,
    top: 50,
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
    flex: 15,
    zIndex: 1,
    // backgroundColor: "red",
  },
  btnPicture: {
    zIndex: 1,
    width: "100%",
    // height: 30,
  },
  form: { paddingHorizontal: 50 },
  formInput: {
    borderBottomColor: "#EB5A62",
    borderBottomWidth: 1,
    marginTop: 20,
    padding: 5,
  },
  formTextArea: {
    borderColor: "#EB5A62",
    borderWidth: 1,
    marginTop: 30,
    padding: 5,
  },
  btn: {
    borderColor: "#EB5A62",
    borderWidth: 3,
    paddingHorizontal: 75,
    paddingVertical: 15,
    borderRadius: 50,
    marginVertical: 15,
    width: 250,
    alignSelf: "center",
  },
  btnText: {
    color: "#888",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
