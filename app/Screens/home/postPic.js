import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Image,
  Button,
  FlatList,
} from "react-native";
import Color from "../../../constants/colors";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

export default function post_pic() {
  const [image, setImage] = useState([
    {
      id: 0,
      uri: "https://i.pinimg.com/originals/5e/7e/97/5e7e9731e68f229df3a315cd63f45857.jpg",
    },
  ]);

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

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage((prevItems) => [
        ...prevItems,
        {
          id: prevItems.length,
          uri: result.uri,
        },
      ]);
    }
  };
  const ReplaceImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      let g = image[index];
      g["uri"] = result.uri;
      setImage([...image.slice(0, index), g, ...image.slice(index + 1)]);
    }
  };
  return (
    <View style={{ backgroundColor: "white", height: "100%", flex: 1 }}>
      <FlatList
        data={image}
        renderItem={({ item, index }) => (
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => ReplaceImage(index)}>
              <Image source={{ uri: item.uri }} style={styles.pic} />
              <Ionicons
                name="md-close"
                size={20}
                onPress={() =>
                  setImage([
                    ...image.slice(0, index),
                    ...image.slice(index + 1),
                  ])
                }
                style={{ position: "absolute", right: 5, top: 5 }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.button}>
        <Button
          color={Color.darkblue}
          title="Upload more Images"
          onPress={PickImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pic: {
    width: width * 0.5,
    height: width * 0.5,
    padding: 20,
    alignSelf: "center",
  },
  imageContainer: {
    justifyContent: "center",
    flex: 1,
    marginTop: 20,
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
