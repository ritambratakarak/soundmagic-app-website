import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text, TouchableHighlight, LayoutAnimation } from 'react-native';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';
import Ripple from 'react-native-material-ripple';
import Button from '../../Components/Common/Button';
import Icon from "react-native-vector-icons/MaterialIcons";
import { CheckBox } from 'react-native-elements';
import RatingComponent from '../Rating/Rating';


export default FilterModal = ({ modal, close, onPress }) => {
  const [expanded, setexpanded] = useState(false);
  const [expanded2, setexpanded2] = useState(false);
  const [expanded3, setexpanded3] = useState(false);
  const [short, setshort] = useState(false);
  const [medium, setmedium] = useState(false);
  const [long, setlong] = useState(false);
  const [verylong, setveylong] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpanded(!expanded)
  }

  const toggleExpand2 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpanded2(!expanded2)
  }

  const toggleExpand3 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpanded3(!expanded3)
  }

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

              <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={styles.row} onPress={() => toggleExpand()}>
                <Text style={[styles.title]}>{"Category"}</Text>
                <Icon name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'#5E5E5E'} />
              </Ripple>
              <View style={styles.parentHr} />
              {
                expanded &&
                <View>

                </View>
              }
              <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={styles.row} onPress={() => toggleExpand2()}>
                <Text style={[styles.title]}>{"Class duration"}</Text>
                <Icon name={expanded2 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'#5E5E5E'} />
              </Ripple>
              {
                expanded2 &&
                <View>
                  <CheckBox
                    title={"0-3 Hours"}
                    checked={short}
                    onPress={() => setshort(!short)}
                    containerStyle={{ backgroundColor: COLORS.TRANSPARENT, borderWidth: 0, width: "80%" }}
                    textStyle={{ color: COLORS.BLACK, fontSize: FONT.SIZE.BIG, fontFamily: FONT.FAMILY.SEMI_BOLD, fontWeight: "100" }}
                  />
                  <CheckBox
                    title={"3-6 Hours"}
                    checked={medium}
                    onPress={() => setmedium(!medium)}
                    containerStyle={{ backgroundColor: COLORS.TRANSPARENT, borderWidth: 0, width: "80%" }}
                    textStyle={{ color: COLORS.BLACK, fontSize: FONT.SIZE.BIG, fontFamily: FONT.FAMILY.SEMI_BOLD, fontWeight: "100" }}
                  />
                  <CheckBox
                    title={"6-17 Hours"}
                    checked={long}
                    onPress={() => setlong(!long)}
                    containerStyle={{ backgroundColor: COLORS.TRANSPARENT, borderWidth: 0, width: "80%" }}
                    textStyle={{ color: COLORS.BLACK, fontSize: FONT.SIZE.BIG, fontFamily: FONT.FAMILY.SEMI_BOLD, fontWeight: "100" }}
                  />
                  <CheckBox
                    title={"17+ Hours"}
                    checked={verylong}
                    onPress={() => setveylong(!verylong)}
                    containerStyle={{ backgroundColor: COLORS.TRANSPARENT, borderWidth: 0, width: "80%" }}
                    textStyle={{ color: COLORS.BLACK, fontSize: FONT.SIZE.BIG, fontFamily: FONT.FAMILY.SEMI_BOLD, fontWeight: "100" }}
                  />
                </View>
              }

              <Ripple rippleDuration={1000} rippleOpacity={0.87} rippleColor={"gray"} rippleSize={"100%"} style={styles.row} onPress={() => toggleExpand3()}>
                <Text style={[styles.title]}>{"Rating"}</Text>
                <Icon name={expanded3 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'#5E5E5E'} />
              </Ripple>
              {
                expanded3 &&
                <View style={{justifyContent:"flex-start", alignItems:"flex-start"}}>
                  
                </View>
              }
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
    //justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    //flexDirection: 'column',
    backgroundColor: ' rgba(0,0,0,0.8)'
  },
  modalBody: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // height: Audio,
    width: '100%',
    height: '98%',
    backgroundColor: '#fff',
    //marginHorizontal: 50,
    marginVertical: 20,
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: '#ececec',
  },
  parentHr: {
    height: 1,
    color: '#ffffff',
    width: '100%'
  },
})