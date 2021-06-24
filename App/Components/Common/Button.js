import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HEIGHT, GAP, COLORS, FONT } from '../../Utils/constants';
import Ripple from 'react-native-material-ripple';
import LinearGradient from 'react-native-linear-gradient';

export default function Button(props) {
  const { disabled, gradient } = props
  if (gradient) {
    return (
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#A54729', '#2D4DBE']} style={{ width: "80%", height: HEIGHT * 0.075, borderRadius: HEIGHT / 2, }}>
        <Ripple disabled={disabled} rippleDuration={1000} rippleOpacity={0.87} rippleColor={"#fff"} rippleSize={"100%"} onPress={props.onPress} style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.whiteButtonText}>
            {props.title ? props.title : 'button'}
          </Text>
        </Ripple>
      </LinearGradient>
    );
  } else {
    return (
    <View style={{backgroundColor:"#fff", width: "80%", height: HEIGHT * 0.075, borderRadius: HEIGHT / 2,}}>
      <Ripple disabled={disabled} rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} onPress={props.onPress} style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
        <Text style={[styles.whiteButtonText, {color:COLORS.PRIMARY}]}>
          {props.title ? props.title : 'button'}
        </Text>
      </Ripple>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  buttonWhite: {
    width: '100%',
    padding: HEIGHT * 0.02,
    backgroundColor: COLORS.WHITE,
    borderRadius: 100,
    marginVertical: GAP.SMALL + 5
  },
  whiteButtonText: {
    textAlign: 'center',
    fontSize: FONT.SIZE.LARGE,
    color: "#FFF",
    textTransform: 'uppercase',
    fontFamily: FONT.FAMILY.HEAVY,
    fontWeight: "900",
    letterSpacing: 1,
  },
  buttonDark: {
    width: '100%',
    padding: HEIGHT * 0.02,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 100,
    marginVertical: GAP.SMALL + 5
  },
  darkButtonText: {
    textAlign: 'center',
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    // fontFamily: FONT.FAMILY.SEMI_BOLD
  },
})