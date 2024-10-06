import React, { Component, useState } from 'react'
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity, Button} from 'react-native'
import { SearchBar } from 'react-native-elements';
import {cardInfo} from '../Home.js'
import { Card } from 'react-native-paper';
import labels from "./labels";
import colors from '../../../../constants/colors.js';
import { Dimensions } from 'react-native';
import { AntDesign} from "@expo/vector-icons";

const { width, height } = Dimensions.get('screen');


// class  _searchBar extends Component {
   
//     constructor(){
//         super();
//         this.state = {
//             searchValue: ""
//         }
//         this.updateSearchValue = this.updateSearchValue.bind(this)
//         this.arrayholder =[];
//     }

//     updateSearchValue(newValue) {
//         this.setState({
//             searchValue: newValue
//         })
//     }
    
    
// }


class FlatListDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      labels: labels,
      cardInfo: cardInfo,
      data: cardInfo,
      //error: null,
    };
  }

  onpress(id){
    this.setState(prevState => ({
    
    data: prevState.data.map(
      el => el.id === id? { ...el, following: !el.following }: el
    )

    }))
  };

  searchFilterFunction = text => {
    this.setState({
      loading: true,
    });
    setTimeout(()=>{
      this.setState({loading:false});
    },500);

    const filteredLabels = this.state.labels.filter(item => {    //filters labels and gets cards with id which is set to State data 
      const itemData = `${item.label.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    }); 

    const distCards = new Set();                                   
    filteredLabels.forEach(item => item.cards.forEach(distCards.add, distCards));   
    
    const newData = this.state.cardInfo.filter(item => {return distCards.has(item.id);});
    
    this.setState({
      data: newData,
    });
  };
    render(){
        return (
            <>
            <View style={{paddingTop: 24, paddingLeft: 8, marginTop:20,flexDirection:'row'}}>
            <View style={{paddingTop:10}}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Home')}} >
                       <AntDesign
                           name="arrowleft"
                           style={{marginLeft:10,}}
                           size={28}
                           color="#53B6B8"
                        />
            </TouchableOpacity>
            </View>
            <View style={{paddingLeft:5}}>
            <SearchBar platform="android" showLoading= {this.state.loading}
            //inputContainerStyle ={{borderRadius:10, borderColor:colors.blue}}
            containerStyle ={{paddingTop:2,width:320,height:50,borderRadius:10, borderColor:colors.blue,borderWidth:1,margin:5}}
                defaultValue={this.state.searchValue}
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}   
            />
            </View>
            </View>
            <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <Card style={styles.card} 
              onPress={() => {
                this.props.navigation.navigate("club");}}>
              <View style={styles.column, styles.BorderClass}>
                <View style={{alignItems:'center',padding:15}}>
                  <Text style={styles.text}>{item.title}</Text> 
                </View>
                <View style={styles.row}>
                  <View style={{flex:0.3}}>
                    <Image source={item.image} style={styles.img} />
                  </View>
                  <View style={styles.ti}> 
                    <TouchableOpacity style={styles.followButton} onPress={()=>this.onpress(item.id)}>
                      <Text style={styles.buttonText}>{item.following?"UNFOLLOW":"FOLLOW"}</Text>
                    </TouchableOpacity> 
                    <Button onPress = {()=>this.props.navigation.navigate("ClubEvents",{clubname : item.title,clublogo: item.image})} title="Events" color='#53B6B8'></Button>
                  </View>
                  {/* <View style={{flex:0.1,justifyContent:"center"}}>
                    <TouchableOpacity onPress = {()=>this.props.navigation.navigate('club')}>
                      <Ionicons name = "chevron-forward-outline" style={styles.icon} size={24} color="#53B6B8" />
                    </TouchableOpacity>
                  </View> */}
                </View>
              </View>
            </Card>
            )}
            /> 
            
            </>
        );
    }
  }
export default FlatListDemo

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    shadowOffset: { width: 3, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 1,
    marginBottom: 10,
    height:200,
    width:"87%",
    borderRadius:20,
    alignSelf:"center",
    elevation:5,
    margin: 20,
    marginVertical: 30

  },

  column: {
    flexDirection:'column',
  },

  row: {
    flexDirection:'row',
  },

  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  },

  ti: {
    alignItems: "stretch",
    fontSize:20,
    flexDirection:'column',
    justifyContent:'space-evenly',
    flex:0.6,
    marginLeft:60,
    marginTop: -30

    
  },

  text: { 
    color: '#22577A', 
    fontWeight: '700', 
    fontSize: 16, 
  },

  img: {
    width:100,
    height:100,
    borderRadius: 50,
    marginBottom:50,
    marginLeft: 20,
    borderColor:"#000000",
    borderWidth:1,
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    height: 20,
    marginTop: -45
  },

  touchableopacity: {
    backgroundColor: 'white',
    height: width * 0.1,
    width: width * 0.4,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  followButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#22577A',
  },
  BorderClass: {
    borderLeftColor : '#53B6B8',
    borderLeftWidth : 6,
    borderRadius: 20
    }

});