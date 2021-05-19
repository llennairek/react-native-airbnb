import React from "react";
import { Image } from "react-native";

const LogoTitle = () => {
  return (
    <Image
      source={require("../assets/logo-big.png")}
      style={{ height: 40, width: 40, alignSelf: "center" }}
    />
  );
};

export default LogoTitle;
