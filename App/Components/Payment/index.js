import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text, FlatList, CheckBox } from 'react-native';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';

export default Payment = ({ cardname, value, onChange, cardnumber, deletepress }) => {
  return (
    <View style={{ backgroundColor: "#F5F5F5", borderRadius: 5, shadowOffset: { width: 1, height: 4 }, shadowOpacity: 1.0, elevation: 5, shadowColor: '#ccc', shadowRadius: 5, paddingLeft: 15, paddingRight: 10, paddingVertical: 10, marginBottom: HEIGHT * 0.060, position: "relative" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ color: "#000", fontFamily: FONT.FAMILY.MEDIUM, fontSize: FONT.SIZE.LARGE }}>{cardname}</Text>
        <CheckBox
          value={value}
          onValueChange={onChange}
          style={styles.checkbox}
        />
      </View>
      <Text style={{ color: "#8A8A8A", fontFamily: FONT.FAMILY.BLACK, fontSize: FONT.SIZE.BIG }}>{cardnumber}</Text>
      <Image source={require("../../Assets/master_card.png")} style={{ height: 35, width: 35 }} />
      <TouchableOpacity style={{ position: "absolute", bottom: -20, right: 10 }} onPress={deletepress}>
        <Image source={require("../../Assets/delete.png")} style={{ height: 45, width: 45 }} />
      </TouchableOpacity>
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
  // repeatContainer: {
  //   width: "90%",
  //   alignSelf: "center",
  // },
})