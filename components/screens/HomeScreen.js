import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.gretting}>Welcome Back</Text>
        {/* nampilin foto profile */}
        <Image
          style={styles.userImg}
          source={require("../../assets/images/Default/user.png")}
        />

        {/* nampiliin username */}
        <Text style={styles.userName}>Muhammad Naufal</Text>

        {/* deskripsi user */}
        <Text style={styles.aboutUser}>
          Don't wake us up, we'd rather just keep dreaming 'Cause the nightmares
          in our heads are bad enough
        </Text>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            {/* nampilin jumlah post dari user */}
            <Text style={styles.userInfoTitle}>25</Text>
            <Text style={styles.userInfoSubTitle}>Post</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 50,
    marginVertical: 100,
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 15,
    marginBottom: 15,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  gretting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 15,
    marginBottom: 15,
  },
});
