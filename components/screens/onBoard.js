import * as React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const data = [
  {
    key: 1,
    title: "STOR",
    text: " ",
    image: require("../../assets/images/imgOnBoard/baru logo.png"),
  },
  {
    key: 2,
    title: "READY TO LEARN MORE TODAY",
    text: " ",
    image: require("../../assets/images/imgOnBoard/imgOnBoard2.png"),
  },
  {
    key: 3,
    title: "STUDY TOGETHER WITH ME",
    text: " ",
    image: require("../../assets/images/imgOnBoard/imgOnBoard3.png"),
  },
  {
    key: 4,
    title: " ",
    text: " ",
    image: require("../../assets/images/imgOnBoard/imgOnBoard1.png"),
  },
];

function onBoard({ navigation }) {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        {item.key == 4 && (
          <TouchableOpacity
            style={styles.btnDone}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ fontSize: 20, color: "white", fontWeight: "700" }}>
              {"LETS START THIS !!!"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const keyExtractor = (item) => item.title;

  return (
    <View style={{ flex: 1 }}>
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={data}
        activeDotStyle={{
          marginLeft: -5,
          width: 40,
          backgroundColor: "#70A3F0",
        }}
        dotStyle={{
          marginLeft: -5,
          width: 40,
          backgroundColor: "rgba(0, 0, 0, .2)",
        }}
        showNextButton={false}
        showDoneButton={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#051E78",
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  title: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
  btnDone: {
    bottom: 25,
    borderRadius: 10,
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#70A3F0",
  },
});

export default onBoard;
