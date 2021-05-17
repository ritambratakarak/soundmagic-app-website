import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, Image, TouchableOpacity, View, Platform } from 'react-native';
import Home from './../Screens/Home';
import Profile from '../Screens/Profile';
import EditProfile from '../Screens/Profile/EditProfile';
import LoginScreen from './../Screens/AuthScreens/login';
import SignupScreen from './../Screens/AuthScreens/signup';
import EmailVarifyScreeen from './../Screens/AuthScreens/otpVerify';
import ForgotPassword from '../Screens/AuthScreens/forgotPassword'
import Splash from './../Screens/splash';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { HEIGHT, COLORS, WIDTH, FONT } from './constants';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from "../Utils/DrawerContent";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UpdatePassword from '../Screens/UpdatePassword';
import Courses from '../Screens/Courses';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default Navigation = () => {
  const userdata = useSelector((state) => state.userdata);
  const [userMe, setUser] = useState(null);

  useEffect(() => {
    let user = userdata && userdata._id ? true : false
    setUser(user);
    console.log("USerData", userdata);
    
  }, [userdata]);

  const LogoTitle = (props) => {
    return (
      <Image
        source={require('./../Assets/logo.png')}
        style={{
          width: 35,
          height: 35,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  };
  const HomeStack = ({ navigation }) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: '',
            headerShown: true,
            headerStyle: { height: HEIGHT * 0.08 },
            headerLeft: (props) => (<TouchableOpacity onPress={()=> navigation.openDrawer()}>
              <Image source={require('../Assets/Home/menu.png')} resizeMode="contain" style={{width: WIDTH * 0.055, HEIGHT: HEIGHT * 0.01, marginLeft: WIDTH * 0.04}} />
            </TouchableOpacity>) ,
            headerRight: (props) => (
              <FontAwesome
                name="bell-o"
                size={25}
                color={COLORS.BLACK}
                style={{paddingHorizontal: 15}}
              />)
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UpdatePassword"
          component={UpdatePassword}
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Courses"
          component={Courses}
          options={{
            headerShown: true,
            headerTitle: (props) => (<Text style={{ fontSize: FONT.SIZE.MEDIUM, fontFamily: FONT.FAMILY.MEDIUM }}>Program Design</Text>),
            headerStyle: { height: HEIGHT * 0.08 },
            headerLeft: (props) => (<TouchableOpacity onPress={()=> navigation.openDrawer()}>
              <Image source={require('../Assets/Auths/arrow.png')} resizeMode="contain" style={{width: WIDTH * 0.055, HEIGHT: HEIGHT * 0.01, marginLeft: WIDTH * 0.04}} />
            </TouchableOpacity>),
            headerRight: (props) => (
              <FontAwesome
                name="bell-o"
                size={25}
                color={COLORS.BLACK}
                style={{paddingHorizontal: 15}}
              />)
          }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <>
      {userMe ? (
        <>
          <Drawer.Navigator drawerContent={(props) => (<DrawerContent {...props} />)} initialRouteName="Home" drawerPosition="right">
            <Drawer.Screen
              name="Home"
              component={HomeStack}
            />
          </Drawer.Navigator>
        </>
      ) : (
        <>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: (props) => <Text style={{ fontSize: FONT.SIZE.LARGE, fontFamily: FONT.FAMILY.REGULAR }}>Forgot Password</Text>,
                headerStyle: { backgroundColor: "#f4f4f4" },
                headerTintColor: '#000',
                headerTitleStyle: {
                  fontFamily: FONT.FAMILY.REGULAR
                },
              }}
              name="ForgotPass" component={ForgotPassword} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="Verification"
              component={EmailVarifyScreeen}
              options={{
                headerShown: true,
                headerTitle: 'Verification Code',
                headerBackTitle: '',
                headerStyle: { backgroundColor: '#fff' },
              }}
            />
          </Stack.Navigator>
        </>
      )}
    </>
  );
};
