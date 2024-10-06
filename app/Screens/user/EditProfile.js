import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
// import styled from 'styled-components/native';
import { Avatar } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { AntDesign} from "@expo/vector-icons";
import * as firebase from "firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const EditProfile = props => {
    const [email, setEmail] = useState();
    const [jyear, setjyear] = useState("")
    const [branch, setbranch] = useState("")
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [user, setuser] = useState({})



    useEffect(() => {

        async function fetch () {
            try {

              let userid = await AsyncStorage.getItem("userid");
              console.log(userid);
              const fetchDetails = await firebase
                    .firestore()
                    .collection("users")
                    .doc("sjce")
                    .collection("clg_users")
                    //  .doc(username)
                    //.collection(role)
                    .where("emailuid", "==", userid)
                    .get();
                  if (fetchDetails.docs.length > 0) {
                       setuser(fetchDetails.docs[0].data())
                       setUsername(fetchDetails.docs[0].data().name)
                       setbranch(fetchDetails.docs[0].data().branch)
                       setjyear(fetchDetails.docs[0].data().jyear)
                  }
              
            } catch (e) {
              console.log(e);
            }
        }
        fetch()
       
      }, [])


 
    const handleSubmit = async() => {
            try {

              let userid = await AsyncStorage.getItem("userid");
              console.log(userid);
                  await firebase
                    .firestore()
                    .collection("users")
                    .doc("sjce")
                    .collection("clg_users")
                    .doc(user.name)
                    .update({
                        name: username,
                        branch: branch,
                        jyear: jyear,
                      })
                    .then(()=>{
                        alert("Update Sucessfull !!");
                    })
                 
              
            } catch (e) {
              console.log(e);
              alert("Update failed!!");
            }
       
    };



    const { width, height } = Dimensions.get("screen");
    return (
        <View>
            <View style={{ marginTop:40}}>
            <TouchableOpacity onPress={() => {props.navigation.navigate("Profile")}} >
                       <AntDesign
                           name="arrowleft"
                           style={{marginLeft:10,}}
                           size={24}
                           color="#53B6B8"
                        />
                    </TouchableOpacity>
            </View>
       
           <ScrollView>
            <React.Fragment>
                <View>
                    {/* <Text style={styles.text}>Edit Profile</Text> */}
                    <Avatar
                        source={{
                            uri:
                                'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        }}
                        containerStyle={{ alignSelf: "center", marginTop: height*0.08 }}
                        size={100}
                        rounded
                    />
                    {/* <Icon name={'pencil'} size={20} containerStyle={styles.icon} onPress={console.log('I was clicked')} rounded />
  */}
                </View>
 
 
                <View style={styles.wrapper}>
                    <Text style={styles.FormLabel}>Name</Text>
                    <TextInput style={[styles.StyledInput, styles.submit]}
                        textContentType="name"
                        autoFocus={true}
                        value={username}
                        autoCapitalize="none"
                        onChangeText={text => setUsername(text)}

                    />
 
                    <Text style={styles.FormLabel}>Year of Joining</Text>
                    <TextInput style={[styles.StyledInput, styles.submit]}
                        onChangeText={text => setjyear(text)}
                        value={jyear}
                        autoCapitalize="none"
                    />
 

                    <Text style={styles.FormLabel}>Branch</Text>
                    <TextInput style={[styles.StyledInput, styles.submit]}
                         value={branch}
                         onChangeText={text => setbranch(text)}
                         autoCapitalize="characters"

                    />
 
 
                    <Text style={styles.FormLabel}>Bio</Text>
                    <TextInput onChangeText={text => setInput({ ...input, body: text })}
                        multiline={true}
                        numberOfLines={3}
                        placeholder=""
                        underlineColorAndroid='transparent'
                        require={true} style={{
                            height: 80, marginRight: 1,
                            marginLeft: 1,
                            marginTop: 10,
                            paddingTop: 5,
                            paddingBottom: 20,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#C8C8C8',
                            backgroundColor: '#53B6B8',
                            opacity: 0.19,
                        }} type="textarea"
                        name="textValue"
                    />
                    <TouchableOpacity onPress={handleSubmit} style={[styles.FormButton, styles.submit]}>
                        <Text style={styles.BtnText}>Done</Text>
                    </TouchableOpacity>
 
                </View>
            </React.Fragment>
           </ScrollView>
        </View>
    );
}
export default EditProfile;
 
 
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 20,
        marginRight: 35,
        marginLeft: 35
    },
    text: {
        marginTop: 20,
        alignSelf: "center",
        fontSize: 27,
        fontWeight: 'bold'
    },
    submit: {
        marginRight: 1,
        marginLeft: 1,
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C8C8C8'
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
    },
    FormLabel: {
        fontSize: 16,
        color: "#585858",
 
    },
 
    StyledInput: {
        borderWidth: 1,
        borderColor: "gray",
        fontSize: 18,
        padding: 5,
        marginBottom: 25,
        backgroundColor: "#53B6B8",
        opacity: 0.19,
        height: 50,
    },
    FormButton: {
        backgroundColor: "#22577A",
        width: "100%",
        height: 70,
        padding: 8,
        marginBottom: 30
    },
    BtnText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        paddingTop: 15,
    },
    icon: {
        width: 100,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ccc',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        marginTop: 20,
        marginRight: 50,
        bottom: 0,
        marginLeft: 50,
    }
 
});
 
 

