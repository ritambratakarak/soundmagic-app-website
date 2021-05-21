import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FONT, GAP, HEIGHT, WIDTH } from '../../Utils/constants';


function AllCourses() {
    return (
      <View style={styles.container}>
        <Text> textInComponent </Text>
      </View>
    )
}

export default AllCourses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: "#fff"
  },
})