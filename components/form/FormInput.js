import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const FormInput = ({ labelValue, placeHolderText, iconType, ...rest }) => {
  return (
    <View>
      <View></View>
      <TextInput
        value={labelValue}
        placeholder={placeHolderText}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

export default FormInput;
