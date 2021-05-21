import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';
import Ripple from 'react-native-material-ripple';


export default DrawerMenuItem = ({ name, onPress, icon }) => {
    return (
        <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={styles.menuList} onPress={onPress}>
           {icon}
            <View style={{ paddingLeft: 15, paddingTop: 5 }}>
                <Text style={styles.menuName}>{name}</Text>
            </View>
        </Ripple>
    )

}

const styles = StyleSheet.create({
    menuList: {
        paddingHorizontal: 25,
        flexDirection: "row",
        paddingVertical: 12,
        alignItems: "center",
        backgroundColor: COLORS.WHITE,
        borderBottomWidth: 0.4,
        borderBottomColor: "#cecbcb"
    },
    menuName: {
        textTransform: "uppercase",
        fontSize: FONT.SIZE.SMALL,
        color: COLORS.BLACK,
        fontFamily: FONT.FAMILY.REGULAR
    }
})