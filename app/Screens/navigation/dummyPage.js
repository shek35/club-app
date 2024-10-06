import React from 'react';
import { Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function dummyPage() {
  const navigation = useNavigation();
  function navigateToLogin() {
    navigation.navigate('SignInScreen');
  }
  function navigateToHome() {
    navigation.navigate('home');
  }
  function navigateToSuperAdmin() {
    navigation.navigate('superAdmin');
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: 15 }}>
      <Button onPress={() => navigateToLogin()} title="Go to Login" color="#53B6B8"></Button>
      <Button onPress={() => navigateToHome()} title="Go to Home " color="#53B6B8"></Button>
      <Button onPress={() => navigateToSuperAdmin()} title="Go to Super Admin " color="#53B6B8"></Button>
    </View>
  )
}

export default dummyPage;
