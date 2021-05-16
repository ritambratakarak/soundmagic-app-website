import React, {useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HEIGHT, WIDTH } from '../Utils/constants';
import {loginUser} from '../Redux/Actions/authAction'
import {useSelector, useDispatch} from 'react-redux'

export default function Splash({navigation}) {
  const userdata = useSelector(state => state.userdata)
  const dispatch = useDispatch()
  useEffect(() => {    
    setTimeout(()=> {
      checkLogin()
    }, 1000)
  }, [])

  const checkLogin = async() => {
   // await AsyncStorage.removeItem('@user')
    
    const isSignin = await AsyncStorage.getItem('@user')
    
    if(!isSignin) {
      navigation.replace('Login')
    } else {
      await dispatch(loginUser(JSON.parse(isSignin)))
     // navigation.replace('Home')
    }
  }

  return (
    <ImageBackground resizeMode="cover" source={require('../Assets/splash.jpg')} style={styles.container}>
      <Text></Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center'
  }
})