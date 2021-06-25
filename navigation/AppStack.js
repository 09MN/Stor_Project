import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import AddPost from "../components/screens/AddPost";
import ChatScreen from "../components/screens/ChatScreen";
import FeedScreen from "../components/screens/FeedScreen";
import HomeScreen from "../components/screens/HomeScreen";
import ProfileScreen from "../components/screens/ProfileScreen";
import EditProfileScreen from "../components/screens/EditProfileScreen";
import MessageScreen from "../components/screens/MessageScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MessageStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={{ HeaderShown: false }}
    />
    <Stack.Screen
      name="Message"
      component={MessageScreen}
      options={{
        headerBackTitleVisible: "false",
        headerTitleAlign: "center",
      }}
    />
  </Stack.Navigator>
);

const FeedStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="STOR"
      component={FeedScreen}
      options={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#2e64e5",
          fontFamily: "Kufam-SemiBoldItalic",
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: "#fff",
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPost}
      options={{
        title: "",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#2e64e515",
          shadowColor: "#2e64e515",
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: "",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#fff",
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="profile"
      component={ProfileScreen}
      options={{ HeaderShown: false }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        HeaderTitle: "Edit Profile",
        headerBackTitleVisible: "false",
        headerTitleAlign: "center",
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderTopColor: "transparent",
          borderRadius: 15,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
              }}
            >
              <Icon
                name="home"
                size={30}
                color={focused ? "#051E78" : "gray"}
              ></Icon>
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Buat Ruang"
        component={AddPost}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
              }}
            >
              <Icon
                name="plus"
                size={30}
                color={focused ? "#051E78" : "gray"}
              ></Icon>
            </View>
          ),
        }}
        tabBarLabel="null"
      />

      <Tab.Screen
        name="Browse"
        component={FeedStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                width: 55,
                height: 55,
                backgroundColor: "#051E78",
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: Platform.OS == "android" ? 50 : 30,
              }}
            >
              <Icon
                name="globe"
                size={40}
                color={focused ? "white" : "gray"}
              ></Icon>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={MessageStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
              }}
            >
              <Icon
                name="comments"
                size={30}
                color={focused ? "#051E78" : "gray"}
              ></Icon>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
              }}
            >
              <Icon
                name="user"
                size={25}
                color={focused ? "#051E78" : "gray"}
              ></Icon>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;

const style = StyleSheet.create({});
