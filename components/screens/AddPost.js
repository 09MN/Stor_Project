import React, { useContext, useState } from "react";
import { Alert, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from "../../Style/AddPost";
import { AuthContext } from "../../navigation/AuthProvider";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";

const AddPost = () => {
  const { user, logout } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log("Image url", imageUrl);

    firestore()
      .collection("posts")
      .add({
        userId: user.uid,
        post: post,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        likes: null,
        comment: null,
      })
      .then(() => {
        console.log("post added");
        Alert.alert(
          "Post published!",
          "Your post has been published Successfully!"
        );
        setPost(null);
      })
      .catch((error) => {
        console.log("ada salah coeg asw pisan dah", error);
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);
      Alert.alert("image has been uploaded");
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image != null ? <AddImage source={{ uri: image }} /> : null}
        <InputField
          placeholder="WhatSupp bitch"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={(content) => setPost(content)}
        />
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={submitPost}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}
      </InputWrapper>

      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePhotoFromCamera}
        >
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}
        >
          <Icon name="images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor="#1abc9c"
          title="Category"
          onPress={() => {}}
        >
          <Icon name="duplicate-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};
export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 45,
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 22,
    color: "white",
  },
});
