import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Animated,
    Easing,
    Text,
} from 'react-native';


let rotateValueHolder = new Animated.Value(0);

const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
});

export default class landingPage extends Component {

    componentDidMount() {
        this.startImageRotateFunction()
        this.timeoutHandle = setTimeout(() => {
            this.props.navigation.navigate("dummyPage")
        }, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
    }


    startImageRotateFunction = () => {

        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder, {
            toValue: 1,
            duration: 9000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => startImageRotateFunction());
    };


    renderOverlay = () => {
        return (
            <View style={styles.overlay}>
                <Text style={styles.textStyle}>Club App</Text>
            </View>
        );
    }


    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Animated.Image
                        style={{
                            width: 200,
                            height: 200,
                            transform: [{ rotate: rotateData }],
                        }}
                        source={require('../../assets/landing.jpeg')}
                    />
                    {this.renderOverlay()}
                </View>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    titleText: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 20,
    },
    textStyle: {
        textAlign: 'center',
        color: '#349799'
    },
    buttonStyle: {
        fontSize: 16,
        backgroundColor: '#53B6B8',
        padding: 5,
        marginTop: 32,
        minWidth: 250,
    },
    buttonTextStyle: {
        padding: 5,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    overlay: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});
