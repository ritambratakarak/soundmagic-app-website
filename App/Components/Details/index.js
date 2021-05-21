import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text, FlatList } from 'react-native';
import CourseItem from './CourseItem';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';


export default DetailsComponent = ({ mainheading, viewpress, data,  }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.description, { color: "#909090", fontSize: FONT.SIZE.SMALL }]}>{mainheading}</Text>
        <Text style={[styles.description, { color: COLORS.PRIMARY }]} onPress={viewpress}>{"View all"}</Text>
      </View>
      

    </View>
  )
}

const styles = StyleSheet.create({
  description: {
    fontFamily: FONT.FAMILY.REGULAR,
    marginBottom: GAP.MEDIUM,
    paddingBottom: 10
  }
  // repeatContainer: {
  //   width: "90%",
  //   alignSelf: "center",
  // },
})