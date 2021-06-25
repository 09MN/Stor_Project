import React, { useContext, useState } from "react";

import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { AuthContext } from "../../navigation/AuthProvider";

function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{`Hello Again. \n Welcome Back`}</Text>
      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Email Adress</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            labelValue={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            keyboardType="email-address"
            autoCapitalize="none"
          ></TextInput>
        </View>

        <View style={{ marginTop: 32 }}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            labelValue={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            secureTextEntry={true}
          ></TextInput>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btnSignIn}
        onPress={() => login(email, password)}
      >
        <Text style={{ color: "#ffff", fontWeight: "500" }}>Sign In</Text>
      </TouchableOpacity>

      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.lines}></View>
        <Text
          style
          style={{ fontSize: 14, fontWeight: "bold", marginHorizontal: 10 }}
        >
          Connect With
        </Text>
        <View style={styles.lines}></View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.GooglePlusStyle}
          activeOpacity={0.5}
          onPress={() => {}}
        >
          <Image
            source={require("../../assets/images/google.png")}
            style={styles.ImageIconStyle}
          />

          <Text style={styles.TextStyle}>Google</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }}>
        <Text style={{ color: "#414959", fontSize: 13 }}>
          Dont have an account?{" "}
          <Text
            style={{ fontSize: 14, fontWeight: "500", color: "#051E78" }}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            Sign Up
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    margin: 50,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  form: {
    marginBottom: 50,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 14,
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161f3D",
  },
  btnSignIn: {
    marginHorizontal: 30,
    backgroundColor: "#051E78",
    borderRadius: 5,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  lines: {
    height: 2,
    width: 40,
    backgroundColor: "#C6DFFD",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  GooglePlusStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    borderWidth: 2.5,
    borderColor: "#C6DFFD",
    height: 50,
    width: 150,
    borderRadius: 10,
    margin: 5,
  },
  TextStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
  },
});

export default Login;
