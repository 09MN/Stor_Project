import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddPost from "../components/screens/AddPost";
import ChatScreen from "../components/screens/ChatScreen";
import FeedScreen from "../components/screens/FeedScreen";
import HomeScreen from "../components/screens/HomeScreen";
import ProfileScreen from "../components/screens/ProfileScreen";

const tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="AddPost" component={AddPost} />
      <Tabs.Screen name="ChatScren" component={ChatScreen} />
      <Tabs.Screen name="FeedScreen" component={FeedScreen} />
      <Tabs.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

export default Tabs;
