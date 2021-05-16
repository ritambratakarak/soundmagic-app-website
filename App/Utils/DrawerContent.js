import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableHighlight, ImageBackground } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONT, HEIGHT } from './constants';
import Ripple from 'react-native-material-ripple';
import LinearGradient from 'react-native-linear-gradient';
const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../Redux/Actions/authAction'

const DrawerContent = (props) => {
    // const [user, setUserId] = useState(userId)
    const userdata = useSelector((state) => state.userdata);
    const [userMe, setUser] = React.useState(null)
    const dispatch = useDispatch()

    React.useEffect(() => {
        let user = userdata && userdata
        setUser(user);
    }, [userdata]);


    const handleLogout = async () => {
        const isSignin = await AsyncStorage.removeItem('@user')
        dispatch(logoutUser(isSignin))
    }


    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1, backgroundColor: "gray", }} />
            <View style={{ height: screenheight }}>

                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 40 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Profile")} activeOpacity={1}>
                        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#A54729', '#2D4DBE']} style={{ width: "100%", height: HEIGHT * 0.38, alignItems: "center", justifyContent: "center" }}>
                            <ImageBackground source={require('../Assets/Ellipse.png')} style={{ width: 150, height: 150, alignItems: "center", justifyContent: "center" }}>
                                <Image source={userMe && userMe.image == '' ? require('../Assets/Home/image.png') : { uri: userMe && userMe.profile_image }} style={{ borderRadius: HEIGHT / 2, height: 100, width: 100 }} />
                            </ImageBackground>
                            <View style={{ marginTop: 15 }}>
                                <Text style={{ fontSize: FONT.SIZE.VERYLARGE, color: COLORS.WHITE, textAlign: "center", fontFamily: FONT.FAMILY.SEMI_BOLD }}>{`${userMe && userMe.fname + ' ' + userMe.lname}`}</Text>
                                <Text style={{ color: COLORS.WHITE, fontSize: FONT.SIZE.SMALL, fontFamily: FONT.FAMILY.REGULAR, textAlign: "center" }}>{`${userMe && userMe.email}`}</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{}}>
                        <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={styles.menuList} onPress={()=> props.navigation.navigate("Profile")}>
                            <Feather
                                name="user"
                                size={25}
                                color={'gray'}
                            />
                            <View style={{ paddingLeft: 15, paddingTop:5 }}>
                                <Text style={styles.menuName}>Profile</Text>
                            </View>
                        </Ripple>
                        <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={styles.menuList}>
                            <SimpleLineIcons
                                name="graduation"
                                size={25}
                                color={'gray'}
                            />
                            <View style={{ paddingLeft: 15 }}>
                                <Text style={styles.menuName}>My Course</Text>
                            </View>
                        </Ripple>


                        <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={styles.menuList}>
                            <Feather
                                name="bookmark"
                                size={25}
                                color={'gray'}
                            />
                            <View style={{ paddingLeft: 15 }}>
                                <Text style={styles.menuName}>Bookmarks</Text>
                            </View>
                        </Ripple>


                        <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={styles.menuList}>
                            <FontAwesome
                                name="photo"
                                size={25}
                                color={'gray'}
                            />
                            <View style={{ paddingLeft: 15 }}>
                                <Text style={styles.menuName}>Photos</Text>
                            </View>
                        </Ripple>

                        <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={styles.menuList}>
                            <Entypo
                                name="circle"
                                size={25}
                                color={'gray'}
                            />
                            <View style={{ paddingLeft: 15 }}>
                                <Text style={styles.menuName}>Places</Text>
                            </View>
                        </Ripple>

                        <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={styles.menuList} onPress={() => handleLogout()}>
                            <MaterialIcons
                                name="logout"
                                size={25}
                                color={'gray'}
                            />
                            <View style={{ paddingLeft: 15 }}>
                                <Text style={styles.menuName}>Logout</Text>
                            </View>
                        </Ripple>
                    </View>
                </ScrollView>

            </View>
        </View>
    );
    // }
}
export default DrawerContent;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: "#e0e0e0"
        backgroundColor: "#f4f4f4",
        height: screenheight
    },
    boderLine: {
        backgroundColor: "gray",
        height: 0.4
    },
    profile: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 20
    },
    profileImage: {
        width: screenheight / 14,
        height: screenheight / 14,
        borderRadius: 50
    },
    menuList: {
        paddingHorizontal: 25,
        flexDirection: "row",
        paddingVertical: 12,
        alignItems: "center",
        backgroundColor: COLORS.WHITE,
        borderBottomWidth: 0.4,
        borderBottomColor: "#cecbcb"
    },
    menuName: {
        textTransform: "uppercase",
        fontSize: FONT.SIZE.SMALL,
        color: COLORS.BLACK,
        fontFamily: FONT.FAMILY.REGULAR
    }
});