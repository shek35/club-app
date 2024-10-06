import * as React from "react";
import { Button, View } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import add_post from "../home/addpost.js";
import post_desc from "../home/postDescription.js";
import post_faq from "../home/postFAQ.js";

const Drawer = createDrawerNavigator();

export default function Admin_Drawer() {
  <View style={{ paddingLeft: 10, paddingTop: 10, marginLeft: 40 }}>
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    >
      <Ionicons name="reorder-four-outline" size={28} />
    </TouchableOpacity>
  </View>;
  return (
    <View>
      <NavigationContainer>
        <Drawer.Navigator
          drawerIcon={{ focused: boolean, color: "blue", size: 4 }}
          swipeEnabled={false}
        >
          <Drawer.Screen name="Edit Description" component={post_desc} />
          <Drawer.Screen name="Post FAQ" component={post_faq} />
          <Drawer.Screen name="Add Post" component={add_post} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}
