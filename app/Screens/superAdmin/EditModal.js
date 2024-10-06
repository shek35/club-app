import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
  Modal,
} from "react-native";
import { Card, Title, Avatar, TextInput } from "react-native-paper";
import { Picker } from "@react-native-community/picker";
import Color from "../../../constants/colors"
import validator from "validator";
import Icon from 'react-native-vector-icons/Ionicons';
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

export default function EditModal({ modalVisible, selectedItem, onClose, db }) {

  const [emailField, setEmailField] = useState({
    text: selectedItem ? selectedItem.item.email : "",
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



  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.input}>
            <View style={{ paddingBottom: 4 }}>
              <Text style={styles.title}>Edit Club</Text>
            </View>
            <Text>Enter new email id</Text>
            <Text style={styles.error}>
              {emailField.errorMessage && `${emailField.errorMessage}`}
            </Text>
            <TextInput style={styles.textinput} value={emailField.text} onChangeText={(text) => { setEmailField({ text }) }} />
            <Text>Enter new admin name</Text>
            <Text style={styles.error}>
              {clubAdminName.errorMessage && `${clubAdminName.errorMessage}`}
            </Text>
            <TextInput style={styles.textinput} value={clubAdminName.text} onChangeText={(text) => { setClubAdminName({ text }) }} />
            <Text>Enter new password</Text>
            <Text style={styles.error}>
              {passwordField.errorMessage && `${passwordField.errorMessage}`}
            </Text>
            <TextInput style={styles.textinput} placeholder="Password" value={passwordField.text} onChangeText={(text) => { setPasswordField({ text }) }} placeholderTextColor={'#000'} secureTextEntry />
            <Text>Confirm your password</Text>
            <Text style={styles.error}>
              {passwordReentryField.errorMessage && `${passwordReentryField.errorMessage}`}
            </Text>
            <TextInput style={styles.textinput} placeholder="Confirm Password" value={passwordReentryField.text} onChangeText={(text) => { setPasswordReentryField({ text }) }} placeholderTextColor={'#000'} secureTextEntry />

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.button}>
                <Button color={Color.darkblue} title="Confirm" onPress={() => {
                  if (selectedItem) {
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
                    if (clubAdminName.text == "") {
                      clubAdminName.errorMessage = "*Club admin name cannot be empty"
                      setClubAdminName({ ...clubAdminName })
                      isAllValid = false;
                    }
                    if (passwordField.text != passwordReentryField.text) {
                      passwordReentryField.errorMessage = "*Password confirmation doesn't match password"
                      setPasswordReentryField({ ...passwordReentryField })
                      isAllValid = false
                    }
                    if (isAllValid) {
                      const entry = {
                        club_admin_name: clubAdminName.text == "" ? selectedItem.item.club_admin_name : clubAdminName.text,
                        email: emailField.text == "" ? selectedItem.item.email : emailField.text,
                        password: passwordField.text,
                        key: selectedItem.item.key
                      }

                      db.collection('/users/sjce/club_admin')
                        .doc(selectedItem.item.club_name)
                        .update({
                          club_admin_name: entry.club_admin_name,
                          email: entry.email,
                          password: entry.password
                        });
                        // setChangesSaved(true)
                        setEmailField({
                          text: "",
                          errorMessage: "",
                      })
                        setClubAdminName({
                          text: "",
                          errorMessage: "",
                      })
                      setPasswordField({
                        text: "",
                        errorMessage: "",
                    })
                      setPasswordReentryField({
                        text: "",
                        errorMessage: "",
                    })
                    }
                  }

                }}>
                </Button>
              </TouchableOpacity >
              <TouchableOpacity style={styles.button}>
                <Button color={Color.darkblue} title="Exit" onPress={onClose}> </Button>

              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#000",
    shadowOpacity: 1,
    marginBottom: 10,
    height: 220,
    width: "87%",
    borderRadius: 20,
    alignSelf: "center",
    elevation: 5,
    margin: 20,
    marginVertical: 30,
  },
  column: {
    flexDirection: "column",
  },

  row: {
    flexDirection: "row",
  },

  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  },
  ti: {
    alignItems: "flex-start",
    fontSize: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
    flex: 0.6,
    marginLeft: 60,
    marginTop: -30,
  },

  img: {
    width: 80,
    height: 100,
    borderRadius: 50,
    marginBottom: 50,
    marginLeft: 20,

  },
  icon: {

    justifyContent: "space-evenly",

  },
  modal: {
    borderRadius: 30,
    width: "90%",
    height: "80%",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: Dimensions.get("window").height / 8,
  },
  touchableopacity: {
    backgroundColor: "white",
    height: width * 0.1,
    width: width * 0.4,
    alignSelf: "center",
    justifyContent: "center",
  },

  input1: {
    marginLeft: 60,
    padding: 8,
    flex: 1,
    width: "50%",
    height: 6,
    marginTop: -20,
    backgroundColor: Color.inputBox,
    opacity: 0.3,
    borderColor: Color.inputBox,
    borderWidth: 2,
  },
  input2: {
    marginLeft: 20,
    padding: 8,
    flex: 1,
    width: "50%",
    height: 6,
    marginTop: -20,
    backgroundColor: Color.inputBox,
    opacity: 0.3,
    borderColor: Color.inputBox,
    borderWidth: 2,
  },
  picker: {
    width: 120,
    height: 30,
    borderRadius: 4,
    borderColor: 'white',
    marginLeft: 40,
    backgroundColor: Color.inputBox,
    color: "white",
    flex: 1,
    padding: 10,
  },
  BorderClass: {
    borderLeftColor: '#53B6B8',
    borderLeftWidth: 5,
    borderRadius: 20,
    height: 220,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: Color.darkblue,
    //justifyContent: "center"
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    height: 500,
    width: 300

  },
  input: {
    margin: 2,
    padding: 2,
    flex: 1,

  },

  textinput: {
    margin: 10,
    padding: 8,
    backgroundColor: Color.inputBox,
    opacity: 0.3,
    borderColor: Color.inputBox,
    borderWidth: 2,
    width: 250,
    height: 20,
    borderRadius: 5,
    marginLeft: 8,
    color: '#000000',
  },

  button: {
    paddingTop: 2,
    paddingBottom: 20,
    width: 100,
    borderRadius: 12,
    marginLeft: 13,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Color.darkblue,
    alignSelf: "center"
  },
  error:{ color: 'red',
  fontSize: 12,
  marginLeft: 4,
 }


});
