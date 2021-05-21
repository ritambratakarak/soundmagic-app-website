import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Platform } from 'react-native';
import Button from '../../Components/Common/Button';
import { HEIGHT, WIDTH, GAP, FONT, COLORS } from '../../Utils/constants';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AnimatedLoader from '../../Components/AnimatedLoader';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import requestCameraAndAudioPermission from '../../Components/Permission';
import ProfileInput from '../../Components/Inputs/profileInput';
import Toast from 'react-native-root-toast';
import RBSheet from "react-native-raw-bottom-sheet";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../../Redux/Actions/authAction';


function EditProfile(props) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [loader, setLoading] = useState(false);
  const [userMe, setUser] = React.useState(null);
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setemail] = React.useState("");
  const [imagefile, setimagefile] = React.useState("");
  const refRBSheet = useRef();

  useEffect(() => {
    getData()
    if (Platform.OS === 'android') {                    //Request required permissions from Android
      requestCameraAndAudioPermission().then(_ => {
        console.log('requested!');
      });
    }
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
          setFname(res.response_data.fname)
          setLname(res.response_data.lname)
          setemail(res.response_data.email)
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

  const profileeditSubmit = async () => {
    if (fname == "" || lname == "") {
      Toast.show("Enter name")
    } else {
      setLoading(true);
      const alldata = await AsyncStorage.getItem("@user");
      const data = JSON.parse(alldata);
      const authtoken = data.authtoken;
      const submitdata = {
        fname: fname,
        lname: lname,
        authtoken
      }
      Network('/edit-profile', 'post', submitdata)
        .then(async (res) => {
          console.log(res);
          setLoading(false);
          if (res.response_code === 200) {
            getData()
            Toast.show(res.response_message)
          } else {
            Toast.show('Wrong email or password !')
          }
        })
        .catch((error) => {
          setLoading(false);
          const Error = error.response.data;
          Toast.show(Error.response_message)
        });
    }
  };

  const UploadPicture = async (source, sourceType, sourceName) => {
    const alldata = await AsyncStorage.getItem("@user");
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    setLoading(true)
    let form = new FormData();
    form.append("image", { uri: source, name: sourceName, type: sourceType === "" ? "photo.png" : sourceType });
    form.append("authtoken", authtoken);
    Network('/edit-profileImage', 'post', form)
      .then(async(res) => {
        console.log(res, "res");
        setLoading(false)
        if (res.response_code == 200) {
          Toast.show(res.response_message);
          getData()
          const resubmit = {...data, profile_image: res.response_data};
          console.log("resubmit", resubmit);
          dispatch(loginUser(resubmit))
          await AsyncStorage.setItem('@user', JSON.stringify(resubmit))
        }
        else {
          Toast.show(res.response_message);
        }
      })
      .catch((error) => {
        setLoading(false)
        const Error = error.response.data;
        Toast.show(Error.response_message)
      });
  }

  return (
    <View style={styles.container}>
      <AnimatedLoader loading={loader} />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType={"slide"}
        height={200}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          },
          container: {
            backgroundColor: "#f4f4f4",
            borderTopLeftRadius:15,
            borderTopRightRadius:15
          }
        }}>
        <View style={{ width: "100%", justifyContent:"center", padding: 20, }}>
          <TouchableOpacity style={{ flexDirection: "row", alignItems:"center", borderBottomColor:"#fff", borderBottomWidth:1, justifyContent:"center", paddingBottom:20}}
            onPress={()=> launchCamera(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              (response) => {
                if (response.didCancel) {
                  Toast.show('User cancelled photo picker');
                  refRBSheet.current.close()
                }
                else if (response.error) {
                  Toast.show('ImagePicker Error: ', response.error);
                  refRBSheet.current.close()
                }
                else if (response.customButton) {
                  Toast.show('User tapped custom button: ', response.customButton);
                  refRBSheet.current.close()
                }
                else {
                  let source = response.uri;
                  let name = response.fileName;
                  let type = response.type;
                  console.log(response, "all camera data");
                  setimagefile(response)
                  refRBSheet.current.close()
                  UploadPicture(source, type, name)
                }
              },
            )
          }
          >
            <Feather
              name="camera"
              size={30}
              color={'black'}
              style={{ paddingRight: WIDTH * 0.04 }}
            />
            <Text style={{ fontFamily: FONT.FAMILY.MEDIUM, fontSize: FONT.SIZE.MEDIUM }}>Upload Image from Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row", alignItems:"center", justifyContent:"center", paddingTop:20}}
            onPress={()=> 
              launchImageLibrary(
                {
                  mediaType: 'photo',
                  includeBase64: false,
                  maxHeight: 200,
                  maxWidth: 200,
                },
                (response) => {
                  if (response.didCancel) {
                    Toast.show('User cancelled photo picker');
                    refRBSheet.current.close()
                  }
                  else if (response.error) {
                    Toast.show('ImagePicker Error: ', response.error);
                    refRBSheet.current.close()
                  }
                  else if (response.customButton) {
                    Toast.show('User tapped custom button: ', response.customButton);
                    refRBSheet.current.close()
                  }
                  else {
                    let source = response.uri;
                    let name = response.fileName;
                    let type = response.type;
                    console.log(response, "all data");
                    setimagefile(response)
                    refRBSheet.current.close()
                    UploadPicture(source, type, name)
                  }
                },
              )
            }
          >
            <FontAwesome
              name="photo"
              size={30}
              color={'black'}
              style={{ paddingRight: WIDTH * 0.04 }}
            />
            <Text style={{ fontFamily: FONT.FAMILY.MEDIUM, fontSize: FONT.SIZE.MEDIUM, }}>Upload Image from Library</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
      <View style={{ height: HEIGHT, width: WIDTH, alignItems: "center", }}>
        <View style={{ alignItems: "center", width: "80%" }}>
          <ImageBackground source={require('../../Assets/Ellipse2.png')} style={{ width: WIDTH * 0.40, height: WIDTH * 0.40, alignItems: "center", justifyContent: "center", marginVertical: 20 }}>
            <View style={{ position: "relative" }}>
              <Image source={userMe && userMe.image == '' ? require('../../Assets/Home/image.png') : { uri: userMe && userMe.profile_image }} style={{ borderRadius: HEIGHT / 2, width: WIDTH * 0.25, height: WIDTH * 0.25, }} />
              <TouchableOpacity style={{ position: "absolute", bottom: -35, left: WIDTH * 0.050 }} onPress={() => refRBSheet.current.open()}>
                <Image source={require('../../Assets/Ellipse3.png')} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={{ marginTop: 20, }}>
            <ProfileInput
              placeholder="First Name"
              value={fname}
              onChange={(val) => setFname(val)}
              type="text"
              icon={require('./../../Assets/user2.png')}
              editable={true}
            />
            <ProfileInput
              placeholder="Last Name"
              value={lname}
              onChange={(val) => setLname(val)}
              type="text"
              icon={require('./../../Assets/user2.png')}
              editable={true}
            />
            <ProfileInput
              placeholder="Email address"
              value={email}
              onChange={(val) => setemail(val)}
              type="text"
              icon={require('./../../Assets/Auths/message_icon_1.png')}
              editable={false}
            />
          </View>
          <View style={{ width: "100%", alignItems: "center", marginVertical: HEIGHT * 0.05, borderRadius: HEIGHT / 2, }}>
            <Button
              onPress={() => profileeditSubmit()}
              gradient={true}
              title="SAVE profile"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: COLORS.WHITE
  },

});

export default EditProfile;