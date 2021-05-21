import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text, FlatList } from 'react-native';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';

export default Favorite = ({ AddFav, fav }) => {
    return (
        <TouchableOpacity onPress={AddFav} style={{padding:5}}>
            {fav == true ?
                <Image source={require("../../Assets/Favorite/heart_fill.png")}
                    style={{ height: 20, width: 22 }} /> :
                <Image source={require("../../Assets/Favorite/heart.png")}
                    style={{ height: 20, width: 22 }} />}
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
    // repeatContainer: {
    //   width: "90%",
    //   alignSelf: "center",
    // },
})