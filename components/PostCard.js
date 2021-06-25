import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from "../Style/HomeStyle.js";

import moment from "moment";

import { AuthContext } from "../navigation/AuthProvider";

const PostCard = ({ item, onDelete, onPress }) => {
  const { user } = useContext(AuthContext);
  likeIcon = item.liked ? "heart" : "heart-outline";
  likeIconColor = item.liked ? "#2e64e5" : "#333";

  let likeText = item.like;
  let commentText = item.comments;

  if (item.likes == 1) {
    likeText = "1 Like";
  } else if (item.likes > 1) {
    likeText = item.likes + " Likes";
  } else {
    likeText = "Like";
  }

  if (item.comments == 1) {
    commentText = "1 Comment";
  } else if (item.comments > 1) {
    commentText = item.comments + " Comments";
  } else {
    commentText = "Comment";
  }

  return (
    <Card>
      <UserInfo>
        <UserImg source={{ uri: "item.userImg" }} />
        <UserInfoText>
          <TouchableOpacity onPress={onPress}>
            <UserName>{item.userName}</UserName>
          </TouchableOpacity>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg != null ? (
        <PostImg source={{ uri: item.postImg }} />
      ) : (
        <Divider />
      )}

      <InteractionWrapper>
        <Interaction active={item.liked}>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>

        {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="trash" size={25} />
          </Interaction>
        ) : null}
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
