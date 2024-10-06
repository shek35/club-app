import React, { Component,useState } from 'react'
import { FlatList,View, Text,StyleSheet,Image } from 'react-native'
import { Button, Card } from 'react-native-paper'
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { eventdata } from './Events';
import {withNavigation} from 'react-navigation';
import firebase from 'firebase';
import { useEffect } from "react";
import club from './club';
import Color from "../../../constants/colors";

const { width,height } = Dimensions.get('screen');



function ClubEvents({navigation,route}) {
const [eventdata,setEventdata] = useState([]);
const [clubName, setClubName] = useState([]);
console.log(route.params.clublogo)
console.log(route.params.clubname)
var db = firebase.firestore();
const path =`/data/46lQiUlpdWZ57ycOtAOy/sjce/CAYkj0SMOrkFVDHquPTU/clubs/uMUK3fIWfWAA6RwTmYX7/${route.params.clubname}`
var club_collection;
useEffect(() => {
db.collection(path).get().then((querySnapshot)=>{
    const club_name=[];
    querySnapshot.forEach((doc)=>{
        club_name.push({...doc.data(), key: doc.id})
        //console.log(`${doc.id}`)
        club_collection=doc.id
    })
    setClubName(club_name)
    club_name.forEach((club)=>{
       // console.log(club.club_logo)
        const events=[];
        db.collection(path+`/`+club_collection+`/`+`events`).onSnapshot((snapshot)=>{
          snapshot.forEach((data) => {
            events.push({...data.data(), key: data.id})
           // console.log(`${data.id}`)
           console.log(club_collection)
          })
        setEventdata(events)
        })
        
    })
})

}, [])
    return (
        <View>
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
              <View style={{marginLeft:90}}>
                <Text style={{ fontWeight: "bold", fontSize: 30, color: Color.darkblue}}>Club Events</Text>
              </View>
            </View> 
        
        <FlatList
        data ={eventdata}
        renderItem={({item}) => (
            <Card style={styles.card}>
              <View style={styles.BorderClass}>
                  {/* <TouchableOpacity style={styles.logo} onPress={()=>{navigation.navigate('club')}}>    */}
                      <View style={{flexDirection:'row',padding:5}}>
                         <Image source={route.params.clublogo} style={styles.club} /> 
                         <View>
                             <Text style={{padding:5,marginTop:2.5}}>{route.params.clubname}</Text>
                         </View>
                       </View>
                  {/* </TouchableOpacity> */}
                 <View style={styles.container}>
                     <Image source={{uri : item.event_image}} style={styles.img}/>
                     { <Text style={styles.text}>{item.event_name}</Text> }
                     <TouchableOpacity onPress={() => {navigation.navigate('EventDetails', { item: item })}}>
                     <View style={{ marginVertical: 10 }}>
                        <Text
                          numberOfLines={3}
                          ellipsizeMode={'tail'}
                          style={{
                            textAlignVertical: 'center',
                            textAlign: 'center',
                          }}>
                          {item.event_description}
                        </Text>
                      </View>

                     </TouchableOpacity>
                 </View>
                  <View style={{flexDirection:'row',padding:15,borderTopColor:'black',borderTopWidth:1,alignSelf:'center'}}>
                     <TouchableOpacity style={{marginRight:90}} onPress={()=>{navigation.navigate('RSVP')}}>
                        <Ionicons name="arrow-undo-outline" size={25} color="black" styles={styles.rsvp}/>
                        <Text>RSVP</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={{marginLeft:90}} onPress={()=>{navigation.navigate('EventFaq')}}>
                       <MaterialCommunityIcons name="comment-question-outline" size={25} color="black" styles={styles.faq}/>
                       <Text>FAQ</Text>
                     </TouchableOpacity>
                  </View>  
              </View>  
            </Card>
         ) }
        />
      </View>  
    )
}
const styles=StyleSheet.create({
    card:{                                                        
        backgroundColor:'#fff', 
        shadowOffset: { width: 3, height: 3 },
        shadowColor: '#000',
        shadowOpacity: 2,
        marginTop:20,
        marginBottom: 10,
        height:650,
        width:"85%",
        borderRadius:30,
        alignSelf:"center",
        elevation:5,
        
        
    },
    logo:{                                                  //For club logo at top left
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        paddingBottom:2.5,
        width:150,
        height:60,
        backgroundColor:'#fff',
        shadowColor: '#fff',
          
    },
    text:{                                                   //Text below the post
        fontSize:15,
        textAlign:'center',
    },
    img:{                                                   //Event image 
        width:'90%',
        height:400,
        alignSelf:'center',
       // marginLeft:30,
      //  marginTop:15,
    },
    container:{                                               //Combined space for event image and text
        height:500,
        width:'90%',
        alignSelf:'center',
        alignItems:'center',
    },
    club:{                                                    
        height:40,
        width:40,
        borderRadius:20,
        //marginLeft:5,
        //marginTop:5,
        // marginBottom:5,
        //marg
    },
    BorderClass: {
        borderColor: "#53B6B8",
        borderLeftWidth: 5,
        borderRadius: 20,
        height: 650,
        shadowOpacity: 4
      },
})

export default withNavigation(ClubEvents)





