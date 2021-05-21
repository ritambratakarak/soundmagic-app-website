import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text, FlatList } from 'react-native';
import CategogyList from '../Common/CategogyList';
import Heading2 from '../Common/Heading2';
import TextContainer from '../Common/Text';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';
import Favorite from '../Favorite';


export default CourseItem = ({ heading, image, textsize, textcolor, text, categoryname, onPress, showfavorite, Pressfavorite, favorite }) => {
  return (
    <TouchableOpacity style={{ flexDirection: "row", marginBottom: HEIGHT * 0.02, borderBottomColor: "#E5E5E5", borderBottomWidth: 0.5, paddingBottom: HEIGHT * 0.02,}} onPress={onPress}>
      <View style={{ width: WIDTH * 0.30, height: HEIGHT * 0.10, marginRight: GAP.SMALL }}>
        <Image source={image} style={{ borderRadius: 10, width: "100%", height: "100%" }} resizeMode={"contain"} />
      </View>
      <View style={{width:"80%"}}>
        <Heading2
          name={heading}
        />
        <View style={{flexDirection:"row", justifyContent:"space-between", width:"78%", alignItems:"center" }}>
          <View>
          <Text style={[styles.description, { color: textcolor, fontSize: textsize }]}>{text}</Text>
            <CategogyList
              categoryname={"Upload By"}
              name={categoryname}
            />
          </View>
          {
            showfavorite &&
            <Favorite
              AddFav={Pressfavorite}
              fav={favorite}
            />
          }
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  description: {
    fontFamily: FONT.FAMILY.REGULAR,
    // marginBottom: GAP.MEDIUM,
    // paddingBottom: 10
  }
  // repeatContainer: {
  //   width: "90%",
  //   alignSelf: "center",
  // },
})