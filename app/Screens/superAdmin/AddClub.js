import React, { useState } from "react";
import { Component } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import Color from "../../../constants/colors";
import { Picker } from "@react-native-community/picker";
import { showMessage } from "react-native-flash-message";
import firebase from "firebase";
import validator from "validator";
import { event } from "react-native-reanimated";
const { width, height } = Dimensions.get("screen");

const validateFields = (email, password) => {
  const isValid = {
    email: validator.isEmail(email),
    password: validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  };

  return isValid;
};

export default function AddClub({ navigation }) {
  var db = firebase.firestore();

  const [pickerValue, setPickerValue] = useState({
    text: "",
    errorMessage: "",
  });
  const [pickerValue2, setPickerValue2] = useState({
    text: "",
    errorMessage: "",
  });
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordReentryField, setPasswordReentryField] = useState({
    text: "",
    errorMessage: "",
  });
  const [clubAdminName, setClubAdminName] = useState({
    text: "",
    errorMessage: "",
  });
  const [clubName, setClubName] = useState({
    text: "",
    errorMessage: "",
  });

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: 40, paddingLeft: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("superAdmin")}>
            <AntDesign
              name="left"
              style={styles.icon}
              size={24}
              color="#53B6B8"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={{ paddingTop: 50, paddingBottom: 40 }}>
            <Text style={styles.title}>Add New Club</Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.error}>
              {clubName.errorMessage && `${clubName.errorMessage}`}
            </Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter Club Name"
              placeholderTextColor={"#000"}
              value={clubName.text}
              onChangeText={(text) => {
                setClubName({ text });
              }}
            />
            <Text style={styles.error}>
              {emailField.errorMessage && `${emailField.errorMessage}`}
            </Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter Email Address"
              placeholderTextColor={"#000"}
              value={emailField.text}
              onChangeText={(text) => {
                setEmailField({ text });
              }}
            />
            <Text style={styles.error}>
              {clubAdminName.errorMessage && `${clubAdminName.errorMessage}`}
            </Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter Club Admin Name"
              placeholderTextColor={"#000"}
              value={clubAdminName.text}
              onChangeText={(text) => {
                setClubAdminName({ text });
              }}
            />
            <Text style={styles.error}>
              {passwordField.errorMessage && `${passwordField.errorMessage}`}
            </Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter Password"
              placeholderTextColor={"#000"}
              secureTextEntry
              value={passwordField.text}
              onChangeText={(text) => {
                setPasswordField({ text });
              }}
            />
            <Text style={styles.error}>
              {passwordReentryField.errorMessage &&
                `${passwordReentryField.errorMessage}`}
            </Text>
            <TextInput
              style={styles.textinput}
              placeholder="Confirm Password"
              placeholderTextColor={"#000"}
              secureTextEntry
              value={passwordReentryField.text}
              onChangeText={(text) => {
                setPasswordReentryField({ text });
              }}
            />
            <Text style={styles.error}>
              {pickerValue.errorMessage && `${pickerValue.errorMessage}`}
            </Text>
            <Text
              style={{ fontSize: 15, marginTop: 15, color: Color.darkblue }}
            >
              {" "}
              Select Labels{" "}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#7a9aaf",
                  fontSize: 14,
                  margin: 10,
                  marginTop: 20,
                }}
              >
                <Picker
                  style={styles.picker}
                  selectedValue={pickerValue.text}
                  enabled={true}
                  onValueChange={(text) => {
                    setPickerValue({ text });
                  }}
                >
                  <Picker.Item label="Select Label" value="" />
                  <Picker.Item label="Technical" value="Technical" />
                  <Picker.Item label="Literature" value="Literature" />
                  <Picker.Item label="Innovative" value="Innovative" />
                  <Picker.Item label="Entreprenueral" value="Entreprenueral" />
                  <Picker.Item label="Cultural" value="Cultural" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </Text>
              <Text
                style={{
                  color: "#7a9aaf",
                  fontSize: 14,
                  margin: 10,
                  marginLeft: 15,
                  marginTop: 20,
                }}
              >
                <Picker
                  style={styles.picker}
                  selectedValue={pickerValue2.text}
                  enabled={true}
                  onValueChange={(text) => {
                    setPickerValue2({ text });
                  }}
                >
                  <Picker.Item
                    label="Select Label"
                    value=""
                    style={{ padding: 10 }}
                  />
                  <Picker.Item
                    label="Technical"
                    value="Technical"
                    style={{ padding: 10 }}
                  />
                  <Picker.Item label="Literature" value="Literature" />
                  <Picker.Item label="Innovative" value="Innovative" />
                  <Picker.Item
                    label="Entreprenueral"
                    value="Entreprenueral"
                    style={{ padding: 10 }}
                  />
                  <Picker.Item label="Cultural" value="Cultural" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <Button
            color={Color.darkblue}
            title="Add"
            onPress={() => {
              const isValid = validateFields(
                emailField.text,
                passwordField.text
              );

              let isAllValid = true;
              if (!isValid.email) {
                emailField.errorMessage = "*Please enter a valid email";
                setEmailField({ ...emailField });
                isAllValid = false;
              }

              if (!isValid.password) {
                passwordField.errorMessage =
                  "*Password must be at least 8 characters long with numbers, uppercase, lowercase, and symbol characters";
                setPasswordField({ ...passwordField });
                isAllValid = false;
              }

              if (clubName.text == "") {
                clubName.errorMessage = "*Club name cannot be empty";
                setClubName({ ...clubName });
                isAllValid = false;
              }
              if (clubAdminName.text == "") {
                clubAdminName.errorMessage = "*Club admin name cannot be empty";
                setClubAdminName({ ...clubAdminName });
                isAllValid = false;
              }

              if (passwordField.text != passwordReentryField.text) {
                passwordReentryField.errorMessage =
                  "*Password confirmation doesn't match password";
                setPasswordReentryField({ ...passwordReentryField });
                isAllValid = false;
              }
              if (pickerValue.text == "" || pickerValue2.text == "") {
                pickerValue.errorMessage = "One or more label(s) missing";
                setPickerValue({ ...pickerValue });
                setPickerValue2({ ...pickerValue2 });
                isAllValid = false;
              }
              if (isAllValid) {
                const entry = {
                  //Grabbing all the data
                  club_admin_name: clubAdminName.text,
                  club_name: clubName.text,
                  email: emailField.text,
                  password: passwordField.text,
                };
                db.collection(
                  "/users/sjce/club_admin"
                ).doc(entry.club_admin_name) 
                  .set({
                    ...entry,
                  });
                db.collection(
                  "/data/sjce/clubs"
                )
                .doc(entry.club_name)
                .set({
                  club_description: "",
                  club_labels: {
                    first: pickerValue.text,
                    second: pickerValue2.text,
                  },
                  club_logo: "",
                  club_name: entry.club_name,
                });

                // db.collection(
                //   "/data/sjce/clubs/" + entry.club_name +"/events"
                // ).add({
                // event_date: "",
                // event_description: "",
                // event_image: "",
                // event_name: "",
                // });

                // db.collection("/data/sjce/clubs/" + entry.club_name + "/faq").add({
                // question: "",
                // answer: "",
                // });

                // db.collection("/data/sjce/clubs/" + entry.club_name + "/team").add({
                // designation: "",
                // name: "",
                // picture: "",
                // });                

                //Setiing all entries to empty
                setEmailField({
                  text: "",
                  errorMessage: "",
                });
                setClubAdminName({
                  text: "",
                  errorMessage: "",
                });
                setClubName({
                  text: "",
                  errorMessage: "",
                });
                setPasswordField({
                  text: "",
                  errorMessage: "",
                });
                setPasswordReentryField({
                  text: "",
                  errorMessage: "",
                });
                setPickerValue({
                  text: "",
                  errorMessage: "",
                });
                setPickerValue2({
                  text: "",
                  errorMessage: "",
                });
              }
            }}
          >
            {" "}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 28,
    color: Color.darkblue,
  },

  input: {
    margin: 8,
    padding: 8,
    flex: 3,
  },

  textinput: {
    margin: 15,
    padding: 8,
    backgroundColor: Color.inputBox,
    opacity: 0.3,
    borderColor: Color.inputBox,
    borderWidth: 2,
    width: 300,
    borderRadius: 5,
    marginLeft: 8,
    color: "black",
  },

  button: {
    width: 280,
    borderRadius: 12,
    paddingLeft: 110,
    marginTop: height * 0.07,
    marginBottom: height * 0.07,
  },

  picker: {
    width: 135,
    height: 30,
    borderRadius: 4,
    borderColor: "#FFF",
    marginLeft: 40,
    backgroundColor: Color.inputBox,
    color: "#FFF",
    flex: 1,
    padding: 10,
  },
  error: { color: "red", fontSize: 12, marginLeft: 4 },
});
