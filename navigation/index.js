// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { UpdateProfile } from "../screens/UpdateProfile";
import { UserPage } from "../screens/UserPage";
import { Posts } from "../screens/Posts";
import { NewPost } from "../screens/NewPost";
import { CurrentUserPage } from "../screens/currentUserPage";

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="sign-in"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={SignIn} name="sign-in" />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
       <Stack.Screen component={SignUp} name="sign-up" />
       <Stack.Screen component={UpdateProfile} name="update-profile" />
       <Stack.Screen component={UserPage} name="user-page" />
       <Stack.Screen component={Posts} name="newsfeed" />
       <Stack.Screen component={NewPost} name="new-post" />
       <Stack.Screen component={CurrentUserPage} name="current-user-page" />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
