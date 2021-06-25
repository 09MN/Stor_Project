import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import onBoard from "../components/screens/onBoard";
import Login from "../components/screens/Login";
import SignUp from "../components/screens/SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  });

  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == true) {
    routeName = "Onboarding";
  } else {
    routeName = "Login";
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="onBoard"
        component={onBoard}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ header: () => null }}
      />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
