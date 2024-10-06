import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Color from "../../../constants/colors";
import { NavigationContainer } from "@react-navigation/native";
import post_faq from "./postFAQ";
import post_desc from "./postDescription";
import post_pic from "./postPic";


const Tab = createMaterialTopTabNavigator();

export default function addpost() {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 200);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -70],
  });
  
  function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Pic"
        tabBarOptions={{
          activeTintColor: "white",
          inactiveTintColor: "black",
          labelStyle: { fontSize: 10, fontWeight: "bold" },
          indicatorContainerStyle: { backgroundColor: "white" },
          indicatorStyle: {
            backgroundColor: Color.peacock_green,
            height: "90%",
            borderRadius: 10,
          },
          style: { elevation: 0, marginTop: 30 },
        }}
        swipeEnabled={true}
      >
        <Tab.Screen
          name="Post Description"
          component={post_desc}
          options={{ tabBarLabel: "Description" }}
        />
        <Tab.Screen
          name="Pic"
          component={post_pic}
          options={{ tabBarLabel: "Pic" }}
        />
        <Tab.Screen
          name="FAQ"
          component={post_faq}
          options={{ tabBarLabel: "FAQ" }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ paddingTop: 30, paddingBottom: 30, alignItems: "center" }}>
        <Text style={styles.title}>New Post</Text>
      </View>
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateY: translateY }],
          marginHorizontal: 20,
        }}
      >
        <NavigationContainer independent={true}>
          <MyTabs />
        </NavigationContainer>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 28,
    color: Color.darkblue,
  },
});
