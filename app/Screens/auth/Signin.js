import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import Color from "../../../constants/colors";
import firebase from "firebase";
import { AuthContext } from "../../Components/context";
import { Formik } from "formik";
import * as yup from "yup";
import { Picker } from "@react-native-community/picker";
import "firebase/firestore";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email address is required"),

  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least of 8 character`)
    .required("Password is required"),
});

function Signin({ navigation }) {
  const [college, setcollege] = useState("sjce");
  const [role, setrole] = useState("clg_users");

  let founduser = [];
  const { signIn } = React.useContext(AuthContext);

  const loginHandle = async (values) => {
    let userName = values.email;
    let password = values.password;
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(userName, password)
        .then(async (res) => {
          const fetchDetails = await firebase
            .firestore()
            .collection("users")
            .doc("sjce")
            .collection(role)
            //  .doc(username)
            //.collection(role)
            .where("email", "==", userName)
            .get();
          console.log(fetchDetails.docs);

          if (fetchDetails.docs.length > 0) {
            console.log(fetchDetails.docs[0].data());
            founduser = [{ emailuid: res.user.uid, role: role, clg: college }];
            signIn(founduser);
          }
        })
        .catch((e) => {
          console.log(e);
          // alert("Invalid password or user does not exit!!")
        });
    } catch (e) {
      console.log(e);
      alert("Invalid password or user does not exit!!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Club App </Text>
      <Text style={styles.subtitle}>Welcome!</Text>
      <Text style={styles.login}>Log In</Text>

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          loginHandle(values);
        }}
      >
        {(props) => (
          <View>
            <Picker
              style={styles.picker}
              selectedValue={college}
              enabled={true}
              onValueChange={(itemValue) => setcollege(itemValue)}
            >
              <Picker.Item label="Select College" value="" />
              <Picker.Item label="SJCE" value="sjce" />
            </Picker>

            <Picker
              style={styles.picker}
              selectedValue={role}
              enabled={true}
              onValueChange={(itemValue) => setrole(itemValue)}
            >
              <Picker.Item label="Select Role" value="" />
              <Picker.Item label="USER" value="clg_users" />
              <Picker.Item label="SUPER ADMIN" value="super_admin" />
              <Picker.Item label="ADMIN" value="club_admin" />
            </Picker>
            <View style={styles.inputs}>
              <TextInput
                name="email"
                style={styles.input}
                placeholder={"email"}
                placeholderTextColor={"#000"}
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                keyboardType="email-address"
              />
              {props.errors.email && (
                <Text style={styles.errorText}>{props.errors.email}</Text>
              )}

              <TextInput
                name="password"
                style={styles.input}
                placeholder={"password"}
                placeholderTextColor={"#000"}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                secureTextEntry
              />
              {props.errors.password && (
                <Text style={styles.errorText}>{props.errors.password}</Text>
              )}
            </View>

            <TouchableOpacity style={styles.button}>
              <Button
                color={Color.darkblue}
                title="LogIn"
                onPress={props.handleSubmit}
                disabled={!props.isValid}
              />
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.backup}>
        <Text style={styles.backuptext}>Forgot Password?</Text>

        <Text style={styles.backuptext}>
          Don't have an account?{" "}
          <Pressable
            onPress={() => {
              navigation.navigate("SignUpScreen");
            }}
          >
            <Text style={styles.signup}> Sign Up</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
  },

  title: {
    paddingTop: 60,
    fontWeight: "bold",
    fontSize: 38,
    color: Color.darkblue,
  },

  subtitle: {
    paddingTop: 20,
    fontSize: 20,
    color: Color.peacock_green,
    paddingBottom: 3,
  },

  login: {
    fontSize: 15,
    fontWeight: "bold",
    color: Color.darkblue,
    paddingTop: 35,
    paddingBottom: 30,
  },

  inputs: {
    margin: 8,
    padding: 4,
  },

  input: {
    margin: 4,
    padding: 7,
    backgroundColor: Color.inputBox,
    opacity: 0.3,
    borderColor: Color.inputBox,
    borderWidth: 2,
    width: 250,
    borderRadius: 5,
    marginLeft: 8,
    color: "#000000",
  },

  button: {
    paddingTop: 10,
    width: 270,
    borderRadius: 12,
    marginLeft: 13,
  },

  backup: {
    margin: 4,
    marginTop: 15,
  },

  backuptext: {
    paddingBottom: 2,
    fontSize: 12,
    color: Color.peacock_green,
    textDecorationLine: "underline",
  },

  signup: {
    fontWeight: "bold",
  },

  errorText: {
    fontSize: 10,
    color: "red",
  },
  picker: {
    margin: 4,
    padding: 7,
    backgroundColor: Color.inputBox,
    opacity: 0.3,
    borderColor: Color.inputBox,
    borderWidth: 2,
    width: 250,
    borderRadius: 5,
    // marginLeft: 15,
    alignSelf: "center",
    color: "#000000",
  },
});

export default Signin;
