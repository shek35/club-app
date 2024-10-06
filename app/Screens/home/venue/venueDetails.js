import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import MapScreen from "./mapsAPI";

function venueDetails({ route }) {
  return (
    <ScrollView>
      <View style={styles.detailsContainer}>
        <Text style={[styles.textH2, { paddingTop: 10 }]}>Details</Text>
        <View style={styles.details}>
          <Text style={{ color: "#53B6B8", textAlign: "justify" }}>
            {route.params.item.info}
          </Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.textH2}>Reaching Here</Text>
        <View style={styles.details}>
          <MapScreen location={{latitude: route.params.item.latitude, longitude: route.params.item.longitude, }}/>
        </View>
      </View>
    </ScrollView>
  );
}

export default venueDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    borderColor: "#53B6B8",
    borderWidth: 1,
    padding: 20,
    margin: 10,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  textH2: {
    fontWeight: "600",
    fontSize: 20,
    color: "#38A3A5",
    paddingLeft: 20,
  },
});
