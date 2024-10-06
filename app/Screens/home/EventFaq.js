import React, { useState } from 'react'
import { View, Text, TouchableOpacity,TextInput, StyleSheet, FlatList } from 'react-native'
import {Ionicons} from '@expo/vector-icons';

export default function EventFaq() {

    const [people,setPeople] = useState([
        {id: '1',ques: 'What Is This Club For',ans: 'The Editorial Board is a student literature club responsible for bringing out Jayzine, our universitys annual magazine. We take pride in organizing Shabd, the only literary fest held by an engineering college in Karnataka'},
        {id: '2',ques: 'Events Held By Club',ans: 'The club organizes many events and their main yearly event is called Shabd'},
        {id: '3',ques: 'Club Domain',ans: 'Club main domain focus is on the literary and art fields'},
    
        ]);

    const [newQuestion, setNewQuestion] = useState();

    const handleAddQuestion = () => {
      console.log(newQuestion);
    };
    
    return (
        <View style={{ flex: 1,}}>
            <View style={{backgroundColor: '#fff'}}>
                <FlatList
                    data={people}
                    renderItem={({ item }) => (
                    <View  style={styles.container}>
                    <View><Text style={styles.item}>{item.ques}</Text></View>
                    <View><Text style={styles.amd}>{item.ans}</Text></View>
                    </View>
                    )}
                />
            </View>
            {/* <View style={styles.inputs}>
                <TextInput placeholder='Ask Somthing...'placeholderTextColor='#22577A' style={styles.placeh}/>
            </View> */}

            <View style={styles.wrapTextInput}>
                <TextInput
                    style={styles.input}
                    placeholder={'   type your question here'}
                    value={newQuestion}
                    onChangeText={text => setNewQuestion(text)}
                />
                <View style={styles.addWraper}>
                <TouchableOpacity onPress={() => handleAddQuestion()}>
                    <Ionicons
                    style={styles.send}
                    name="paper-plane"
                    size={24}></Ionicons>
                </TouchableOpacity>
                </View>
          </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: 'blue',
        margin: 10,
       },
    
      item: {
        fontSize: 25,
        color: '#22577A',
        paddingLeft: 10,
      },
    
      placeh: {
        height: 45,
        // borderColor:'',
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor:'#E1FEFF'
      },
      head: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 60,
        color: '#22577A',
        marginBottom: 20,
    
      },
    
      inputs: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal:10
      },
    
      amd: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: "500",
        fontSize: 17,
        padding: 10,
      },
      wrapTextInput: {
        position: "absolute",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        bottom:0,
        right:0,
        left:0
       
      },
    
      input: {
        // marginTop: 80,
        backgroundColor: '#53B6B8',
        borderRadius: 10,
        width: 300,
        borderColor: '#63C5DA',
        borderWidth: 1,
        height:60,
      },
    
      addWraper: {
        // marginTop: 80,
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      send: {
        flexDirection: 'row',
      },
    
    
    }); 