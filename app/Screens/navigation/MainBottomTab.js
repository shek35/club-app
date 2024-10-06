import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import Profile from '../user/Profile'
import Home from '../home/Home'
import calendar from '../calandar/calendar'
import club from '../home/club';                     
import venue from '../home/venue/venue';
import venueDetails from '../home/venue/venueDetails';
import search from '../home/Search/search';
import membership from '../home/membership';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import EditProfile from '../user/EditProfile'
import ClubEvents from '../home/ClubEvents'
import EventDetails from '../home/EventDetails'
import EventFaq from '../home/EventFaq'
import Rsvp from '../home/RSVP'

//we create the stack i.e when we click the icons they should go to another screen thats why we navigate them like a stack.
const ProfileStack = createStackNavigator();
const HomeStack = createStackNavigator();
const calendarStack = createStackNavigator();

//we call the navigator bottom navigation bar which we have imported.
const Tab = createMaterialBottomTabNavigator();


//we are creating the main bottom part of the screen i.e the outline of the thing.
const MainTabScreen = () => (
  //Tab.navigator contains the styling and looks as well as the name of the sreen which is stacked behind it.
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#328F97"
    labeled={false}
    inactiveColor="#328F97"
    barStyle={{ paddingBottom: 10, backgroundColor: "white" }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline'
        }
        else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline'
        }
        else if (route.name === 'calendar') {
          iconName = focused ? 'calendar' : 'calendar-outline'
        }
        return <Ionicons name={iconName} size={26} color={color} />;

      },
    })}



  >

    <Tab.Screen //Tab.screen has the the styling and link to the particular page.
      name="Profile"
      component={ProfileStk}
    /* options={{
       tabBarLabel: 'Profile',
       tabBarIcon: ({ color }) => (
         <Icon name="account" color={color} size={26} />
 
       ),
 
     }}*/
    />
    <Tab.Screen
      name="Home"
      component={HomeStk}
    /* options={{
       tabBarLabel: 'Home',
       tabBarIcon: ({ color }) => (
         <Icon name="home" color={color} size={26} />
       ),
 
     }} */
    />
    <Tab.Screen
      name="calendar"
      component={calendarStk}
    /* options={{
       tabBarLabel: 'calendar',
       tabBarIcon: ({ color }) => (
         <Icon name="calendar" color={color} size={26} />
       ),
     }}*/
    />
  </Tab.Navigator >
);

export default MainTabScreen;

//this is the stack which helps us to go the that particular screen.
const ProfileStk = () => (
  <ProfileStack.Navigator screenOptions={({})}>
    <ProfileStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    <ProfileStack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
  </ProfileStack.Navigator>
);

const HomeStk = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{}}>
    <HomeStack.Screen name="Home" component={Home}
      options={{
        headerShown: true, headerTitleStyle: { textAlign: "center", fontWeight: "bold", fontSize: 30, },
        headerLeft: () => (<TouchableOpacity onPress={() => { navigation.navigate('search') }}>
          <Ionicons name="search" style={styles.searchicon} size={24} color="black" />
        </TouchableOpacity>),

        headerRight: () => (<TouchableOpacity onPress={() => { navigation.navigate('venue') }}>
          <Ionicons name="location" style={styles.locationicon} size={24} color="black" />
        </TouchableOpacity>),
      }} />
    <HomeStack.Screen name="club" component={club} options={{ headerShown: false }}/>
    <HomeStack.Screen name="venue" component={venue} options={{headerShown: false}}/>
    <HomeStack.Screen name="venueDetails" component={venueDetails} 
    options={({route})=>{return({ title: route.params.item.name, headerTitleAlign: 'center',})}}/>
    <HomeStack.Screen name="search" component={search} 
    options={{headerShown:false}}/>
    <HomeStack.Screen name="membership" component={membership} options={{ headerShown: false }} />
    <HomeStack.Screen name="ClubEvents" component={ClubEvents} options={{headerShown: false}} />
    <HomeStack.Screen name="EventDetails" component={EventDetails} options={{headerShown: false}} />
    <HomeStack.Screen name="EventFaq" component={EventFaq}/>
    <HomeStack.Screen name="RSVP" component={Rsvp}/>

  </HomeStack.Navigator>
);



const calendarStk = () => (
  <calendarStack.Navigator screenOptions={{}}>
    <calendarStack.Screen name="Calendar" component={calendar} options={{ headerShown: false }} />
  </calendarStack.Navigator>
);



const styles = StyleSheet.create({
  activeColor: {
    backgroundColor: "black",
    height: 40,
    width: 80,
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: 20
  },
  Color: {
    backgroundColor: "white",
    height: 50,
    width: 80,
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "space-around",
  },
  searchicon: {
    marginLeft: 20,
  },
  locationicon: {
    marginRight: 20,
  }
})

