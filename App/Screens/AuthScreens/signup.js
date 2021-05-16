import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { globalStyle } from '../../Utils/styles';
import { HEIGHT, WIDTH, COLORS, GAP, FONT } from '../../Utils/constants';
import LoginInput from '../../Components/Inputs/loginInput';
import Button from '../../Components/Common/Button';
import { Validate } from '../../Components/Inputs/signupValidate';
import { Formik } from 'formik';
import Network from '../../Services/Network';
import Loader from '../../Components/Common/Loader';
import Toast from 'react-native-root-toast';
import AnimatedLoader from '../../Components/AnimatedLoader';


export default function Signup(props) {
  const { navigate } = props.navigation;
  const [loading, setLoading] = useState(false);
  const [vewpass, setvewpass] = useState(false);
  const [vewcpass, setvewcpass] = useState(false);

  const registerSubmit = (values) => {
    console.log(values);
    setLoading(true);
    let email = values.email.toLowerCase();
    const data = {
      email,
      fname: values.firstname,
      lname: values.lastname,
      password: values.password,
    };
    Network('/register', 'post', data)
      .then((res) => {
        console.log(res);
        if (res.response_code === 200) {
          setLoading(false);
          Toast.show(res.response_message);
          navigate('Login');
        } else {
          Toast.show(res.response_message);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        const Error = error.response.data;
        Toast.show(Error.response_message)
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ width: WIDTH, height: HEIGHT, }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={styles.container}
          source={require('../../Assets/register.png')}>
          <AnimatedLoader loading={loading} />
          <Animatable.View animation="fadeInDown" style={styles.subContainer}>
            <Formik
              initialValues={{ firstname: '', lastname: '' }}
              onSubmit={(values) => registerSubmit(values)}
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
                  <LoginInput
                    placeholder="First Name"
                    value={values.firstname}
                    onChange={handleChange('firstname')}
                    icon={require('./../../Assets/Auths/user.png')}
                    onBlur={() => setFieldTouched('firstname')}
                  />
                  {touched.firstname && errors.firstname && (
                    <Text style={styles.formError}>{errors.firstname}</Text>
                  )}
                  <LoginInput
                    placeholder="Last Name"
                    value={values.lastname}
                    onChange={handleChange('lastname')}
                    icon={require('./../../Assets/Auths/user.png')}
                    onBlur={() => setFieldTouched('lastname')}
                  />
                  {touched.lastname && errors.lastname && (
                    <Text style={styles.formError}>{errors.lastname}</Text>
                  )}
                  <LoginInput
                    placeholder="Enter your E-mail"
                    value={values.email}
                    onChange={handleChange('email')}
                    type="email"
                    icon={require('./../../Assets/Auths/message_icon_1.png')}
                    onBlur={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.formError}>{errors.email}</Text>
                  )}
                  <LoginInput
                    placeholder="Enter new password"
                    value={values.password}
                    type={vewpass ? "text" : "password"}
                    onChange={handleChange('password')}
                    icon={require('./../../Assets/Auths/locked.png')}
                    onBlur={() => setFieldTouched('password')}
                    righticon={vewpass ? "eye" : "eye-with-line"}
                    rightpress={() => setvewpass(!vewpass)}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.formError}>{errors.password}</Text>
                  )}
                  <LoginInput
                    placeholder="Re-enter new password"
                    value={values.cpassword}
                    type={vewcpass ? "text" : "password"}
                    onChange={handleChange('cpassword')}
                    icon={require('./../../Assets/Auths/locked.png')}
                    onBlur={() => setFieldTouched('cpassword')}
                    righticon={vewcpass ? "eye" : "eye-with-line"}
                    rightpress={() => setvewcpass(!vewcpass)}
                  />
                  {touched.cpassword && errors.cpassword && (
                    <Text style={styles.formError}>{errors.cpassword}</Text>
                  )}
                  <View style={{height:HEIGHT*0.04, width:"100%"}} />
                  <Button
                    disabled={!isValid}
                    onPress={handleSubmit}
                    gradient={true}
                    title="Sign Up"
                  />
                  
                </>
              )}
            </Formik>
            <NewSignupText onPress={() => props.navigation.navigate('Login')} />
          </Animatable.View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const NewSignupText = (props) => {
  return (
    <TouchableOpacity style={styles.newUser} onPress={props.onPress} activeOpacity={1}>
      <Text style={styles.newUserText}>
        Already have an account ? {' '}
      </Text>
      <Text style={{ fontFamily: FONT.FAMILY.BOOK, textAlign: "center", color: COLORS.SECONDARY, fontWeight: "bold", fontSize: FONT.SIZE.MEDIUM }}> Login</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: HEIGHT,
    width: WIDTH,
    justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
  },
  subContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '85%',
    marginTop: "30%"
  },
  newUser: {
    marginTop: HEIGHT * 0.03,
  },
  newUserText: {
    textAlign: 'center',
    color: "#8f8f8f",
    fontFamily: FONT.FAMILY.BOOK,
    fontSize: FONT.SIZE.MEDIUM,
  },
  formError: {
    color: "red",
    fontFamily: FONT.FAMILY.REGULAR,
    textAlign: 'center',
    fontSize: FONT.SIZE.SMALL,
  },
});
