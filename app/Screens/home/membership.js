import React, { Component} from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import Color from '../../../constants/colors';
import { Dimensions } from 'react-native';
import {AntDesign} from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');


const details = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
const phone = 1234567890;
const email = 'example@example.com'
class membership extends Component {

    render(){
        return (
          <View>
                <View  style={{flexDirection:'row', paddingTop: 40}}>
                 <View>
                   <TouchableOpacity onPress={() => {this.props.navigation.navigate('club')}} >
                    <AntDesign
                    name="arrowleft"
                    style={{marginLeft:10,}}
                    size={24}
                    color="#53B6B8"
                    />
                   </TouchableOpacity>
                 </View>  
                 <View style={{marginLeft:85}}>
                   <Text style={{ fontWeight: "bold", fontSize: 30, color: Color.darkblue}}>Membership</Text>
                 </View>
                </View>
          
            <ScrollView>
                <View style={styles.detailsContainer}>
                    <Text style={[styles.textH2,{paddingTop: 10,}]}>Details</Text>
                    <View style={styles.details}>
                        <View style={{width: width*.6}}>
                            <Text style={{color: "#53B6B8"}}>{details}</Text>
                        </View>
                        <View style={styles.imgCenter}>
                            <Image source={{uri: "https://www.dummies.com/wp-content/uploads/324172.image0.jpg"}} style={styles.img} />
                        </View>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.textH2}>Contact</Text>
                    <View style={styles.contact}>
                        <View style={styles.row}>
                            <Text style={styles.phoneAndEmail}>Phone:</Text>
                            <Text style={{color: "#53B6B8"}}>{phone}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.phoneAndEmail}>Email:</Text>
                            <Text style={{color: "#53B6B8"}}>{email}</Text>
                        </View>   
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.textH2}>Membership</Text>
                </View>
                <View style={styles.bottomText}>
                    <Text style={{color: "#53B6B8"}}>{details}</Text>
                </View>


            </ScrollView>
          </View>    
        )
    }
}

export default membership

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
    },
    detailsContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    details: {
        flex:1,
        flexDirection: 'row',
        borderColor:'#53B6B8',
        borderWidth: 1,
        padding:20,
        margin:10,
        borderLeftWidth:0,
        borderRightWidth:0,
    },
    contact: {
        flex:1,
        flexDirection: 'column',
        borderColor:'#53B6B8',
        borderWidth:1,
        padding:20,
        margin:10,
        borderLeftWidth:0,
        borderRightWidth:0,
    },
    bottomText: {
        flex:1,
        flexDirection: 'column',
        borderColor:'#53B6B8',
        borderTopWidth:1,
        padding:20,
        margin:10,
    },
    imgCenter :{
        margin:10, 
        justifyContent:'center', 
        alignItems:'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        color: Color.darkblue,
    },

    phoneAndEmail :{
        color: Color.darkblue,
        fontWeight: '500',
        paddingRight: 10,
    },
    
    textH2: {
        fontWeight: '600',
        fontSize: 20,
        color: "#53B6B8",
        paddingLeft:20,
    },
    img: {
        width: width*.25,
        height: width*.25,
      },
})