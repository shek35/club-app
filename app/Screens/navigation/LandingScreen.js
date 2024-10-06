import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import landingPage from './landingPage';
import dummyPage from './dummyPage';
import SignInScreen from '../auth/Signin';
import SignUpScreen from '../auth/Signup';
import MainTabScreen from './MainBottomTab';
import superAdmin from '../superAdmin/superAdmin';
import AddClub from '../superAdmin/AddClub';
import SAProfile from '../superAdmin/SAprofile';
import calendar from '../calandar/calendar';
import ClubEvents from '../home/ClubEvents';
import club from '../home/club';
import EditProfile from '../user/EditProfile';

// import forgotpass from './forgotpass';

const Stack = createStackNavigator();

const LandingScreen = ({navigation}) => (
    <Stack.Navigator headerMode='none'>
       <Stack.Screen name="landingPage" component={landingPage}/>
       
        <Stack.Screen name="dummyPage" component={dummyPage}/>
        <Stack.Screen name="SignInScreen" component={SignInScreen}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <Stack.Screen name="home" component={MainTabScreen}/>
        <Stack.Screen name="superAdmin" component={superAdmin}/>
        <Stack.Screen name="AddClub" component={AddClub}/>
        <Stack.Screen name="Profile" component={SAProfile}/>
       { /*<Stack.Screen name="Calendar" component={calendar}/>
        <Stack.Screen name="ClubEvents" component={ClubEvents}/>
        <Stack.Screen name="club" component={club}/>*/
        }

        <Stack.Screen name="EditProfile" component={EditProfile}/>
    </Stack.Navigator>
);


export default LandingScreen;