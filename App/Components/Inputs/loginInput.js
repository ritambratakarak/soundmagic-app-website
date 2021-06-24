import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Keyboard, TouchableHighlight } from 'react-native';
import { COLORS, WIDTH, GAP, FONT, HEIGHT } from '../../Utils/constants';
import Entypo from 'react-native-vector-icons/Entypo';

const LoginInput = (props) => {
  const { type, placeholder, value, onChange, icon, onBlur, keyboard, max, onFocus, righticon, rightpress } = props;
  const inputRef = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image resizeMode="contain" source={icon} style={styles.icon} />
      </View>
      <TextInput
        ref={inputRef}
        style={[styles.textInput, { borderBottomColor: onFocus == true ? COLORS.PRIMARY : COLORS.GRAY }]}
        placeholderTextColor={COLORS.GRAY}
        placeholder={placeholder}
        secureTextEntry={type === "password" ? true : false}
        onChangeText={(text) => onChange(text)}
        value={value}
        onBlur={onBlur}
        keyboardType={keyboard ? keyboard : 'default'}
        maxLength={max}
        onFocus={onFocus}
        autoCapitalize='none'
      />
      <TouchableHighlight style={{position:"absolute", top:10, right:2}} onPress={rightpress}>
        <Entypo
          name={righticon}
          size={20}
          color={'gray'}
          style={{ padding: 3 }}
        />
      </TouchableHighlight>
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // backgroundColor: '#b7014863', //COLORS.TRANSPARENT,
    // borderRadius: 50,
    // borderWidth: 0.5,
    // borderColor: COLORS.GRAY,
    //margin: GAP.SMALL - 1,
    height: HEIGHT * 0.0658,
    marginVertical: GAP.SMALL,
    alignItems: 'center',

  },
  textInput: {
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.PRIMARY,
    // backgroundColor: 'red',
    paddingVertical: HEIGHT * 0.015,
    width: WIDTH * 0.75,
    marginLeft: WIDTH * 0.08,
    textAlign: 'left',
    fontFamily: FONT.FAMILY.ROMAN,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY,
  },
  iconContainer: {
    position: 'absolute',
    // padding: HEIGHT * 0.008,
    left: 0,
    top: HEIGHT * 0.02,
    //backgroundColor:"#000"
  },
  icon: {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.025,
    //backgroundColor:"yellow"
  }
})

export default LoginInput;
