import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity,Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';


const AnnoForm = props => {
 const [email, setEmail] = useState();
 const [password, setPassword] = useState();
 const [username, setUsername] = useState();
/*const handleSubmit = () => {
  props.action({
   variables: {
    name: name,
    year: year,
    branch: branch,
    bio : bio

   }
  });
};*/





return (
  <ScrollView style={{marginHorizontal:16}}>
    <React.Fragment>

            <Text style={styles.h2}>No. of attendees : 120</Text>


            <Text style={styles.h3}>Consectetur adipiscing elit, sed do eiusmod tempor</Text>


            <Text style={styles.h4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>

            <Text style={{color: 'blue',alignSelf:"center"}}
                  onPress={() => Linking.openURL(www.google.com)}>
                  https://dummy.restapiexample.com/api/v1/create
            </Text>

            <Text style={styles.h2}>QR Code :</Text>
            <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/220px-QR_code_for_mobile_English_Wikipedia.svg.png'}}
                style = {{ width: 200, height: 200,alignSelf:"center" }}
            />



  </React.Fragment>
  </ScrollView>
);
}
export default AnnoForm;



const styles = StyleSheet.create({

  h2:{
    alignSelf:"center",
    marginTop:50,
     paddingTop:5,
    paddingBottom:20,
      fontSize: 24,
      color: "#064E40",
      fontWeight: 'bold'
    },
    h3:{
      alignSelf:"center",
      marginTop:20,
       paddingTop:5,
      paddingBottom:20,
        fontSize: 18,
        color: "#064E40",
        fontWeight: 'bold'
    },
    h4:{
      alignSelf:"center",
      marginTop:5,
       paddingTop:5,
      paddingBottom:20,
      color: "#008080",
      fontSize: 14

    }
});