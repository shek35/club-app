import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView
} from 'react-native'
import { AuthContext } from '../../Components/context';
import firebase from 'firebase'
import { Avatar } from 'react-native-elements';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SideMenuContent } from '../navigation/SideMenuContent';
import EditProfile from './EditProfile';
import Home from '../home/Home';
import Signin from '../auth/Signin';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import club from '../home/club';
import ClubEvents from '../home/ClubEvents'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("screen");

const EventsAttended = [
  {
    id: "1",
    image: { uri: "https://i.pinimg.com/originals/5d/f4/2f/5df42f7142534b6147725699671e5f03.jpg" },
    title1: "Event Name",
    title2: "Club A",
  },
  {
    id: "2",
    image: { uri: "https://i.pinimg.com/originals/5d/f4/2f/5df42f7142534b6147725699671e5f03.jpg" },
    title1: "Event Name",
    title2: "Club B",
  },
  {
    id: "3",
    image: {
      uri: "https://i.pinimg.com/originals/5d/f4/2f/5df42f7142534b6147725699671e5f03.jpg",
    },
    title1: "Event Name",
    title2: "Club C",
  },
  {
    id: "4",
    image: {
      uri: "https://i.pinimg.com/originals/5d/f4/2f/5df42f7142534b6147725699671e5f03.jpg",
    },
    title1: "Event Name",
    title2: "Club D",
  },
  {
    id: "5",
    image: {
      uri: "https://i.pinimg.com/originals/5d/f4/2f/5df42f7142534b6147725699671e5f03.jpg"
    },
    title1: "Event Name",
    title2: "Club E",
  },
  {
    id: "6",
    image: {
      uri: "https://i.pinimg.com/originals/5d/f4/2f/5df42f7142534b6147725699671e5f03.jpg"
    },
    title1: "Event Name",
    title2: "Club F",
  },
  {
    id: "7",
    image: {
      uri: "https://i.pinimg.com/originals/5d/f4/2f/5df42f7142534b6147725699671e5f03.jpg"
    },
    title1: "Event Name",
    title2: "Club G",
  },
  {
    id: "8",
    image: {
      uri: "https://i.pinimg.com/originals/5d/f4/2f/5df42f7142534b6147725699671e5f03.jpg"
    },
    title1: "Event Name",
    title2: "Club H",
  },
];




const Drawer = createDrawerNavigator();
const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

}
const Stack = createStackNavigator();
function Profile({ navigation }) {

  const { signOut, toggleTheme } = React.useContext(AuthContext);
  const [user, setuser] = useState({})

  const signingOut = async () => {
    try {
      firebase.auth().signOut()
        .then(() => { signOut() })
        .then(() => {

          alert("You are Successfully logged out")
        }).catch((e) => {
          alert("You are Successfully logged out")
          signOut()
        })


    } catch (e) {
      firebase.auth().signOut();
      signOut();
      console.log(e)
    }
  }




      useEffect(() => {

        async function fetch () {
            try {

              let userid = await AsyncStorage.getItem("userid");
              console.log(userid);
              const fetchDetails = await firebase
                    .firestore()
                    .collection("users")
                    .doc("sjce")
                    .collection("clg_users")
                    //  .doc(username)
                    //.collection(role)
                    .where("emailuid", "==", userid)
                    .get();
                  if (fetchDetails.docs.length > 0) {
                       setuser(fetchDetails.docs[0].data())
                  }
              
            } catch (e) {
              console.log(e);
            }
        }
        fetch()
       
      }, [])



  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View>
        <View style={{ flexDirection: "row", paddingTop: 40, paddingLeft: 10, marginTop: 15 }}>
          <View style={{ paddingLeft: 250, marginLeft: 80 }}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Ionicons
                name="reorder-four-outline"
                size={28}
                style={styles.menu}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>

        </View>
        <Avatar
          source={{
            uri:user.photoURL,
          }}
          containerStyle={{ alignSelf: "center", marginTop: 5 }}
          size={100}
          rounded
        />
        <Text style={styles.text}>{user.name}</Text>
        <Text style={styles.bio}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
      </View>
      <View style={{ flexDirection: "column", paddingVertical: 10 }}>
        <View style={{ flexDirection: "row", marginLeft: 30, marginRight: 30 }}>
          <Text style={styles.info}>{user.branch}</Text>
          <Text style={styles.info}>600</Text>
          <Text style={styles.info}>{user.jyear}</Text>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 30, marginRight: 30 }}>
          <Text style={{ fontSize: 14, color: '#22577A', paddingLeft: 30 }}>Branch</Text>
          <Text style={{ fontSize: 14, color: '#22577A', paddingLeft: 52 }}>Following</Text>
          <Text style={{ fontSize: 14, color: '#22577A', paddingLeft: 43 }}>Year joined</Text>
        </View>
      </View>

      <View style={{ paddingTop: 20, marginLeft: 20, marginRight: 20, borderBottomColor: '#ADD8E6', borderBottomWidth: 1 }}></View>
      <View>
        <Text style={styles.head}>Events Attended</Text>
      </View>
      <View style={{ marginLeft: 40, marginRight: 40, borderBottomColor: '#ADD8E6', borderBottomWidth: 1 }}></View>
      <ScrollView>
        <FlatList
          data={EventsAttended}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Image source={item.image} style={styles.img} />
                </View>

                <View style={{ paddingLeft: 40, alignSelf: 'flex-end', marginTop: 10 }}>
                  <Text style={{ color: "#22577A", fontSize: 18 }}> {item.title1} </Text>
                  <Text style={{ color: "#7a9aaf", fontSize: 14, marginTop: 20 }}> {item.title2} </Text>
                </View>
              </View>
            </View>
          )}
        />

      </ScrollView>

    </View>
  )
}

function SideDrawer() {
  return (

    <Drawer.Navigator
      drawerContent={props => <SideMenuContent {...props} />}
      drawerPosition='right'
      drawerStyle={{
        width: 250,
      }}
    >
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="club" component={club} />
      <Drawer.Screen name="ClubEvents" component={ClubEvents} />
      <Drawer.Screen name="Signin" component={Signin} />
    </Drawer.Navigator>
  )
}
export default function Main() {
  return (
    <NavigationContainer
      independent={true}
    >
      <SideDrawer />
    </NavigationContainer>
  )
}


//export default Profile

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 20,
    marginRight: 35,
    marginLeft: 35
  },
  text: {
    marginTop: 20,
    alignSelf: "center",
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22577A',
  },
  bio: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    alignSelf: "center",
    fontSize: 14,
    color: '#22577A',
    textAlign: 'center'
  },
  submit: {
    marginRight: 1,
    marginLeft: 1,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    textAlign: 'center'
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
  FormLabel: {
    fontSize: 16,
    color: "#585858"
  },

  StyledInput: {
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 18,
    padding: 8,
    marginBottom: 25,
  },
  FormButton: {
    backgroundColor: "#0077cc",
    width: "100%",
    padding: 8,
  },
  BtnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  info: {
    fontSize: 18,
    paddingHorizontal: 37,
    color: "#22577A",
  },
  head: {
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "center",
    fontSize: 21,
    fontWeight: "bold",
    color: '#22577A',
  },
  card: {
    backgroundColor: "#fff",
    borderBottomColor: '#ADD8E6',
    borderBottomWidth: 2,
    marginBottom: 10,
    height: 100,
    width: "80%",
    alignSelf: "center",
    marginVertical: 20,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginTop: 15,
    marginLeft: 20,
    borderColor: "#000000",
    borderWidth: 1,
  },
  menu: {
    marginLeft: 15,
  }
});