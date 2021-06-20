import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text, FlatList } from 'react-native';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';
import ImageList from './ImageList';

export default RecentPlayedView = ({ name, data, initialnumber, onPress }) => {
  const navigation = useNavigation()
  return (
    <View style={[styles.repeatContainer, { marginBottom: HEIGHT * 0.04 }]}>
      <Text style={{ fontSize: FONT.SIZE.LARGE, fontFamily: FONT.FAMILY.HEAVY, marginBottom: HEIGHT * 0.02 }}>{name}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={onPress}>
            <ImageList uri={item.trackDetails.type == 'video'
                          ? item.trackDetails.videoThumbnail
                          : item.trackDetails.audioThumbnail} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
        ListEmptyComponent={<View style={{ alignItems: "center", justifyContent: "center", width: WIDTH * 9 / 8.8 }}>
        <Text style={{ alignItems: "center", textAlign: "center", fontSize:FONT.SIZE.MEDIUM, fontFamily:FONT.FAMILY.MEDIUM }}>No data found!</Text>
      </View>}
      initialNumToRender={initialnumber}
      />
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
  repeatContainer: {
    width: "90%",
    alignSelf: "center",
  },
})