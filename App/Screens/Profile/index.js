import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Button from '../../Components/Common/Button';
import LinearGradient from 'react-native-linear-gradient';
import { HEIGHT, WIDTH, GAP, FONT, COLORS } from '../../Utils/constants';
import Feather from 'react-native-vector-icons/Feather';
import AnimatedLoader from '../../Components/AnimatedLoader';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ripple from 'react-native-material-ripple';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../../Redux/Actions/authAction';
import Toast from 'react-native-root-toast';


function Profile(props) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [loader, setLoading] = useState(false);
  const [userMe, setUser] = React.useState(null);
  useEffect(() => {
    getData()
  }, [])

  useFocusEffect(
    useCallback(() => {
      getData()
    }, []),
  );

  const getData = async () => {
    const alldata = await AsyncStorage.getItem("@user");
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    setLoading(true)
    Network('/view-profile', 'get', { authtoken })
      .then(async (res) => {
        setLoading(false)
        if (res.response_code === 200) {
          console.log(res.response_data);
          setUser(res.response_data)
          // Toast.show(res.response_message);
        }
        else if (res.response_code === 4000) {
          Toast.show(res.response_message);
          await AsyncStorage.removeItem('@user');
          dispatch(logoutUser())
        }
        else {
          Toast.show(res.response_message);
        }
      }).catch(error => {
        Toast.show(error)
        setLoading(false)
      })
  }

  return (
    <View style={styles.container}>
      <AnimatedLoader loading={loader} />
      <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1.2, y: 0 }} colors={['#A54729', '#2D4DBE']} style={{ height: HEIGHT, width: WIDTH, alignItems: "center", justifyContent: "center" }}>
        <View style={{ alignItems: "center", width: "80%" }}>
          <ImageBackground source={require('../../Assets/Ellipse.png')} style={{ width: WIDTH * 0.40, height: WIDTH * 0.40, alignItems: "center", justifyContent: "center" }}>
            <Image source={userMe && userMe.image == '' ? require('../../Assets/Home/image.png') : { uri: userMe && userMe.profile_image }} style={{ borderRadius: HEIGHT / 2, width: WIDTH * 0.25, height: WIDTH * 0.25, }} />
          </ImageBackground>
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 30, color: COLORS.WHITE, textAlign: "center", fontFamily: FONT.FAMILY.BOLD }}>{`${userMe != null ? userMe.fname + ' ' + userMe.lname : ""}`}</Text>
            <Text style={{ color: COLORS.WHITE, fontSize: FONT.SIZE.MEDIUM, fontFamily: FONT.FAMILY.REGULAR, textAlign: "center" }}>{`${userMe != null ? userMe.email : ""}`}</Text>
          </View>
          <View style={{ width: "80%", alignItems: "center", marginVertical: HEIGHT * 0.05, borderRadius: HEIGHT / 2, }}>
            <Button
              onPress={() => navigation.navigate('EditProfile')}
              gradient={false}
              title="Edit profile"
            />
          </View>
          <View style={{ marginVertical: HEIGHT * 0.06, width: "100%", }}>
            <View style={{ backgroundColor: "#fff", height: HEIGHT * 0.075, borderRadius: 10, marginBottom: 15 }}>
              <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                <Text style={[styles.whiteButtonText]}>
                  VIew my courses enrolled
                                </Text>
              </Ripple>
            </View>
            <View style={{ backgroundColor: "#fff", height: HEIGHT * 0.075, borderRadius: 10, }}>
              <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }} onPress={() => navigation.navigate("UpdatePassword")}>
                <Text style={[styles.whiteButtonText]}>
                  Change Password
                                </Text>
              </Ripple>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: HEIGHT,
    width: WIDTH,
  },
  whiteButtonText: {
    textAlign: 'center',
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.BLACK,
    textTransform: 'uppercase',
    fontFamily: FONT.FAMILY.BOOK,
    fontWeight: "bold",
    letterSpacing: 0.6
  },
});

export default Profile;
