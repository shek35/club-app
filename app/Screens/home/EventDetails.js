import React, { useState} from 'react';
import { Text, Image, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign} from "@expo/vector-icons";
import Color from '../../../constants/colors';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('screen');

export default function EventDetails({ route }) {
  const { item } = route.params;
  const [visible, setVisible] = useState(false);
  const toggle = () => {
    setVisible(!visible);
  }
  const navigation = useNavigation();
  function navigateToClubEvents() {
    navigation.navigate("ClubEvents");
  }
  return (
    <>
    <View  style={{flexDirection:'row', paddingTop: 40}}>
              <View>
                <TouchableOpacity onPress={() => {navigateToClubEvents()}} >
                <AntDesign
                name="arrowleft"
                style={{marginLeft:10,}}
                size={24}
                color="#53B6B8"
                />
                </TouchableOpacity>
              </View>  
              <View style={{marginLeft:80}}>
                <Text style={{ fontWeight: "bold", fontSize: 30, color: Color.darkblue}}>Event Details</Text>
              </View>
    </View>
      <ScrollView
        style={{ flex: 1 , marginTop:5}}
        scrollEnabled={true}
      >
    <View>

      <Image source={{uri:item.event_image}} style={{ width: width * 0.7, height: height * 0.45, resizeMode: 'cover', alignSelf: 'center' , marginTop:5}}>
      </Image>

      </View>
        <View>
          <Text style={{alignSelf:'center', padding: 20, textAlign:'left', fontSize:15 }}>
            {item.event_description}
          </Text>
        </View>

     </ScrollView>
</>
  )

} 
