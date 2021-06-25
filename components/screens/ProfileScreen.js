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
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../../navigation/AuthProvider";
import PostCard from "../PostCard";

const ProfileScreen = ({ navigation, route }) => {
  const { user, logout } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection("posts")
        .where("userId", "==", user.uid)
        .orderBy("postTime", "desc")
        .get()
        .then((querySnapshot) => {
          // console.log("total post : ", querySnapshot.size);
          querySnapshot.forEach((doc) => {
            const { userId, post, postImg, postTime, likes, comments } =
              doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: "User Name",
              userImg:
                "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });

      setPosts(list);
      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = () => {};

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
        <Image
          style={styles.userImg}
          source={require("../../assets/images/Default/user.png")}
        />
        <Text style={styles.userName}>Muhammad Naufal</Text>

        <Text style={styles.aboutUser}>
          Don't wake us up, we'd rather just keep dreaming 'Cause the nightmares
          in our heads are bad enough
        </Text>
        <View style={styles.userBtnWrapper}>
          {route.params ? (
            <>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Follow</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
              >
                <Text style={styles.userBtnTxt}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>25</Text>
            <Text style={styles.userInfoSubTitle}>Post</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>25</Text>
            <Text style={styles.userInfoSubTitle}>Folowers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>25</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  userImg: {
    height: 120,
    width: 120,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginBottom: 10,
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
});
