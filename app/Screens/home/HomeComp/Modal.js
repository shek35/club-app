import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, Animated, Modal, TouchableOpacity } from 'react-native';
import { EventCard } from './EventCard';
import { DATA } from './DATA';
import Icon from 'react-native-vector-icons/Ionicons';



const { width, height } = Dimensions.get('screen');




const Indicator = ({ scrollX, DATA }) => {
  return (
    <View style={{ position: 'relative', flexDirection: 'row' }}>
      {DATA.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp'
        })

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 1, 0.6],
          extrapolate: 'clamp'
        })
        return (
          <Animated.View
            key={`indicator-${index}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              opacity,
              backgroundColor: '#333',
              margin: 10,
              transform: [
                {
                  scale,
                }
              ]
            }}
          >
          </Animated.View>
        )
      })}
    </View>
  )
}

export default function ModalComponent() {

  const [show, setshow] = useState(true)


  const scrollX = React.useRef(new Animated.Value(0)).current
  return (

    <Modal
      visible={show}
      transparent={true}
      animationType={'fade'}
      onRequestClose={() => {
        setshow(false);
      }}
    >

      <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} >
        <View style={styles.modal}>
          <View style={[styles.container]}>
            <View style={{ flexDirection: 'row-reverse', marginTop: 9 }}>
              <View style={{ flex: 0.15, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setshow(false) }}>
                  <Icon name="close-circle-sharp" size={27} color="#fffff4" />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.85, alignItems: 'flex-end', paddingBottom:5 }}>
                <Text style={{ fontSize: 29, color: 'white', fontWeight: 'bold' }}>Upcoming Events</Text>
              </View>
            </View>
            <Animated.FlatList
              data={DATA}
              keyExtractor={item => String(item.key)}
              horizontal
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }]
              )}
              pagingEnabled
              contentContainerStyle={{ paddingBottom: 100 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={{ width: width * 0.9, alignItems: 'center' }}>
                    <View style={styles.whitecard}>
                      <EventCard item={item} />
                    </View>
                  </View>
                )
              }}
            />
            <Indicator scrollX={scrollX} DATA={DATA} />

          </View>
        </View>
      </View>

    </Modal>


  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#53B6B8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: height * 0.7,
  },
  button: {
    color: 'white'
  },
  touchableopacity: {
    backgroundColor: 'white',
    height: width * 0.1,
    width: width * 0.4,
    alignSelf: 'center',
    borderRadius: 25,
    justifyContent: 'center'
  },
  buttontext: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#22577A'
  },
  whitecard: {
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 25,

  },
  modal: {
    borderRadius: 30,
    width: "90%",
    height: "90%",
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: height / 10,
  },
});

