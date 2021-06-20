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
import Feather from 'react-native-vector-icons/Feather';
import Details from '../Screens/Courses/Details';
import Track from '../Screens/Track';
import Payment from '../Screens/Payment';
import AddPayment from '../Screens/Payment/Add';
import AllCourses from '../Screens/Courses/AllCourses';
import Player from '../Screens/Player';
import ShowFilterData from '../Screens/Courses/ShowFilterData';
import MyCourses from '../Screens/MyCourses';
import MycourseDetails from '../Screens/MyCourses/Details';
import TrackPlayer from '../Screens/Player/TrackPlayer';
import TrackDetails from '../Screens/Track/Details';



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

  const Left = (props) => {
    return (
      <TouchableOpacity onPress={props.onPress}>
        {props.menu ?
          <Image source={require('../Assets/Home/menu.png')} resizeMode="contain" style={{ width: WIDTH * 0.055, HEIGHT: HEIGHT * 0.01, marginLeft: WIDTH * 0.04 }} /> :
          <Image source={require('../Assets/Auths/arrow.png')} resizeMode="contain" style={{ width: 12, HEIGHT: 18, marginLeft: WIDTH * 0.06 }} />
        }
      </TouchableOpacity>
    );
  };

  const Right = (props) => {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <FontAwesome
          name="bell-o"
          size={25}
          color={COLORS.BLACK}
          style={{ paddingHorizontal: WIDTH * 0.05 }}
        />
      </TouchableOpacity>
    )
  }

  const Title = (props) => {
    return (
      <Text style={{ fontSize: FONT.SIZE.EXTRALARGE, fontFamily: FONT.FAMILY.SEMI_BOLD }}>{props.title}</Text>
    )
  }

  const HomeStack = ({ navigation }) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: '',
            headerShown: true,
            headerStyle: { height: HEIGHT * 0.08, elevation: 0, shadowOpacity: 0 },
            headerLeft: (props) => (<Left menu={true} onPress={()=> navigation.openDrawer()} />),
            headerRight: (props) => (<Right/>)
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: '',
            headerShown: true,
            headerTransparent: true,
            headerTitle: (props) => (<Text style={{ fontSize: FONT.SIZE.EXTRALARGE, fontFamily: FONT.FAMILY.SEMI_BOLD, color: COLORS.WHITE }}>Profile</Text>),
            headerLeft: (props) => (<TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Feather
                name="chevron-left"
                size={30}
                color={'white'}
                style={{ marginLeft: WIDTH * 0.04 }}
              />
            </TouchableOpacity>),
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: true,
            headerStyle: { height: HEIGHT * 0.08, elevation: 0, shadowOpacity: 0 },
            headerTitle: (props) => (<Title title={"Edit Profile"} />),
            headerLeft: (props) => (<Left menu={false} onPress={() => navigation.navigate("Profile")} />),
          }}
        />
        <Stack.Screen
          name="UpdatePassword"
          component={UpdatePassword}
          options={{
            headerShown: true,
            headerStyle: { height: HEIGHT * 0.08, elevation: 0, shadowOpacity: 0 },
            headerTitle: (props) => (<Title title={"Change Password"} />),
            headerLeft: (props) => (<Left menu={false} onPress={() => navigation.navigate("Profile")} />),
          }}
        />
        <Stack.Screen
          name="Courses"
          component={Courses}
          options={{
            headerShown: true,
            headerStyle: { height: HEIGHT * 0.08, elevation: 0, shadowOpacity: 0 },
            headerTitle: (props) => (<Title title={"Courses"} />),
            headerLeft: (props) => (<Left menu={false} onPress={() => navigation.navigate("Home")} />),
            headerRight: (props) => (<Right/>)
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerShown: true,
            headerStyle: { height: HEIGHT * 0.08, elevation: 0, shadowOpacity: 0 },
            headerTitle: (props) => (<Title title={"Courses Details"} />),
            headerLeft: (props) => (<Left menu={false} onPress={() => navigation.navigate("Courses")} />),
            headerRight: (props) => (<Right/>)
          }}
        />
        <Stack.Screen
          name="Track"
          component={Track}
          options={{
            headerShown: true,
            headerStyle: { height: HEIGHT * 0.08, elevation: 0, shadowOpacity: 0 },
            headerTitle: (props) => (<Title title={"Track"} />),
            headerLeft: (props) => (<Left menu={false} onPress={() => navigation.navigate("Home")} />),
            headerRight: (props) => (<Right/>)
          }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            headerShown: true,
            headerStyle: { height: HEIGHT * 0.08, elevation: 0, shadowOpacity: 0 },
            headerTitle: (props) => (<Title title={"Payment"} />),
            headerLeft: (props) => (<Left menu={false} onPress={() => navigation.navigate("Home")} />),
            headerRight: (props) => (<Right/>)
          }}
        />
        <Stack.Screen
          name="AddPayment"
          component={AddPayment}
          options={{
            headerShown: true,
            headerStyle: { height: HEIGHT * 0.08, elevation: 0, shadowOpacity: 0 },
            headerTitle: (props) => (<Title title={"Add Debit / Credit Card"} />),
            headerLeft: (props) => (<Left menu={false} onPress={() => navigation.navigate("Payment")} />),
            headerRight: (props) => (<Right/>)
          }}
        />
        <Stack.Screen
          name="AllCourses"
          component={AllCourses}
          options={{
            headerShown: true,
            headerStyle: { height: HEIGHT * 0.08, elevation: 0, shadowOpacity: 0 },
            headerTitle: (props) => (<Title title={"Course List"} />),
            headerLeft: (props) => (<Left menu={false} onPress={() => navigation.goBack()} />),
          }}
        />
        <Stack.Screen
          name="Player"
          component={Player}
        />
        <Stack.Screen
          name="Filter"
          component={ShowFilterData}
          options={{
            headerShown: true,
            headerStyle: { height: HEIGHT * 0.08, elevation: 0, shadowOpacity: 0 },
            headerTitle: (props) => (<Title title={"Filter"} />),
            headerLeft: (props) => (<Left menu={false} onPress={() => navigation.goBack()} />),
          }}
        />
        <Stack.Screen
          name="MyCourses"
          component={MyCourses}
          options={{
            headerShown: true,
            headerStyle: { height: HEIGHT * 0.08, elevation: 0, shadowOpacity: 0 },
            headerTitle: (props) => (<Title title={"My Courses"} />),
            headerLeft: (props) => (<Left menu={false} onPress={() => navigation.goBack()} />),
          }}
        />
        <Stack.Screen
          name="MycourseDetails"
          component={MycourseDetails}
          options={{
            headerShown: true,
            headerStyle: { height: HEIGHT * 0.08, elevation: 0, shadowOpacity: 0 },
            headerTitle: (props) => (<Title title={"Courses Details"} />),
            headerLeft: (props) => (<Left menu={false} onPress={() => navigation.navigate("MyCourses")} />),
            headerRight: (props) => (<Right/>)
          }}
        />
        <Stack.Screen
          name="TrackPlayer"
          component={TrackPlayer}
        />
        <Stack.Screen
          name="TrackDetails"
          component={TrackDetails}
          options={{
            headerShown: true,
            headerStyle: { height: HEIGHT * 0.08, elevation: 0, shadowOpacity: 0 },
            headerTitle: (props) => (<Title title={"Track Details"} />),
            headerLeft: (props) => (<Left menu={false} onPress={() => navigation.navigate("Track")} />),
            headerRight: (props) => (<Right/>)
          }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <>
      {userMe ? (
        <>
          <Drawer.Navigator drawerContent={(props) => (<DrawerContent {...props} />)} initialRouteName="HomeStack" drawerPosition="right">
            <Drawer.Screen
              name="HomeStack"
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
