import React, { useState, useEffect } from "react";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import MainTabScreen from "./app/Screens/navigation/MainBottomTab";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import LoginScreens from "./app/Screens/navigation/LoginScreens";
import DummyScreen from "./app/Screens/navigation/DummyScreen";
import LandingScreen from "./app/Screens/navigation/LandingScreen";
import firebase from "firebase";
import { AuthContext } from "./app/Components/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";
import SuperAdminStack from "./app/Screens/navigation/SuperAdminStack";
import AdminStack from "./app/Screens/navigation/AdminStack";

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [nav, setnav] = useState("");

  useEffect(() => {
    try {
      const firebaseConfig = {
        apiKey: "AIzaSyB6tYebK3PoPeq58FxclFwTl3Pukjr6I0o",
        authDomain: "clubsapp-sjce.firebaseapp.com",
        projectId: "clubsapp-sjce",
        storageBucket: "clubsapp-sjce.appspot.com",
        messagingSenderId: "877790416774",
        appId: "1:877790416774:web:e3948ffb6416955197a607",
      };

      if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const initialLoginState = {
    userName: null,
    userid: null,
    role: null,
    college: null,
  };

  const CustomDefaultTheme = {
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: "#ffffff",
      text: "#333333",
    },
  };

  const CustomDarkTheme = {
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userid: action.usid,
          role: action.role,
          college: action.college,
        };
      case "LOGIN":
        return {
          ...prevState,
          userid: action.userid,
          role: action.role,
          college: action.college,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userid: null,
          role: null,
          college: null,
        };
      case "REGISTER":
        return {
          ...prevState,
          userid: action.userid,
          role: action.role,
          college: action.college,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        const role = String(foundUser[0].role);
        const userid = String(foundUser[0].emailuid);
        const college = String(foundUser[0].clg);
        console.log(role, " ", userid, " ", college);
        try {
          await AsyncStorage.setItem("userid", userid);
          await AsyncStorage.setItem("role", role);
          await AsyncStorage.setItem("college", college);
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: "LOGIN",
          userid: userid,
          role: role,
          college: college,
        });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userid");
          await AsyncStorage.removeItem("role");
          await AsyncStorage.removeItem("college");
          console.log("removed");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {},
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userid, role, college;
      userid = null;
      try {
        userid = await AsyncStorage.getItem("userid");
        role = await AsyncStorage.getItem("role");
        college = await AsyncStorage.getItem("college");
      } catch (e) {
        console.log(e);
      }
      dispatch({
        type: "RETRIEVE_TOKEN",
        usid: userid,
        role: role,
        college: college,
      });
      // console.log(role);
      // console.log(userid);
      // console.log(college);
    }, 1000);
  }, []);

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userid === null ? (
            <LoginScreens />
          ) : loginState.role == "clg_users" ? (
            <MainTabScreen />
          ) : loginState.role == "club_admin" ? (
            <AdminStack />
          ) : (
            <SuperAdminStack />
          )}
          {/* <LandingScreen/> */}
          <FlashMessage
            position="bottom"
            floating={true}
            titleStyle={{ fontSize: 17, textAlign: "center" }}
            style={{ backgroundColor: "#53B6B8" }}
          />
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
