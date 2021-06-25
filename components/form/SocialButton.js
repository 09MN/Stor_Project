import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../../utils/Dimentions";

const FormButton = ({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  ...rest
}) => {
  let bgcolor = backgroundColor;
  return (
    <TouchableOpacity style={{ backgroundColor: bgcolor }} {...rest}>
      <View style={styles.iconWrapper}>
        <Icon name={btnType} style={styles.icon} size={22} color={color} />
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={(styles.buttonText, { color: color })}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontWeight: "bold",
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FormButton;
