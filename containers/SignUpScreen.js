import React from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome } from "@expo/vector-icons";

import Constants from "expo-constants";
import { useState } from "react";
import axios from "axios";

export default function SignUpScreen({ navigation, setToken, setUserId }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleEye = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmEye = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignup = async () => {
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        const requestObject = {
          email,
          username,
          description,
          password,
        };
        setIsLoading(true);
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            requestObject
          );
          if (response.status === 200) {
            setToken(response.data.token, response.data.id);
            setUserId(response.data.id);
            setIsLoading(false);
          }
        } catch (error) {
          setIsLoading(false);
          setError(true);
          setErrorMessage(error.response.data.error);
        }
      } else {
        setError(true);
        setErrorMessage("Passwords must be the same");
      }
    } else {
      setError(true);
      setErrorMessage("You must fill each field.");
    }
  };

  return !isLoading ? (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo-big.png")} style={styles.logo} />
      </View>
      <Text style={styles.title}>Sign up</Text>
      <View style={styles.inputsContainer}>
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(entry) => setEmail(entry)}
          style={styles.input}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Username"
          onChangeText={(entry) => setUsername(entry)}
          style={styles.input}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Describe yourself in a few words..."
          onChangeText={(entry) => setDescription(entry)}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          style={styles.textArea}
        />
        <View style={styles.passwordWrapper}>
          <TextInput
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry={showPassword ? false : true}
            onChangeText={(entry) => setPassword(entry)}
            style={styles.password}
          />
          {showPassword ? (
            <FontAwesome
              name="eye-slash"
              size={24}
              color="black"
              onPress={handleEye}
            />
          ) : (
            <FontAwesome
              name="eye"
              size={24}
              color="black"
              style={styles.eye}
              onPress={handleEye}
            />
          )}
        </View>
        <View style={styles.passwordWrapper}>
          <TextInput
            autoCapitalize="none"
            placeholder="Confirm Password"
            secureTextEntry={showConfirmPassword ? false : true}
            onChangeText={(entry) => setConfirmPassword(entry)}
            style={styles.password}
          />
          {showConfirmPassword ? (
            <FontAwesome
              name="eye-slash"
              size={24}
              color="black"
              onPress={handleConfirmEye}
            />
          ) : (
            <FontAwesome
              name="eye"
              size={24}
              color="black"
              style={styles.eye}
              onPress={handleConfirmEye}
            />
          )}
        </View>

        <View style={styles.signContainer}>
          {error && <Text style={styles.error}>{errorMessage}</Text>}
          <TouchableOpacity style={styles.btn} onPress={handleSignup}>
            <Text style={styles.btnText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.grey}>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  ) : (
    <ActivityIndicator size="large" color="purple" style={{ marginTop: 300 }} />
  );
}

const styles = StyleSheet.create({
  grey: { color: "#888" },
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 30,
  },
  logoContainer: { alignItems: "center" },
  logo: { height: 100, width: 100 },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
    color: "#888",
  },
  inputsContainer: {
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderBottomColor: "#FFDBDE",
    borderBottomWidth: 2,
    height: 30,
    padding: 0,
    marginBottom: 20,
  },
  textArea: {
    borderColor: "#FFDBDE",
    borderWidth: 2,
    padding: 6,
    width: "100%",
    alignItems: "flex-start",
    marginVertical: 20,
  },
  signContainer: { marginTop: 30 },
  error: { color: "red", textAlign: "center" },
  btn: {
    borderColor: "#EB5A62",
    borderWidth: 3,
    paddingHorizontal: 75,
    paddingVertical: 15,
    borderRadius: 50,
    marginVertical: 15,
  },
  btnText: { color: "#888", fontSize: 20, fontWeight: "bold" },
  passwordWrapper: {
    borderBottomColor: "#FFDBDE",
    borderBottomWidth: 2,
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
  },
  password: { flex: 1, borderBottomWidth: 0, height: 24, marginTop: 10 },
});
