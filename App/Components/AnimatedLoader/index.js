import React from 'react';
import LottieView from 'lottie-react-native';
import { Animated, Easing, StyleSheet, Modal, View, Text, TouchableHighlight, TouchableOpacity, Image, Linking } from 'react-native';
import { COLORS, FONT, WIDTH, HEIGHT } from '../../Utils/constants';


export default class AnimatedLoader extends React.Component {

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.loading}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View style={styles.privacyContainer}>
              <LottieView
                ref={animation => {
                  this.animation = animation;
                }}
                source={require('../../Assets/loader.json')}
                style={{ width: WIDTH * 0.35, height: HEIGHT * 0.30 }}
                autoPlay
                loop
              />
              <Text style={{ color: COLORS.BLACK, fontSize: FONT.SIZE.LARGE }}>Loading...</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalBody: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: Audio,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    // overflow: 'hidden',
    // resizeMode:"contain"
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  privacyContainer: {
    justifyContent: 'center',
    alignItems: 'center',

  },
})