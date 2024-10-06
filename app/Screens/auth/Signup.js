import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  Pressable,
  LogBox,
} from "react-native";
import Color from "../../../constants/colors";
import CustomInput from "./CustomInput";
import { Formik, Field } from "formik";
import * as firebase from "firebase";
import * as yup from "yup";
// import YearPicker from "react-year-picker";
import * as ImagePicker from "expo-image-picker";
// import Constants from 'expo-constants';
import { Picker } from "@react-native-community/picker";
import "firebase/firestore";

// this is a validation scheme to be followed during the validation process we can set the patter for
// each of the values to be filled in the form over here
const ValidationSchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),

  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email address is required"),

  usn: yup
    .string()
    .matches(/^(01JST)[0-9]{2}[A-Z]+[0-9]+$/, "Enter valid USN")
    .required("USN is required"),

  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least of 8 character`)
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),

  branch: yup.string().required("Branch name is required"),

  year: yup
    .string()
    .matches(/([0-9]{4})$/, "Enter a valid year")
    .required("Joining Year Required"),

  writeSomethingAboutYou: yup.string().required("required"),
});

//this is where the main function of this page starts
function SignUp({ navigation }) {
  // setting the constant variable-image and giving it a default value
  const [image, setImage] = useState(
    "https://i.pinimg.com/originals/5e/7e/97/5e7e9731e68f229df3a315cd63f45857.jpg"
  );
  const [pickerValue, setpickerValue] = useState("");

  useEffect(() => {
    (async () => {
      //this asks the user to grant permission to access the gallery
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
          alert("Permission denied!!");
        }
      }
    })();
  }, []);

  // LogBox.ignoreAllLogs()

  const usersignup = async (data) => {
    try {
      console.log("sign up");
      console.log(data.email);
      //  const emailcheck = await firebase.firestore()
      //                .collection('users')
      //                .doc('I7ab0f2zb7ZdSsQRaPDM')
      //                .collection(pickerValue)
      //                .doc('zbaICRAK4wcE1bGnDsxV')
      //                .collection("clg_users")
      //                .where('email', '==', data.email)
      //                .get();

      const usncheck = await firebase
        .firestore()
        .collection("users")
        .doc("sjce")
        .collection(pickerValue)
        // .doc("zbaICRAK4wcE1bGnDsxV")
        // .collection("clg_users")
        .where("email", "==", data.email)
        .get();

      //  const ec = emailcheck.docs.length;
      const uc = usncheck.docs.length;
      let arr = [];

      if (uc == 0) {
        const result = await firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password);
        firebase
          .firestore()
          .collection("users")
          .doc(pickerValue)
          .collection("clg_users")
          .doc(data.email)
          //   .collection("clg_users")
          //   .doc(result.user.uid)
          .set({
            name: data.name,
            email: result.user.email,
            emailuid: result.user.uid,
            photoURL:
              "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png",
            branch: data.branch,
            jyear: data.year,
            registrations: arr,
            following: arr,
            usn: data.usn,
          })
          .then(() => {
            alert("Registration Sucessfull");
          });
      } else {
        console.log(uc);
        alert("User with this usn already exists !!");
      }

      navigation.navigate("SignInScreen");
    } catch (e) {
      if (e.code == "auth/email-already-in-use") {
        alert("Email id already exists");
      } else console.log(e);
    }
  };

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const giveAlert = (error) => {
    Alert.alert("OOPS!", { error }, [
      { text: "Understood", onPress: () => console.log("alert closed") },
    ]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Sign Up </Text>

      <Formik
        validationSchema={ValidationSchema}
        initialValues={{
          name: "",
          email: "",
          usn: "",
          password: "",
          confirmPassword: "",
          branch: "",
          yearOfJoining: "",
          writeSomethingAboutYou: "",
        }}
        onSubmit={(values) => {
          usersignup(values);
        }}
      >
        {(props) => (
          <ScrollView style={styles.scroll}>
            <View>
              <View style={styles.inputs}>
                <TouchableOpacity onPress={PickImage}>
                  {image && (
                    <Image source={{ uri: image }} style={styles.pic} />
                  )}
                </TouchableOpacity>

                <TextInput
                  name="name"
                  style={styles.input}
                  placeholder={"Name"}
                  placeholderTextColor={"#000"}
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                />
                {props.errors.name && (
                  <Text style={styles.errorText}>{props.errors.name}</Text>
                )}

                <TextInput
                  name="email"
                  style={styles.input}
                  placeholder={"Email"}
                  placeholderTextColor={"#000"}
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                  keyboardType="email-address"
                />
                {props.errors.email && (
                  <Text style={styles.errorText}>{props.errors.email}</Text>
                )}

                <TextInput
                  name="usn"
                  style={styles.input}
                  placeholder={"USN"}
                  placeholderTextColor={"#000"}
                  onChangeText={props.handleChange("usn")}
                  value={props.values.usn}
                />
                {props.errors.usn && (
                  <Text style={styles.errorText}>{props.errors.usn}</Text>
                )}

                <TextInput
                  name="password"
                  style={styles.input}
                  placeholder={"Password"}
                  placeholderTextColor={"#000"}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  secureTextEntry
                />
                {props.errors.password && (
                  <Text style={styles.errorText}>{props.errors.password}</Text>
                )}

                <TextInput
                  name="confirmPassword"
                  style={styles.input}
                  placeholder={"Confirm Password"}
                  placeholderTextColor={"#000"}
                  onChangeText={props.handleChange("confirmPassword")}
                  value={props.values.confirmPassword}
                  secureTextEntry
                />
                {props.errors.confirmPassword && (
                  <Text style={styles.errorText}>
                    {props.errors.confirmPassword}
                  </Text>
                )}

                <TextInput
                  name="branch"
                  style={styles.input}
                  placeholder={"Branch"}
                  placeholderTextColor={"#000"}
                  onChangeText={props.handleChange("branch")}
                  value={props.values.branch}
                />
                {props.errors.branch && (
                  <Text style={styles.errorText}>{props.errors.branch}</Text>
                )}

                <TextInput
                  name="year"
                  style={styles.input}
                  placeholder={"Joining Year"}
                  placeholderTextColor={"#000"}
                  onChangeText={props.handleChange("year")}
                  value={props.values.year}
                />
                {props.errors.year && (
                  <Text style={styles.errorText}>{props.errors.year}</Text>
                )}

                <TextInput
                  multiline
                  name="writeSomethingAboutYou"
                  style={styles.input}
                  placeholder={"Write Something About You"}
                  placeholderTextColor={"#000"}
                  onChangeText={props.handleChange("writeSomethingAboutYou")}
                  value={props.values.writeSomethingAboutYou}
                />
                {props.errors.writeSomethingAboutYou && (
                  <Text style={styles.errorText}>
                    {props.errors.writeSomethingAboutYou}
                  </Text>
                )}
                <Picker
                  style={styles.picker}
                  selectedValue={pickerValue}
                  enabled={true}
                  onValueChange={(itemValue) => setpickerValue(itemValue)}
                >
                  <Picker.Item label="Select College" value="" />
                  <Picker.Item label="SJCE" value="sjce" />
                </Picker>
              </View>

              <TouchableOpacity style={styles.button}>
                <Button
                  color={Color.darkblue}
                  title="SignUp "
                  onPress={props.handleSubmit}
                  disabled={!props.isValid}
                />
              </TouchableOpacity>

              <View style={styles.backup}>
                <Text style={styles.backuptext}>
                  Already have an account?{" "}
                  <Pressable
                    onPress={() => {
                      navigation.navigate("SignInScreen");
                    }}
                  >
                    <Text style={styles.signup}> Sign In</Text>
                  </Pressable>
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
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

  scroll: {
    flex: 1,
  },

  pic: {
    width: 100,
    height: 100,
    marginLeft: 100,
    paddingTop: 20,
    borderRadius: 50,
    paddingBottom: 20,
  },

  title: {
    paddingTop: 30,
    fontWeight: "bold",
    fontSize: 38,
    color: Color.darkblue,
  },

  inputs: {
    margin: 8,
    padding: 8,
    flex: 1,
  },

  input: {
    margin: 4,
    padding: 7,
    backgroundColor: Color.inputBox,
    opacity: 0.3,
    borderColor: Color.inputBox,
    borderWidth: 2,
    width: 300,
    borderRadius: 5,
    marginLeft: 8,
    color: "#000000",
  },

  button: {
    paddingTop: 10,
    width: 310,
    borderRadius: 12,
    marginLeft: 18,
  },

  errorText: {
    fontSize: 10,
    color: "red",
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
  picker: {
    margin: 4,
    padding: 7,
    backgroundColor: Color.inputBox,
    opacity: 0.3,
    borderColor: Color.inputBox,
    borderWidth: 2,
    width: 300,
    borderRadius: 5,
    marginLeft: 8,
    color: "#000000",
  },
});

export default SignUp;
