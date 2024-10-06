import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../auth/Signin';
import SignUpScreen from '../auth/Signup';
// import forgotpass from './forgotpass';

const Stack = createStackNavigator();

const LoginScreens = ({navigation}) => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name="SignInScreen" component={SignInScreen}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
        {/* <Stack.Screen name="forgotpass" component={forgotpass}/> */}
    </Stack.Navigator>
);

export default LoginScreens;