import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function MapScreen({location}) {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.007,
              longitudeDelta: 0.007,
          }}
        >
        <MapView.Marker coordinate={{latitude: location.latitude, longitude: location.longitude}}/>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width-20,
    height: Dimensions.get("window").height/2,
  },
});
