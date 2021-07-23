import React, { useEffect, useState } from "react";
import { View, FlatList, Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

import PostCard from "../PostCard";
import { Container } from "../../Style/HomeStyle";

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  //function
  const fetchPosts = async () => {
    try {
      const list = [];

      //fungsi untuk store data postingan ke database
      await firestore()
        .collection("posts")
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
              userName: "Test Name",
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

      //fungsi loading
      setPosts(list);
      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //fungsi load data dari database yang bakal nanti ditampilin

  useEffect(() => {
    fetchPosts();
  }, []);

  //hapus post

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = (postId) => {
    Alert.alert(
      "Delete post",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed!"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => deletePost(postId),
        },
      ],
      { cancelable: false }
    );
  };

  //hanya user yang punya post yang bisa hapus
  const deletePost = (postId) => {
    console.log("Current Post Id: ", postId);

    firestore()
      .collection("posts")
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const { postImg } = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
                setDeleted(true);
              })
              .catch((e) => {
                console.log("Error while deleting the image. ", e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };
  //data di hapus dari database
  const deleteFirestoreData = (postId) => {
    firestore()
      .collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          "Post deleted!",
          "Your post has been deleted successfully!"
        );
      })
      .catch((e) => console.log("Error deleting posst.", e));
  };

  return (
    <Container>
      <View></View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard
            item={item}
            onDelete={handleDelete}
            onPress={() =>
              navigation.navigate("HomeProfile", { userId: item.userId })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default FeedScreen;
