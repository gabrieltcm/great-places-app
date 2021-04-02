import React from "react";
//React Navigation Header Buttons
import { HeaderButton } from "react-navigation-header-buttons";
//Ionicons
import { Ionicons } from "@expo/vector-icons";

//Constant Colors
import Colors from "../constants/Colors";
import { Platform } from "react-native";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

export default CustomHeaderButton;
