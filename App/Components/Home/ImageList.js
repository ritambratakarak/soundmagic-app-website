import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';
import ProgressiveImage from '../Common/PrograssiveImage';


export default ImageList = ({ uri }) => {
    return (
        <TouchableOpacity style={{ width: WIDTH * 0.30, height: HEIGHT * 0.15, marginRight: 10, borderRadius: 10, overflow:"hidden" }}>
            <ProgressiveImage
              defaultImageSource={require('../../Assets/defaultimg.png')}
              source={{uri: uri}}
              style={{width: '100%', height: "100%",}}
              resizeMode="cover"
            />
            {/* <Image source={{ uri: uri }} style={{ width: "100%", height: "100%" }} resizeMode={"cover"} /> */}
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