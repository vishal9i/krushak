import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import MyMandi from "./src/screens/MyMandi";
import Complaint from "./src/screens/Complaint";
import GovtSchemes from "./src/screens/GovtSchemes";
import HomePage from "./src/screens/HomePage";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "./src/screens/Signup";
import Login from "./src/screens/Login";
import Otpverify from "./src/screens/Otpverify";
import Forgot1 from "./src/screens/Forgot1";
import Forgot2 from "./src/screens/Forgot2";
import Forgot3 from "./src/screens/Forgot3";
import Account from "./src/screens/Account";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Details from "./src/screens/Details";
import News from "./src/screens/News";
import Terms from "./src/screens/Terms";
import Privacy from "./src/screens/Privacy";
import Profile from "./src/screens/Profile";
import Chat from "./src/screens/Chat";

const AppStack = createStackNavigator();
const AppStackScreens = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="chaupal" component={Complaint} />
      <AppStack.Screen name="Details" component={Details} />
      <AppStack.Screen name="News" component={News} />
      <AppStack.Screen name="Terms & Conditions" component={Terms} />
      <AppStack.Screen name="Privacy Policy" component={Privacy} />
      <AppStack.Screen name="Profile" component={Profile} />
      <AppStack.Screen name="Complaints" component={Chat} />
    </AppStack.Navigator>
  );
};

const Auth = createStackNavigator();
const AuthScreens = () => {
  return (
    <Auth.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false }}
    >
      <Auth.Screen name="signup" component={Signup} />
      <Auth.Screen name="login" component={Login} />
      <Auth.Screen name="otpverify" component={Otpverify} />
      <Auth.Screen name="forgot1" component={Forgot1} />
      <Auth.Screen name="forgot2" component={Forgot2} />
      <Auth.Screen name="forgot3" component={Forgot3} />
    </Auth.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const TabScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "green",
        },
        tabBarActiveTintColor: "#ffa305",
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tab.Screen
        options={{
          title: "News",
          tabBarIcon: ({ color }) => (
            // <FontAwesome name="institution" size={24} color="black" />
            <MaterialCommunityIcons name="newspaper" size={24} color={color} />
          ),
        }}
        name="News"
        component={HomePage}
      />
      <Tab.Screen
        options={{
          title: "My Mandi",
          tabBarIcon: ({ color }) => (
            <Entypo name="shop" size={24} color={color} />
          ),
        }}
        name="MyMandi"
        component={MyMandi}
      />
      <Tab.Screen
        options={{
          title: "Gov. Yojna",
          tabBarIcon: ({ color }) => (
            // <FontAwesome name="users" size={24} color={color} />
            <FontAwesome name="institution" size={24} color={color} />
          ),
        }}
        name="Gov. Yojna"
        component={GovtSchemes}
      />
      <Tab.Screen
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
        }}
        name="Account"
        component={Account}
      />
    </Tab.Navigator>
  );
};
const Root = createStackNavigator();
const RootScreens = () => {
  const [token, settoken] = useState(null);
  const [loading, setloading] = useState(true);
  const gettoken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      settoken(true);
    } else {
      settoken(false);
    }
  };
  useEffect(() => {
    gettoken();
    setTimeout(() => {
      setloading(false);
    }, 2500);
  }, []);
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName={token ? "Tab" : "Auth"}
      initialRouteName="Tab"
    >
      <Root.Screen name="Auth" component={AuthScreens} />
      <Root.Screen name="Tab" component={TabScreens} />
      <Root.Screen name="App" component={AppStackScreens} />
    </Root.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <RootScreens />
    </NavigationContainer>
    // <MyMandi/>
    // <Complaint/>
    // <GovtSchemes/>
    // <HomePage/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
