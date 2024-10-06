import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
  Modal,
  Image,
} from "react-native";
import { Card, Title, Avatar, TextInput } from "react-native-paper";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { Overlay } from "react-native-elements";
import Color from "../../../constants/colors";
import { render } from "react-dom";
import { Picker } from "@react-native-community/picker";
import { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import firebase from 'firebase'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import AddClub from "./AddClub";
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createDrawerNavigator, createStackNavigator } from '@react-navigation/drawer'
import { DrawerContent } from "../navigation/DrawerContent";
import { LandingScreen } from "../navigation/LandingScreen"
import { useNavigation, DrawerActions } from '@react-navigation/native';
import MainTabScreen from '../navigation/MainBottomTab';
import Signin from '../auth/Signin';
import SAProfile from './SAprofile'



const { width, height } = Dimensions.get("screen");

const Drawer = createDrawerNavigator();
const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

}
// const Stack = createStackNavigator();


function superAdmin({ navigation }) {



  const [clubAdmins, setClubAdmins] = useState([]);

  var db = firebase.firestore();

  useEffect(() => {
    db.collection('/users/sjce/club_admin')
      .onSnapshot((snapshot) => {
        const clubAdmins = [];
        snapshot.forEach(documentSnapshot => {
          clubAdmins.push({ ...documentSnapshot.data(), key: documentSnapshot.id })
        })

        setClubAdmins(clubAdmins);
      })
  }, [])



  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null)
  //Toggling delete modal and edit modal visiblities
  const handleOnDeleteItem = (item) => {
    setDeleteItem({ item })
    setDeleteModalVisible(true)
  }
  const handleOnCloseDeleteModal = () => {
    setDeleteItem({})
    setDeleteModalVisible(false)
  }
  const handleOnCloseModal = () => {
    setModalVisible(false)
  };
  const handleOnSelectItem = (item) => {
    if (item != null) {
      setSelectedItem({ item });
      setModalVisible(true);
    }
    else {
      console.log("null")
    }
  };
  return (
    
    
     
     
    
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ paddingTop: 50, paddingBottom: 4, alignSelf: "center" }}>
          <Text style={styles.title}>Dashboard</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons
              name="reorder-four-outline"
              size={28}
              style={styles.menu}
            />
          </TouchableOpacity>
        </View>

      </View>

      <FlatList
        data={clubAdmins}

        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={(styles.row, styles.BorderClass)}>
              <View style={{ alignItems: "flex-start", padding: 15 }}>
                <Text
                  style={{
                    color: "#22577A",
                    fontWeight: "bold",
                    fontSize: 20,
                    marginTop: 10,
                  }}
                >
                  {item.club_name}
                </Text>
                <Text style={{ color: "#7a9aaf", fontSize: 14, marginTop: 20 }}>
                  Club Admin Name: {item.club_admin_name}

                </Text>
                <Text style={{ color: "#7a9aaf", fontSize: 14, marginTop: 20 }}>
                  Email: {item.email}

                </Text>
                <Text style={{ color: "#7a9aaf", fontSize: 14, marginTop: 20 }}>
                  Password: {item.password}

                </Text>
              </View>
            </View>
            <View
              style={{ position: "absolute", top: 10, right: 10, padding: 15 }}
            >
              <TouchableOpacity onPress={() => {
                handleOnSelectItem(item)
              }}>
                <AntDesign
                  name="edit"
                  style={styles.icon}
                  size={24}
                  color="#53B6B8"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                padding: 15,
              }}
            >

              <TouchableOpacity onPress={() => { handleOnDeleteItem(item) }}>
                <Ionicons
                  name="trash-outline"
                  style={styles.icon}
                  size={20}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
      <DeleteModal modalVisible={deleteModalVisible} selectedItem={deleteItem} onClose={handleOnCloseDeleteModal} db={db} />
      <EditModal modalVisible={modalVisible} selectedItem={selectedItem} onClose={handleOnCloseModal} db={db} />
      <Button
        onPress={() => {
          navigation.navigate("AddClub");
        }}
        title="Add Club"
        color="#53B6B8"
      ></Button>
    </View>

  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerStyle={{
        width: 250,

      }}
    >
      <Drawer.Screen name="superAdmin" component={superAdmin} />
      <Drawer.Screen name="AddClub" component={AddClub} />
      <Drawer.Screen name="SAProfile" component={SAProfile} />
      <Drawer.Screen name="Signin" component={Signin} />
    </Drawer.Navigator>
  );
}
export default function Main() {
  return (
    <NavigationContainer independent={true}>
      <MyDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#000",
    shadowOpacity: 1,
    marginBottom: 10,
    height: 220,
    width: "87%",
    borderRadius: 20,
    alignSelf: "center",
    elevation: 5,
    margin: 20,
    marginVertical: 30,
  },
  column: {
    flexDirection: "column",
  },

  row: {
    flexDirection: "row",
  },

  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  },
  ti: {
    alignItems: "flex-start",
    fontSize: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
    flex: 0.6,
    marginLeft: 60,
    marginTop: -30,
  },

  img: {
    width: 80,
    height: 100,
    borderRadius: 50,
    marginBottom: 50,
    marginLeft: 20,
  },
  icon: {
    justifyContent: "space-evenly",
  },
  modal: {
    borderRadius: 30,
    width: "90%",
    height: "80%",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: Dimensions.get("window").height / 8,
  },

  input1: {
    marginLeft: 60,
    padding: 8,
    flex: 1,
    width: "50%",
    height: 6,
    marginTop: -20,
    backgroundColor: Color.inputBox,
    opacity: 0.3,
    borderColor: Color.inputBox,
    borderWidth: 2,
  },
  input2: {
    marginLeft: 20,
    padding: 8,
    flex: 1,
    width: "50%",
    height: 6,
    marginTop: -20,
    backgroundColor: Color.inputBox,
    opacity: 0.3,
    borderColor: Color.inputBox,
    borderWidth: 2,
  },
  picker: {
    width: 120,
    height: 30,
    borderRadius: 4,
    borderColor: "white",
    marginLeft: 40,
    backgroundColor: Color.inputBox,
    color: "white",
    flex: 1,
    padding: 10,
  },
  BorderClass: {
    borderLeftColor: "#53B6B8",
    borderLeftWidth: 5,
    borderRadius: 20,
    height: 220,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    height: 500,
    width: 300

  },
  input: {
    margin: 8,
    padding: 8,
    flex: 1,
  },

  textinput: {
    margin: 10,
    padding: 8,
    backgroundColor: Color.inputBox,
    opacity: 0.3,
    borderColor: Color.inputBox,
    borderWidth: 2,
    width: 250,
    height: 20,
    borderRadius: 5,
    marginLeft: 8,
    color: "#000000",
  },

  button: {
    paddingTop: 2,
    paddingBottom: 20,
    width: 100,
    borderRadius: 12,
    marginLeft: 13,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    color: Color.darkblue,
    alignSelf: "center",
    paddingRight: 15
  },
  menu: {
    marginLeft: 15,
    fontWeight: "bold",
    color: Color.darkblue,
  }
});
