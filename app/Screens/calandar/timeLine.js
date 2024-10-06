// Show Timeline using React Native Timeline ListView
// https://aboutreact.com/react-native-timeline-listview/

// import React in our code
import React from 'react';

// import all the components we are going to use
import { StyleSheet, Text, View,Platform} from 'react-native';

// import Timeline
import Timeline from 'react-native-timeline-flatlist';

const BasicTimeLine = () => {
  const data = [
    {
      // time: '09:00',
      title: 'Event 1',

      description:
        'Lorem Ipsum is simply dummy text of the printing.',
      circleColor: '#22577A',
      lineColor: '#22577A'
    },
    {
      // time: '10:45',
      title: 'Event 2',
      description:
        'Lorem Ipsum is simply dummy text of the printing.',
        circleColor: '#22577A',
        lineColor: '#22577A'
    },
    {
      // time: '12:00',
      title: 'Event 3',
      description:
        'Lorem Ipsum is simply dummy text of the printing.',
        circleColor: '#22577A',
        lineColor: '#22577A'
    },
    {
      // time: '14:00',
      title: 'Event 4',
      description:
        'Lorem Ipsum is simply dummy text of the printing.',
        circleColor: '#22577A',
        lineColor: '#22577A'
    },
    {
      // time: '16:30',
      title: 'Event 5',
      description:
        'Lorem Ipsum is simply dummy text of the printing.',
        circleColor: '#22577A',
        lineColor: '#22577A'
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <View style={styles.CircleShapeClubD} />
      <Text style={styles.ClubTextD}>Club D</Text>
      <View style={styles.CircleShapeClubC} />
      <Text style={styles.ClubTextC}>Club C</Text>
      {/* <Text>Hello</Text> */}
      <Timeline data={data} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 16,
    fontSize: 20,
    textAlign: 'left',
    fontWeight: '600',
    color: '#22577A',
    marginLeft: 40


  },
  CircleShapeClubD: {
    width: 29,
    height: 29,
    // position:'absolute',
    marginBottom:10,
    marginLeft:53,
    borderRadius: 150 / 2,
    backgroundColor: '#57CC99',
  },
  CircleShapeClubC: {
    width: 29,
    height: 29,
    borderRadius: 150 / 2,
    backgroundColor: '#F5D45C',
    marginLeft:53,
    marginBottom:40,
    marginTop:30
  },
  ClubTextD: {
    textAlign:'center',
    marginBottom:-10,
    marginTop:-36,
    fontWeight: '500',
    fontSize: 15,
    color: '#22577A',
    marginLeft:-150,


    
  },
  ClubTextC: {
    textAlign:'center',
    marginBottom:20,
    marginTop:-68,
    fontWeight: '500',
    fontSize: 15,
    color: '#22577A',
    marginLeft:-150,


    
  },
});

export default BasicTimeLine;