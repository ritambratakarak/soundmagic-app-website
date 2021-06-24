import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import Loader from '../../Components/Common/Loader';
import { HEIGHT, WIDTH, COLORS, GAP, FONT } from '../../Utils/constants';
import { Formik } from 'formik';
import LoginInput from '../../Components/Inputs/loginInput';
import Network from '../../Services/Network';
import Toast from 'react-native-root-toast';
import * as Yup from 'yup';
import Button from '../../Components/Common/Button';
import { globalStyle } from '../../Utils/styles';
import AnimatedLoader from '../../Components/AnimatedLoader';


export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, SetshowSuccess] = useState(false);

  const resetPassword = (values) => {
    setLoading(true)
    Network('/forgot-password', 'post', { email: values.email.toLowerCase() }).then((res) => {
      setLoading(false)
      console.log(res);
      if (res.response_code == 200) {
        SetshowSuccess(true)
        Toast.show('Reset password email has been sent!')
      } else {
        Toast.show(res.response_message)
      }
    }).catch(error => {
      const Error = error.response.data;
      Toast.show(Error.response_message)
      setLoading(false)
    })
  }

  const Validate = Yup.object().shape({
    email: Yup.string()
      .email('Not a valid email !')
      .required('Email is required !')
  });

  return (
    <View
      style={styles.container}>
      <View style={styles.contain}>
        <AnimatedLoader loading={loading} />
        <Text style={[styles.siginText]}>Have you forgot your password? </Text>
        <Text style={styles.subText}>Type here your registered email address</Text>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values) => resetPassword(values)}
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
                icon={require('./../../Assets/Auths/message_icon_2.png')}
                onBlur={() => setFieldTouched('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.formError}>{errors.email}</Text>
              )}
              <View style={{height:HEIGHT*0.04, width:"100%"}} />
              <View style={{width:"50%", alignItems:"center"}}>
                <Button
                  disabled={!isValid}
                  onPress={handleSubmit}
                  title="Submit"
                  gradient={true}
                />
              </View>
            </>
          )}
        </Formik>
        {showSuccess && <Text style={styles.successMsg}>Password reset email has been sent.
       Please check your email.</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    height: HEIGHT,
    width: WIDTH,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE
  },
  contain: {
    width: WIDTH * 0.9,
    alignItems: 'center',
    marginTop:HEIGHT * 0.25
  },
  siginText: {
    color: COLORS.BLACK,
    marginVertical: GAP.LARGE,
    fontSize:FONT.SIZE.VERYLARGE,
    fontFamily:FONT.FAMILY.MEDIUM
  },
  subText: {
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.GRAY,
    textAlign: 'left',
    marginTop: -GAP.MEDIUM,
    marginBottom: GAP.MEDIUM,
    alignSelf: "flex-start",
    paddingHorizontal:5
  },
  formError: {
    color: "red",
    fontFamily: FONT.FAMILY.REGULAR,
    textAlign: 'center',
    fontSize: FONT.SIZE.SMALL,
  },
  successMsg: {
    fontFamily:FONT.FAMILY.HEAVY,
    // fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginTop: GAP.MEDIUM + 10
  }
});
