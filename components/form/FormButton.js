import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../../utils/Dimentions";

const FormButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity {...rest}>
      <Text>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;
