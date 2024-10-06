import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Color from "../../../constants/colors";
import firebase from 'firebase';
import { AuthContext } from '../../Components/context';

export function DrawerContent({ navigation }) {

    const { signOut } = React.useContext(AuthContext);


    const signingOut = async () => {
        try {
            firebase.auth().signOut()
                .then(() => { signOut() })
                .then(() => {

                    alert("You are Successfully logged out")
                }).catch((e) => {
                    alert("You are Successfully logged out")
                    signOut()
                })


        } catch (e) {
            firebase.auth().signOut();
            signOut();
            console.log(e)
        }
    }


    const paperTheme = useTheme();

    const { toggleTheme } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: 'column', marginTop: 25, marginLeft: 30 }}>
                        <Avatar.Image
                            source={
                                require('../../assets/landing.jpeg')
                            }
                            size={100}
                            marginTop={40}
                            marginLeft={25}
                            borderColor={'blue'}
                        />
                        <View style={{ flexDirection: 'column', marginTop: 10 }}>
                            <Title style={styles.title, { marginLeft: 30 }}>John Doe</Title>

                        </View>
                    </View>


                </View>

                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Ionicons
                                name="home"
                                color={color}
                                size={25}
                            />
                        )}
                        label="Home"

                        onPress={() => navigation.navigate('superAdmin')}
                    />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <Ionicons
                                name="add-circle"
                                color={color}
                                size={25}
                            />
                        )}
                        label="Add Club"
                        onPress={() => navigation.navigate('AddClub')}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Ionicons
                                name="person"
                                color={color}
                                size={25}
                            />
                        )}
                        label="Profile"
                        onPress={() => navigation.navigate('SAProfile')}
                    />

                </Drawer.Section>
                <Drawer.Section title="Preferences">
                    <TouchableRipple onPress={() => { toggleTheme() }}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={paperTheme.dark} />
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
            </View>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Ionicons
                            name="log-out"
                            color={color}
                            size={25}
                        />
                    )}
                    label="Sign Out"
                    onPress={signingOut}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,

    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 12,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
