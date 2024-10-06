import React from 'react';
import { Text, View, FlatList, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons,AntDesign } from "@expo/vector-icons";
import Color from '../../../../constants/colors';

const venuesData = [
    {
        name: "IS Seminar Hall 1",
        details: "IS building, Golden Jubilee", 
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",   
        latitude: 12.31593345495094, 
        longitude: 76.61403036876949,
    },
    {
        name: "IS Seminar Hall 2",
        details: "IS building, Golden Jubilee", 
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",   
        latitude: 12.31593345495094, 
        longitude: 76.61403036876949,
    },
    {
        name: "Mech Auditorium",
        details: "Near Quadrangle", 
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",   
        latitude: 12.314243600562646,
        longitude:  76.61262410414298,
    },
    {
        name: "Nescafe",
        details: "Near Mech Auditorium", 
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",   
        latitude: 12.314494252691006, 
        longitude: 76.61247991025233,
    },
    {
        name: "Yampa",
        details: "Near Entrance", 
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",   
        latitude: 12.313762498131554, 
        longitude: 76.6148290521794,
    },
];
const venues = venuesData.concat(venuesData);

const VenueList = ({item,navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('venueDetails',{item})}>
            <View style={styles.item}>
                <View style={styles.center}><Ionicons name="location" style={styles.locationicon} size={36} color="#38A3A5" /></View>

                <View style={styles.layout}>
                    <Text style={styles.venueColor}>{item.name}</Text>
                    <Text style={styles.detailsColor}>{item.details}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function venue({navigation}) {
    return (
        <View style={styles.container}>
            <View  style={{flexDirection:'row', paddingTop: 40}}>
              <View>
                <TouchableOpacity onPress={() => {navigation.navigate('Home')}} >
                 <AntDesign
                name="arrowleft"
                style={{marginLeft:10,}}
                size={24}
                color="#53B6B8"
                />
                </TouchableOpacity>
              </View>  
              <View style={{marginLeft:130}}>
                <Text style={{ fontWeight: "bold", fontSize: 30, color: Color.darkblue, }}>Venue</Text>
              </View>
            </View> 
            <FlatList
                data={venues}
                renderItem={ ({item}) => {
                    return (
                        <VenueList item={item} navigation={navigation}/>
                    );
                }}>

            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white",
    },
    item: {
        flex:1,
      backgroundColor: 'white',
      padding:10,
      borderBottomWidth:0.5,
      borderColor:"#22577A63",
      flexDirection: "row",
    },
    venueColor: {
      color:"#22577A",
      fontSize:16,
    },
    detailsColor:{
        color:"#22577A8F",
        fontSize:14,
        paddingTop:9,
    },
    layout:{
        flex:1,
        flexDirection: "column",
    },
    center:{
      justifyContent:"center",
      alignItems:"center",  
      margin:10,
    },
  });


export default venue