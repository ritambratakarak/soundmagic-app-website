import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';


export default Category = ({ name, image }) => {
  return (
    <TouchableOpacity style={{ width: WIDTH * 0.20, height: HEIGHT * 0.10, borderRadius: 8, alignItems: "center", borderWidth: 1, borderColor: COLORS.GRAY, marginBottom: HEIGHT * 0.012, justifyContent: 'center', marginRight: HEIGHT * 0.012, }}>
      <Image source={image} style={{ width: WIDTH * 0.10, height: HEIGHT * 0.035, }} resizeMode="contain" />
      <Text style={{ textAlign: "center", color: "#A3A3A3", fontSize: FONT.SIZE.MINI, marginTop: 2 }}>{name}</Text>
    </TouchableOpacity>
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