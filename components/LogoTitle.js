import React from "react";
import { Image, View } from "react-native";

const LogoTitle = () => {
  return (
    <View>
      <Image
        source={require("../assets/logo-big.png")}
        style={{ height: 40, width: 40 }}
      />
    </View>
  );
};

export default LogoTitle;
