import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import club from "../home/club.js";
const Stack = createStackNavigator();

const AdminStack = ({ navigation }) => (
  <Stack.Navigator initialRouteName="clubpage">
    <Stack.Screen name="clubpage" component={club} />
  </Stack.Navigator>
);

export default AdminStack;
