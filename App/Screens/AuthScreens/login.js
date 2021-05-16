import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { globalStyle } from '../../Utils/styles';
import { HEIGHT, WIDTH, COLORS, GAP, FONT } from '../../Utils/constants';
import LoginInput from '../../Components/Inputs/loginInput';
import Button from '../../Components/Common/Button';
import Network from '../../Services/Network';
import Toast from 'react-native-root-toast';
import Loader from '../../Components/Common/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../../Redux/Actions/authAction'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimatedLoader from '../../Components/AnimatedLoader';


export default function Login(props) {
  const { navigation } = props
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const [vewpass, setvewpass] = useState(false);
  const dispatch = useDispatch()

  const loginSubmit = (values) => {
    setLoading(true);
    const data = {
      email: values.email.toLowerCase(),
      password: values.password,
      devicetoken: '1234567890',
      apptype: Platform.OS == 'ios' ? 'IOS' : "ANDROID",
    };
    Network('/login', 'post', data)
      .then(async (res) => {
        console.log(res);
        setLoading(false);
        if (res.response_code === 200) {
          setLoading(false);
          if (res.response_data._id) {
            dispatch(loginUser(res.response_data))
          } else {
            Toast.show('Something went wrong !')
          }
          await AsyncStorage.setItem('@user', JSON.stringify(res.response_data))
          //  navigation.replace('Splash')
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

  const signupTextpress = () => {
    props.navigation.navigate('Signup');
  };

  const forgotPass = () => {
    props.navigation.navigate('ForgotPass');
  }


  const Validate = Yup.object().shape({
    email: Yup.string()
      .email('Not a valid email !')
      .required('Email is required !'),
    password: Yup.string()
      .required('Password is required !'),
  });


  return (
    <KeyboardAvoidingView behavior="padding" style={{width:WIDTH, height:HEIGHT, }}>
      <ImageBackground
        style={styles.container}
        source={require('../../Assets/background.png')}>
        <AnimatedLoader loading={loading} />
        <Animatable.View style={styles.subContainer}>
          <Formik
            initialValues={{ email: '' }}
            onSubmit={(values) => loginSubmit(values)}
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
                  placeholder="Email address"
                  value={values.email}
                  onChange={handleChange('email')}
                  type="email"
                  icon={require('./../../Assets/Auths/message_icon_1.png')}
                  onBlur={() => setFieldTouched('email')}
                  onFocus={() => setFocus(true)}
                />
                {touched.email && errors.email && (
                  <Text style={styles.formError}>{errors.email}</Text>
                )}
                <LoginInput
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange('password')}
                  type={vewpass ? "text" : "password"}
                  icon={require('./../../Assets/Auths/locked.png')}
                  onBlur={() => setFieldTouched('password')}
                  righticon={vewpass ? "eye" : "eye-with-line"}
                  rightpress={()=> setvewpass(!vewpass)}
                />
                {touched.password && errors.password && (
                  <Text style={styles.formError}>{errors.password}</Text>
                )}
                <ForgotPass onPress={forgotPass} />
                <Button
                  disabled={!isValid}
                  onPress={handleSubmit}
                  gradient={true}
                  title="Login"
                />
              </>
            )}
          </Formik>
          <NewSignupText onPress={signupTextpress} />
        </Animatable.View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const ForgotPass = (props) => {
  return (
    <View style={styles.forgotPassContainer}>
      <Text onPress={props.onPress} style={styles.forgotPass}>Forgot password ?</Text>
    </View>
  );
};

const NewSignupText = (props) => {
  return (
    <TouchableOpacity style={styles.newUser} onPress={props.onPress} activeOpacity={1}>
      <Text style={styles.newUserText}>
        Don't have an account ?{' '}
      </Text>
      <Text style={{ fontFamily: FONT.FAMILY.BOOK, textAlign: "center", color: COLORS.SECONDARY, fontWeight: "bold", fontSize: FONT.SIZE.MEDIUM }}> Register now</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: HEIGHT,
    width: WIDTH,
  },
  subContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '85%',
    marginTop: HEIGHT * 0.30
  },
  logo: {
    width: WIDTH * 0.22,
    height: HEIGHT * 0.15,
  },
  siginText: {
    color: COLORS.WHITE,
    marginVertical: GAP.LARGE,
  },
  forgotPass: {
    color: COLORS.PRIMARY,
    fontFamily: FONT.FAMILY.ROMAN,
    textAlign: 'right',
    padding: 5,
    fontSize: FONT.SIZE.MEDIUM
  },
  forgotPassContainer: {
    marginTop: HEIGHT * 0.01,
    alignSelf: 'flex-end',
    marginBottom: HEIGHT * 0.05
  },
  loginButton: {
    width: '100%',
    padding: HEIGHT * 0.02,
    backgroundColor: COLORS.WHITE,
    borderRadius: 100,
    marginVertical: GAP.SMALL,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.PRIMARY,
    textTransform: 'uppercase',
    fontFamily: FONT.FAMILY.REGULAR,
  },
  newUser: {
    marginTop: HEIGHT * 0.05,
    paddingBottom: 15,
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
