import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text, FlatList } from 'react-native';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';

export default TextContainer = ({ content, color, size }) => {
    return (
        <Text style={[styles.description, { color: color, fontSize: size }]}>{content}</Text>
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