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
const { width, height } = Dimensions.get("screen");

export default function DeleteModal({ modalVisible, selectedItem, onClose, db }) {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.input}>
              <Text style={{ fontSize: 15 }}>
                Do you want to delete this club?
     </Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.5, margin: 5, marginVertical: 30 }}>
                  <Button title="OK" onPress={() => {
                    if (selectedItem) {
                      db.collection('/users/sjce/club_admin')
                        .doc(selectedItem.item.club_name)
                        .delete()

                        db.collection('/data/sjce/clubs')
                        .doc(selectedItem.item.club_name)
                        .delete()

                  
                      onClose()//Close the modal after deleting
                    }
                  }}>

                  </Button>
                </View>
                <View style={{ flex: 0.5, margin: 5, marginVertical: 30 }}>
                  <Button title="No" onPress={() => {

                    onClose()
                  }}>

                  </Button>
                </View>

              </View>
            </View>
          </View>
        </View>
      </View>

    </Modal>
  )
}


const styles = StyleSheet.create({
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
    height: height * 0.2,
    width: width * 0.7

  },
  input: {
    margin: 2,
    padding: 2,
    flex: 1,

  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    marginTop: height / 10,
    height: '90%'
  },

});