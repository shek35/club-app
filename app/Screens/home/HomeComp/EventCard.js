import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Button, Image, StyleSheet, Dimensions,} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const { width, height } = Dimensions.get('window');

export function EventCard({ item }) {


  return (
    <View style={styles.card}>
      <View style={styles.cardTitle}>
        <Text style={[styles.textTitle]}>{item.title}</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      }}>
        <View style={{ flex: 0.4 }}>
          <Text style={[styles.textSubtitle,]}>
            {item.subtitle}
          </Text>
        </View>
        <View style={{ flex: 0.6 }}>
          <Text style={[
            styles.textDate,
            {
              letterSpacing: 1,
              textAlign: 'justify'
            }
          ]}
            numberOfLines={1}
          >
            <FontAwesome
              name={'calendar-check-o'}
              size={18}
              color={'#456'}
            />
            {item.date}
          </Text>
        </View>
      </View>
      <View >
        <Image style={styles.image} source={{
          uri: item.image,
        }} />
      </View>
      <View style={{
      }}>
        <Text numberOfLines={2} ellipsizeMode={'tail'}
          style={{
            color: '#22577A',
            textAlign: "center",
            fontSize: 15,
            paddingHorizontal: 10
          }}
        >
          {item.desc}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginTop: width * 0.07 , position:'relative'}}>
              <TouchableOpacity onPress={() => { }} style={styles.touchableopacity}>
                <Text style={styles.buttontext}>Register</Text>
              </TouchableOpacity>
            </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: 'black',
    width: width*0.8,
    height: height*0.57,

  },
  cardTitle: {
    padding: width * 0.02
  },
  textTitle: {
    fontSize: width * 0.08
  },
  cardSubtitle: {
    flexDirection: "row",
    padding: width * 0.01,
    alignItems: 'center',
    justifyContent: 'space-evenly',

  },
  textSubtitle: {
    fontSize: width * 0.04,
    padding: width * 0.01,
    color: '#456',
    textAlign: 'center'
  },
  textDate: {
    fontSize: width * 0.04,
    padding: width * 0.01,
    color: '#456'
  },
  image: {
    height: width * 0.7,
    width: width * 0.7,
    resizeMode: 'contain'
  },
  touchableopacity: {
    backgroundColor: 'white',
    height: width * 0.1,
    width: width * 0.4,
    alignSelf: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    position: 'relative'
  },
  buttontext: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#456'
  },
})