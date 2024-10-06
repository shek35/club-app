import React, { Component, useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { Card, Title, Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import ModalComponent from "./HomeComp/Modal";
import { Dimensions } from "react-native";
import firebase from 'firebase';

const { width, height } = Dimensions.get("screen");

const cardInfo = [
  {
    id: "3",
    image: {
      uri: "https://media-exp1.licdn.com/dms/image/C560BAQHQb9hnAXwkBA/company-logo_200_200/0/1567700435829?e=2159024400&v=beta&t=PDKl_ukeOiHXEvkvsGqQ2_XPmQe-kb6hkf426p3sXPQ",
    },
    title: "IEEE SJCE",
    following: false,
  },
  {
    id: "4",
    image: { uri: "https://bit.ly/2T2qWEv" },
    title: "VentureX",
    following: false,
  },
  {
    id: "5",
    image: {
      uri: "https://media-exp1.licdn.com/dms/image/C510BAQEFeCpKMmM8aA/company-logo_200_200/0/1524141706605?e=2159024400&v=beta&t=ZgZS3xO4hXyYC-E65allhQM8WFVl2roBoZmORlAKabE",
    },
    title: "EdBoard",
    following: false,
  },
  {
    id: "2",
    image: {
      uri: "https://media-exp1.licdn.com/dms/image/C560BAQHtS3OdZ0Kr8Q/company-logo_200_200/0/1557596028224?e=2159024400&v=beta&t=IOGG2ioz8iXd4H0KCzdvYakl9w-Y1OfFFhCszD7gFuY",
    },
    title: "DSC",
    following: false,
  },
  {
    id: "1",
    image: { uri: "https://avatars.githubusercontent.com/u/37414607?v=4" },
    title: "LCC",
    following: false,
  },
];



// const db=firebase.firestore();


function Home({ navigation }) {

  const [clubData, setClubData] = useState([])
  const [clubName, setClubName] = useState([])

  
    var db = firebase.firestore();
    

  var db = firebase.firestore();


  // You can listen to the document with the onSnapshot() method, initial call creates the document snapshot with the
  // current data. Anytime the data updates another call updates the document snapshot

  useEffect(() => {
    const path = '/users/sjce/club_admin';
    db.collection(path).get().then((querySnapshot) => {
      const clubName = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().club_name)
        clubName.push({ ...doc.data() })
      })
      setClubName(clubName)
      const path2 = '/data/sjce/clubs';
      const clubData = [];
      // clubName.forEach((club) => {

      // console.log(club.club_name)
      db.collection(path2).onSnapshot((snapshot) => {
        snapshot.forEach((data) => {
          clubData.push({ ...data.data(), key: data.id })
        })

        console.log(clubData)
        // console.log(clubData)
        setClubData(clubData)

      })
      // })
    })


  }, [])



  // function onpress(id) {
  //   setData((prevState) => ({
  //     prevState.data.map((el) =>
  //       el.id === id ? { ...el, following: !el.following } : el
  //     ),
  //   }));
  // }


  // this has to be corrected accordingly

  // function onpress(id){
  //   setData(data.map((el)=>{
  //     el.id===id? {...el, following= !el.following}: el
  //   }))
  // }
  // render() {
  return (
    <>
      <FlatList
        data={clubData}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => {
              navigation.navigate("club", { item: item })
            }}
          >
            <View style={(styles.column, styles.BorderClass)}>
              <View style={{ alignItems: "center", padding: 15 }}>
                <Text style={styles.text}>{item.club_name}</Text>
              </View>
              <View style={styles.row}>
                <View style={{ flex: 0.3 }}>
                  <Image source={item.club_logo} style={styles.img} />
                </View>
                <View style={styles.ti}>
                  <TouchableOpacity
                    style={styles.followButton}
                  // onPress={onpress(item.id)}
                  >
                    <Text style={styles.buttonText}>
                      {item.following ? "UNFOLLOW" : "FOLLOW"}
                    </Text>
                  </TouchableOpacity>
                  <Button
                    onPress={() =>
                      navigation.navigate("ClubEvents", { clubname: item.club_name, clublogo: item.club_logo })
                    }
                    title="Events"
                    color="#53B6B8"
                  ></Button>
                </View>
                {/* <View style={{ flex: 0.1, justifyContent: "center" }}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("club")}
                    >
                      <Ionicons
                        name="chevron-forward-outline"
                        style={styles.icon}
                        size={24}
                        color="#53B6B8"
                      />
                    </TouchableOpacity>
                  </View> */}
              </View>
              {/* <TouchableOpacity style={{flex: 0.1, justifyContent: "center"}} onPress={() =>{navigation.navigate("club")}}>
                  <Ionicons name="chevron-forward-outline" style={styles.icon} size={24} color="#53B6B8" />
                </TouchableOpacity> */}
            </View>
          </Card>
        )}
      />
      {/* <ModalComponent/> */}
    </>

  );
}
{/* } */ }

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#000",
    shadowOpacity: 1,
    marginBottom: 10,
    height: 200,
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
    alignItems: "stretch",
    fontSize: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
    flex: 0.6,
    marginLeft: 60,
    marginTop: -30,
  },

  text: {
    color: "#22577A",
    fontWeight: "700",
    fontSize: 16,
  },

  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 50,
    marginLeft: 20,
    borderColor: "#000000",
    borderWidth: 1,
  },

  icon: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
    height: 90,
    // marginTop: -45
  },
  modal: {
    borderRadius: 30,
    width: "90%",
    height: "80%",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: Dimensions.get("window").height / 8,
  },
  touchableopacity: {
    backgroundColor: "white",
    height: width * 0.1,
    width: width * 0.4,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  followButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#22577A",
  },
  BorderClass: {
    borderLeftColor: "#53B6B8",
    borderLeftWidth: 6,
    borderRadius: 20,
  },
});

export { cardInfo };
export default Home;
