import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Platform,
  Button,
  ScrollView,
} from "react-native";
import Color from "../../../constants/colors";
import { useState } from "react";
import { Picker } from "@react-native-community/picker";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function post_desc() {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [venue, setVenue] = useState("");
  const [link, setLink] = useState("");
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [value,setValue] = useState(date);


  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
    setValue(date);
  };

  const showTimepicker = () => {
    showMode("time");
    setValue(time);

  };

  const onChange = (event, selectedDate ) => {
    if (mode == "date") {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === "ios");
      setDate(currentDate);
    }
    if (mode == "time") {
      const currentTime = selectedDate || time;
      setShow(Platform.OS === "ios");
      setTime(currentTime);

    }
  };
  return (
    <ScrollView style={styles.scroll}>
      <View>
        <View style={styles.inputs}>
          <TextInput
            multiline
            name="postDescription"
            style={styles.input}
            placeholder={"Say something about this post"}
            placeholderTextColor={"#000"}
            onChangeText={(text) => {
              setDescription(text);
            }}
            value={description}
          />

          <View>
            <TouchableOpacity onPress={showDatepicker} style={styles.input}>
              <Text>Date</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={showTimepicker} style={styles.input}>
            <Text>Time</Text>
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={value}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <Picker
            style={styles.picker}
            selectedValue={venue}
            enabled={true}
            onValueChange={(value) => {
              setVenue(value);
            }}
          >
            <Picker.Item label="Select Venue" value="" />
            <Picker.Item label="Venue 1" value="Venue 1" />
            <Picker.Item label="Venue 2" value="Venue 2" />
          </Picker>
          <TextInput
            name="RSVPLink"
            style={styles.input}
            placeholder={"RSVP Link"}
            placeholderTextColor={"#000"}
            onChangeText={(text) => {
              setLink(text);
            }}
            value={link}
          />
          <View style={styles.button}>
        <Button
          color={Color.darkblue}
          title="Done"
          onPress={()=>{}}
        />
      </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
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
  button: {
    width: 180,
    borderRadius: 12,
    paddingLeft: 10,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
});
