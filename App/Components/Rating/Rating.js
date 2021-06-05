import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text, FlatList } from 'react-native';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';
import { Rating, AirbnbRating } from 'react-native-ratings';

export default RatingItem = ({ value, backgroundColor, rate, disable, imageSize }) => {
    return (
        <Rating
            type='custom'
            ratingCount={5}
            startingValue={value}
            imageSize={imageSize}
            onFinishRating={rate}
            style={{ paddingVertical: 10, }}
            tintColor={backgroundColor}
            readonly={disable}
        />
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