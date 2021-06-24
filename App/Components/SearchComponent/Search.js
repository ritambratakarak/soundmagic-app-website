import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';
import Ripple from 'react-native-material-ripple';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default Search = ({ reffocus, value, onPress, onChange, keypress, onFocus, placeholder, inputwidth, showfilter }) => {
  return (
    <View style={{ flexDirection: "row", marginVertical: HEIGHT * 0.005, justifyContent: "space-between" }}>
      <View style={[styles.InputContainer,{width: inputwidth}]}>
        <TextInput
          ref={reffocus}
          style={styles.textInput}
          placeholderTextColor={COLORS.GRAY}
          placeholder={placeholder}
          onChangeText={(text) => onChange(text)}
          value={value}
          onTouchStart={keypress}
          autofocus={onFocus}
        />
        <EvilIcons
          name="search"
          size={30}
          color={'gray'}
          style={{ position: "absolute", right: 10, top: 10 }}
        />
      </View>
      {showfilter &&
        <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={{ backgroundColor: "#edeffc", height: HEIGHT * 0.06, width: WIDTH * 0.12, borderRadius: HEIGHT / 2, alignItems: "center", justifyContent: "center" }} onPress={onPress}>
          <AntDesign
            name="filter"
            size={HEIGHT * 0.03}
            color={'gray'}
          />
        </Ripple>
      }
    </View>
  )

}

const styles = StyleSheet.create({
  InputContainer: {
    width: "85%",
    height: HEIGHT * 0.060,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#edeffc",
    position: "relative"
  },
  textInput: {
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.PRIMARY,
    // backgroundColor: 'red',
    padding: HEIGHT * 0.015,
    width: WIDTH * 0.68,
    textAlign: 'left',
    fontFamily: FONT.FAMILY.ROMAN,
    alignSelf: "flex-start"
  },
})