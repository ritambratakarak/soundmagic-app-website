import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Platform } from 'react-native';
import Button from '../../Components/Common/Button';
import LinearGradient from 'react-native-linear-gradient';
import { HEIGHT, WIDTH, GAP, FONT, COLORS } from '../../Utils/constants';
import Feather from 'react-native-vector-icons/Feather';
import AnimatedLoader from '../../Components/AnimatedLoader';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import requestCameraAndAudioPermission from '../../Components/Permission';
import ProfileInput from '../../Components/Inputs/profileInput';
import Toast from 'react-native-root-toast';
import { Formik } from 'formik';
import * as Yup from 'yup';


function UpdatePassword(props) {
  const navigation = useNavigation()
  const [loader, setLoading] = useState(false);
  const [vewpass, setvewpass] = useState(false);
  const [vewcpass, setvewcpass] = useState(false);
  const [vewoldpass, setvewoldpass] = useState(false);

  const SubmitUpdatePassword = async (values) => {
    setLoading(true);
    const alldata = await AsyncStorage.getItem("@user");
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    const submitdata = {
      "currentpassword": values.oldpassword,
      "password": values.password,
      "cnfpassword": values.cpassword,
      authtoken
    };
    Network('/update-password', 'post', submitdata)
      .then(async (res) => {
        console.log(res);
        setLoading(false);
        if (res.response_code === 200) {
          Toast.show(res.response_message)
          navigation.navigate("Profile")
        } else {
          Toast.show('Wrong email or password !')
        }
      })
      .catch((error) => {
        setLoading(false);
        const Error = error.response.data;
        Toast.show(Error.response_message)
      });
  };

  const Validate = Yup.object().shape({
    oldpassword: Yup.string()
    .required('Old password is required !'),
    password: Yup.string()
    .min(6, 'Choose a strong password !')
    .required('Password is required !'),
    cpassword: Yup.string()
    .required('Confirm password is required !')
    .oneOf(
      [Yup.ref('password'), null],
       'Passwords must match',
     )
  });

  return (
    <View style={styles.container}>
      <AnimatedLoader loading={loader} />
      <View style={{ height: HEIGHT, width: WIDTH, alignItems: "center", }}>
        <View style={{ alignItems: "center", width: "85%" }}>
          <View style={{ marginTop: 20, width: "100%", alignItems:"center"}}>
            <Formik
              initialValues={{ oldpassword: '', password: '', cpassword:'' }}
              onSubmit={(values) => SubmitUpdatePassword(values)}
              validationSchema={Validate}>
              {({
                values,
                handleChange,
                errors,
                isValid,
                handleSubmit,
                setFieldTouched,
                touched,
              }) => (
                <>
                  <ProfileInput
                    placeholder="Enter old password"
                    value={values.oldpassword}
                    type={vewoldpass ? "text" : "password"}
                    onChange={handleChange('oldpassword')}
                    icon={require('./../../Assets/Auths/locked.png')}
                    onBlur={() => setFieldTouched('oldpassword')}
                    righticon={vewoldpass ? "eye" : "eye-with-line"}
                    rightpress={() => setvewoldpass(!vewoldpass)}
                    editable={true}
                  />
                  {touched.oldpassword && errors.oldpassword && (
                    <Text style={styles.formError}>{errors.oldpassword}</Text>
                  )}
                  <ProfileInput
                    placeholder="Enter new password"
                    value={values.password}
                    type={vewpass ? "text" : "password"}
                    onChange={handleChange('password')}
                    icon={require('./../../Assets/Auths/locked.png')}
                    onBlur={() => setFieldTouched('password')}
                    righticon={vewpass ? "eye" : "eye-with-line"}
                    rightpress={() => setvewpass(!vewpass)}
                    editable={true}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.formError}>{errors.password}</Text>
                  )}
                  <ProfileInput
                    placeholder="Re-enter new password"
                    value={values.cpassword}
                    type={vewcpass ? "text" : "password"}
                    onChange={handleChange('cpassword')}
                    icon={require('./../../Assets/Auths/locked.png')}
                    onBlur={() => setFieldTouched('cpassword')}
                    righticon={vewcpass ? "eye" : "eye-with-line"}
                    rightpress={() => setvewcpass(!vewcpass)}
                    editable={true}
                  />
                  {touched.cpassword && errors.cpassword && (
                    <Text style={styles.formError}>{errors.cpassword}</Text>
                  )}
                  <View style={{ height: HEIGHT * 0.04, width: "100%" }} />

                  <Button
                    disabled={!isValid}
                    onPress={handleSubmit}
                    gradient={true}
                    title="Change Password"
                  />
                </>
              )}
            </Formik>
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

export default UpdatePassword;