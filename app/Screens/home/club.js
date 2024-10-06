import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { Card } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { TeamInfo } from './TeamInfo';
// import {Askinfo} from './AskInfo';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import { Events } from './Events';
import Color from '../../../constants/colors';
// import Askinfo from './Askinfo';
import firebase from 'firebase';

const { width, height } = Dimensions.get('screen');
import { withNavigation } from 'react-navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";




function club({ navigation, route }) {

  const { item } = route.params;
  const clubName = item.club_name;
  const clubLogo = item.club_logo;
  const clubDescription = item.club_description;

  // console.log(item)

  const [faq, setFaq] = useState([]);
  const [team, setTeam] = useState([]);
  const [event, setEvent] = useState([]);

  const scrollY = new Animated.Value(0)
  const diffClamp = Animated.diffClamp(scrollY, 0, 200)
  const translateY = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -70]

    //  inputRange:[0,200],
    //  outputRange:[0,-200]

  })
  const [addPost, showaddPost] = useState(false);
  const [addTeam, showaddTeam] = useState(false);
  const [editMember, showeditMember] = useState(false);
  const [srole, setRole] = useState("");
  const [displayBack, setDisplayBack] = useState(true);
  var role, college, userid;
  const getData = async () => {
    role = await AsyncStorage.getItem("role");
    college = await AsyncStorage.getItem("college");
    userid = await AsyncStorage.getItem("userid");
    console.log(role);

    setRole(role);
  };


  useEffect(() => {
    console.log(translateY);
  }, [translateY])

  const Tab = createMaterialTopTabNavigator();

  const [teamInfo, setTeamInfo] = useState([]);


  var db = firebase.firestore();


  useEffect(() => {
    db.collection('data/sjce/clubs/' + item.club_name + '/faq')
      .onSnapshot((snapshot) => {
        const faqs = []
        snapshot.forEach((faq) => {
          faqs.push({ ...faq.data(), key: faq.id })
        })
        setFaq(faqs)
      })
  }, [])

  useEffect(() => {
    db.collection('data/sjce/clubs/' + item.club_name + '/events')
      .onSnapshot((snapshot) => {
        const events = []
        snapshot.forEach((event) => {
          events.push({ ...event.data(), key: event.id })
        })

        setEvent(events)
      })
  }, [])

  useEffect(() => {
    db.collection('data/sjce/clubs/' + item.club_name + '/team')
      .onSnapshot((snapshot) => {
        const teams = []
        snapshot.forEach((team) => {
          teams.push({ ...team.data(), key: team.id })
        })
        setTeam(teams)
      })

  }, [])

  useEffect(() => {
    // alert(srole);
    if (srole === "club_admin") {
      showaddTeam(true);
      showeditMember(true);
      showaddPost(true);
      setDisplayBack(false);
    }
  }, [srole]);
  useEffect(() => {
    console.log(addTeam);
  }, [addTeam]);


  function Team() {
    return (
      <View style={{
        backgroundColor: 'white',
        height: '100%',
      }} >

        {addTeam && (
          <View>
            <Ionicons.Button
              name="add"
              onPress={() => navigation.navigate("Add New Member")}
              style={styles.add_button}
            ></Ionicons.Button>
          </View>
        )}
        <View
          style={{
            display: editMember ? "flex" : "none",
          }}
        >
          <Ionicons.Button
            name="create"
            onPress={() => navigation.navigate("Edit Team")}
            style={styles.edit_button}
          ></Ionicons.Button>
        </View>
        <FlatList
          style={{ backgroundColor: 'white' }}
          data={team}
          numColumns={2}
          onScroll={(e) => {
            // console.log("team",e.nativeEvent.contentOffset.y);
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.Teamcard]}>
              <View>
                <Image
                  source={{ uri: item.picture }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    alignSelf: 'center',
                  }}
                />
              </View>
              <View style={{ alignSelf: 'center', marginTop: 10 }}>
                <View>
                  <Text style={{ fontSize: 20 }}>{item.name}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 16 }}>{item.designation}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  }


  console.log(event)

  function Posts() {
    return (
      <>
        <View
          style={{
            height: "100%",
          }}
        >
          <FlatList
            style={{ backgroundColor: "white" }}
            showsVerticalScrollIndicator={false}
            data={event}
            onScroll={(e) => {
              // console.log("posts",e.nativeEvent.contentOffset.y);

              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Card
                style={[styles.card]}
                onPress={() => {
                  navigation.navigate("EventDetails", { item: item });
                }}
              >
                <View
                  style={
                    ({
                      flex: 1,
                      height: height * 0.5,
                      width: "87%",
                      borderRadius: 30,
                      alignSelf: "center",
                    },
                      styles.BorderClass)
                  }
                >
                  <View
                    style={{ flex: 1.2, flexDirection: "row", marginTop: 10 }}
                  >
                    <View
                      style={{
                        flex: 0.18,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{ uri: item.clubImage }}
                        style={[
                          styles.img,
                          { marginHorizontal: 10, marginVertical: 10 },
                        ]}
                      />
                    </View>
                    <View style={{ flex: 0.82, alignItems: "flex-start" }}>
                      <Text
                        style={{
                          fontSize: 20,
                          marginVertical: 12,
                          textAlign: "left",
                        }}
                      >
                        {item.clubName}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flex: 7.8, marginBottom: 10 }}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        navigation.navigate('EventDetails', { item: item });
                      }}>
                      {/* {console.log({unit})} */}
                      <Image
                        source={{ uri: item.event_image }}
                        style={{
                          width: width * 0.7,
                          height: width * 0.5,
                          resizeMode: "contain",
                          alignSelf: "center",
                        }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginVertical: 10 }}>
                    <Text
                      numberOfLines={5}
                      ellipsizeMode={'tail'}
                      style={{
                        textAlignVertical: 'center',
                        textAlign: 'auto',
                      }}>
                      {item.event_description}
                    </Text>
                  </View>
                </View>
              </Card>
            )}
          />
        </View>
      </>
    );
  }

  // const __renderTruncatedFooter = handlePress => {
  //   return (
  //     <Text style={{color: '#63C5DA'}} onPress={handlePress}>
  //       Read More..
  //     </Text>
  //   );
  // };

  // const __renderRevealedFooter = handlePress => {
  //   return (
  //     <Text style={{color: '#63C5DA'}} onPress={handlePress}>
  //       Show Less
  //     </Text>
  //   );
  // };

  function FAQ() {

    const [showMoreButton, setShowMoreButton] = useState(false);
    const [textShown, setTextShown] = useState(false);
    const [numLines, setNumLines] = useState(undefined);

    const toggleTextShown = () => {
      setTextShown(!textShown);
    };

    useEffect(() => {
      setNumLines(textShown ? 2 : undefined);
    }, [textShown]);

    const onTextLayout = useCallback(
      (e) => {
        if (e.nativeEvent.lines.length > 2 && !textShown) {
          setTextShown(true)
          setShowMoreButton(true);
          setNumLines(2);
        }
      },
      [textShown],
    );

    const [newQuestion, setNewQuestion] = useState();

    const handleAddQuestion = () => {
      console.log(newQuestion);
    };

    return (
      <View style={{ backgroundColor: "#fff", height: "100%", flex: 1 }}>
        {/* <ScrollView> */}
        <View style={{ backgroundColor: '#fff', marginBottom: 70 }}>
          <FlatList
            data={faq}
            showsVerticalScrollIndicator={false}
            onScroll={(e) => {
              // console.log("ask",e.nativeEvent.contentOffset.y);

              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            // renderItem={({item}) => (<Askinfo item={item}/>)}

            renderItem={({ item }) => (
              <Card style={styles.Qcard}>
                <View>
                  <View style={styles.question}>
                    <Text style={{ color: '#22577A' }}>{item.question}</Text>
                  </View>
                  <View style={styles.answer}>

                    <Text onTextLayout={onTextLayout} numberOfLines={numLines} style={{ color: '#000' }} ellipsizeMode="tail">{item.answer}</Text>
                    {showMoreButton ? (
                      <Text onPress={toggleTextShown} style={{ color: Color.blue }}>{textShown ? '..Read Less' : 'Read More..'}</Text>
                    ) : null}
                  </View>
                </View>
              </Card>
            )}
          />
        </View>

        <View style={styles.wrapTextInput}>
          {/* <TextInput
            style={styles.input}
            placeholder={"type your question here"}
            value={newQuestion}
            onChangeText={(text) => setNewQuestion(text)}
          />
          <View style={styles.addWraper}>
            <TouchableOpacity onPress={() => handleAddQuestion()}>
              <Ionicons
                style={styles.send}
                name="paper-plane"
                size={24}
              ></Ionicons>
            </TouchableOpacity>
          </View> */}
        </View>
        {/* </ScrollView> */}
      </View>
    );
  }

  function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Team"
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
          name="Team"
          component={Team}
          options={{ tabBarLabel: "Team" }}
        />
        <Tab.Screen
          name="Posts"
          component={Posts}
          options={{ tabBarLabel: "Posts" }}
        />
        <Tab.Screen
          name="FAQ"
          component={FAQ}
          options={{ tabBarLabel: "FAQ" }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* <View  style={{flexDirection:'row', paddingTop: 40}}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <AntDesign
              name="arrowleft"
              style={{ marginLeft: 10 }}
              size={24}
              color="#53B6B8"
            />
          </TouchableOpacity>
        </View>
      </View>               */}
      <View style={{ height: 200, marginHorizontal: 20, }}>
        <View style={styles.first_section}>
          <View style={styles.avatar}>
            <Avatar
              source={{
                // uri: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                uri: clubLogo
              }}
              containerStyle={{ marginRight: 15, marginTop: 12 }}
              size={100}
              rounded
            />
          </View>
          <TouchableOpacity style={[{ display: addPost ? "none" : "flex", }, styles.button]}>
            <Button
              color={Color.peacock_green}
              title="Become a Member"
              onPress={() => navigation.navigate("membership")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[{ display: addPost ? "flex" : "none", }, styles.button]}>
            <Button
              color={Color.peacock_green}
              title="Add Post"
              onPress={() => navigation.navigate("New Post")}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>{clubName}</Text>
        {/* <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text> */}
        <Text>{clubDescription}</Text>

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

export default withNavigation(club);

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    backgroundColor: "#1c1c1c",
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 1,
  },

  text: {
    marginTop: 15,
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "400",
    fontWeight: "bold",
    // padding: 15
  },

  scroll: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    height: "100%",
  },
  Teamcard: {
    backgroundColor: "rgba(248,244,244,0.1)",
    marginBottom: 10,
    height: 120,
    width: "40%",
    alignSelf: "center",
    margin: 20,
    marginVertical: 25,
  },
  row: {
    flexDirection: "row",
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 50,
    marginLeft: 5,
    borderColor: "#000000",
    borderWidth: 1,
  },
  scroll: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    height: "100%",
  },

  wrapTextInput: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    bottom: 0,
    right: 0,
    left: 0,
    height: 60,
  },

  input: {
    // marginTop: 80,
    backgroundColor: Color.peacock_green,
    opacity: 0.6,
    borderRadius: 10,
    width: 300,
    borderColor: "#63C5DA",
    borderWidth: 1,
  },

  addWraper: {
    // marginTop: 80,
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  send: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "white",
    shadowOffset: { width: 5, height: 3 },
    shadowColor: "#000",
    shadowOpacity: 2,
    marginBottom: 10,
    height: height * 0.5,
    width: "100%",
    alignSelf: "center",
    elevation: 5,
    margin: 20,
    marginVertical: 30,
    borderColor: "#7a9aaf",
    borderWidth: 0.5,
    borderRadius: 20,
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
    width: 30,
    height: 30,
    borderRadius: 50,
    borderColor: "#000000",
    borderWidth: 1,
  },

  icon: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
    height: 20,
    marginTop: -45,
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
  BorderClass: {
    borderLeftColor: "#53B6B8",
    borderLeftWidth: 6,
    borderRadius: 20,
  },

  first_section: {
    flexDirection: "row",
  },

  button: {
    marginTop: 45,
    marginLeft: 30,
    padding: 9,
    paddingHorizontal: 5,
    borderRadius: 9,
  },

  avatar: {
    marginLeft: 8,
    marginTop: 6,
  },
  Qcard: {
    margin: 5,
    padding: 3,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#DDD',

  },

  question: {
    padding: 2,
    marginTop: 2,
    marginBottom: 3,
  },

  answer: {
    padding: 3,
    marginTop: 3,
    marginBottom: 2,
    marginHorizontal: 2,
  },
  BorderClass: {
    borderLeftColor: "#53B6B8",
    borderLeftWidth: 5,
    borderRadius: 20,
    height: height * 0.5,
    paddingLeft: 10,
  },
  add_button: {
    width: 20,
  },
  edit_button: {
    width: 20,
  },
});
