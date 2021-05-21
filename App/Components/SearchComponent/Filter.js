import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';
import Ripple from 'react-native-material-ripple';
import Button from '../../Components/Common/Button';


export default FilterModal = ({ modal, caregory, classduration, rating, close, onPress }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => {
        modalVisible(!modal)
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBody}>
          <View style={{ width: "100%", height: "100%", backgroundColor: "#fff", borderRadius: 10, }}>
            <TouchableOpacity style={styles.privacycloseIcon} onPress={close}>
              <Image source={require('../../Assets/close.png')} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
            <View style={styles.privacyContainer}>
              <View style={{ marginBottom: GAP.LARGE }}>
                <Text style={{ fontSize: FONT.SIZE.EXTRALARGE, marginTop: 0, textAlign: "center", fontFamily: FONT.FAMILY.MEDIUM }}>Filter</Text>
              </View>
              <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={styles.Filtercontainer} onPress={caregory}>
                <Text style={styles.item}>Category</Text>
              </Ripple>
              <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={styles.Filtercontainer} onPress={classduration}>
                <Text style={styles.item}>Class duration</Text>
              </Ripple>
              <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={styles.Filtercontainer} onPress={rating}>
                <Text style={styles.item}>Rating</Text>
              </Ripple>
            </View>
            <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
              <Button
                onPress={onPress}
                gradient={true}
                title="Apply"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: ' rgba(0,0,0,0.8)'
  },
  modalBody: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: Audio,
    width: '80%',
    height: '55%',
    backgroundColor: '#fff',
    marginHorizontal: 50,
    marginVertical: 50,
    borderRadius: 15,
    // overflow: 'hidden',
    // resizeMode:"contain"
  },
  privacycloseIcon: {
    top: 10,
    right: 10,
    alignItems: "flex-end"
  },
  privacyContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 10,
    marginHorizontal: WIDTH * 0.07,
    marginBottom: HEIGHT * 0.04
  },
  Filtercontainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: HEIGHT * 0.020,
    borderBottomWidth: 0.4,
    borderBottomColor: "#cecbcb"
  },
  item: {
    textAlign: "left", fontFamily: FONT.FAMILY.BOOK, fontSize: FONT.SIZE.MEDIUM
  }
})