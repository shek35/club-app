import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import BasicTimeLine from "./timeLine";
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons';
import Color from '../../../constants/colors';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    return (
      <>
      <View  style={{flexDirection:'row', paddingTop: 40}}>
        <View>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Home')}} >
              <AntDesign
                name="arrowleft"
                style={{marginLeft:10,}}
                size={24}
                color="#53B6B8"
                />
          </TouchableOpacity>
        </View>  
        <View style={{marginLeft:110}}>
          <Text style={{ fontWeight: "bold", fontSize: 30, color: Color.darkblue}}>Calendar</Text>
        </View>
      </View>    
        <View style = {styles.boom}>
          
        <CalendarPicker
          
          previousTitle="<<"
          nextTitle=">>"

          length="30"
          scaleFactor="420"
          textStyle={{
            fontSize: 20,
            fontFamily:"Roboto",
            color: "#00008b"
          }}
          selectedDayColor="#ffa500"
          onDateChange={this.onDateChange}
        />
        </View>

        <BasicTimeLine />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: "#fffff0",
    marginTop: 10,
  },
  boom: {backgroundColor: "#fffff0"}
});
