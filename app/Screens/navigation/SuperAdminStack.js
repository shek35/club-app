import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import superAdmin from '../superAdmin/superAdmin';
import AddClub from '../superAdmin/AddClub';

// import forgotpass from './forgotpass';

const Stack = createStackNavigator();

const SuperAdminStack = ({ navigation }) => (
    <Stack.Navigator headerMode='none' initialRouteName="superAdmin">

        <Stack.Screen name="superAdmin" component={superAdmin} />
        <Stack.Screen name="AddClub" component={AddClub} />

    </Stack.Navigator>
);


export default SuperAdminStack;