import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../auth/Signin';
import SignUpScreen from '../auth/Signup';
import dummyPage from '../navigation/dummyPage'
import MainTabScreen from './MainBottomTab';
import superAdmin from '../superAdmin/superAdmin';
import AddClub from '../superAdmin/AddClub';
import ClubEvents from '../home/ClubEvents';
import club from '../home/club';
import EditProfile from '../user/EditProfile';

// import forgotpass from './forgotpass';

const Stack = createStackNavigator();

const DummyScreen = ({navigation}) => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name="dummyPage" component={dummyPage}/>
        <Stack.Screen name="SignInScreen" component={SignInScreen}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <Stack.Screen name="home" component={MainTabScreen}/>
        <Stack.Screen name="superAdmin" component={superAdmin}/>
        <Stack.Screen name="AddClub" component={AddClub}/>

        <Stack.Screen name="ClubEvents" component={ClubEvents}/>
        <Stack.Screen name="club" component={club}/>
<Stack.Screen name="EditProfile" component={EditProfile}/> 

      
    </Stack.Navigator>
);

export default DummyScreen;