import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  LayoutAnimation,
  ScrollView,
} from 'react-native';
import {COLORS, HEIGHT, FONT, GAP, WIDTH} from '../../Utils/constants';
import Button from '../../Components/Common/Button';
import Rating from '../Rating/Rating';

export default ReviewModal = ({
  modal,
  close,
  inputRef,
  onChange,
  placeholder,
  value,
  ratenow,
  lengthtext,
  submit,
  modalVisible
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBody}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#fff',
              borderRadius: 10,
            }}>
            <TouchableOpacity style={styles.privacycloseIcon} onPress={close}>
              <Image
                source={require('../../Assets/close.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
            <View style={{marginBottom: GAP.MEDIUM}}>
              <Text
                style={{
                  fontSize: FONT.SIZE.EXTRALARGE,
                  marginTop: 0,
                  textAlign: 'center',
                  fontFamily: FONT.FAMILY.MEDIUM,
                }}>
                Rating
              </Text>
            </View>
            <View>
              <Rating
                value={0}
                backgroundColor={COLORS.GRAY}
                rate={(val) => ratenow(val)}
                disable={false}
                imageSize={40}
              />
            </View>
            <View style={styles.container}>
              <TextInput
                ref={inputRef}
                style={[
                  styles.textInput,
                  {
                    borderBottomColor: COLORS.GRAY,
                  },
                ]}
                placeholderTextColor={COLORS.GRAY}
                placeholder={placeholder}
                onChangeText={(text) => onChange(text)}
                value={value}
                maxLength={2000}
                multiline={true}
              />
            </View>
            <Text style={{textAlign:"right", color:"gray", fontSize:FONT.SIZE.MINI, marginRight:WIDTH * 0.07, marginBottom:10}}>{lengthtext}</Text>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: GAP.MEDIUM,
              }}>
              <Button onPress={() => submit()} gradient={true} title="Submit" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    //flexDirection: 'column',
    backgroundColor: ' rgba(0,0,0,0.8)',
  },
  modalBody: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: Audio,
    width: '80%',
    height: 380,
    backgroundColor: '#fff',
    //marginHorizontal: 50,
    marginVertical: 20,
    borderRadius: 15,
    // overflow: 'hidden',
    // resizeMode:"contain",
    alignSelf: 'center',
  },
  privacycloseIcon: {
    top: 10,
    right: 10,
    alignItems: 'flex-end',
  },
  privacyContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 10,
    marginHorizontal: WIDTH * 0.07,
    marginBottom: HEIGHT * 0.04,
  },
  container: {
    width: '100%',
    // backgroundColor: '#b7014863', //COLORS.TRANSPARENT,
    // borderRadius: 50,
    // borderWidth: 0.5,
    // borderColor: COLORS.GRAY,
    //margin: GAP.SMALL - 1,
    height: HEIGHT * 0.15,
    marginVertical: GAP.SMALL,
    alignItems: 'center',
  },
  textInput: {
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.PRIMARY,
    // backgroundColor: 'red',
    padding: HEIGHT * 0.015,
    width: WIDTH * 0.70,
    height: '100%',
    //marginLeft: WIDTH * 0.08,
    textAlign: 'left',
    fontFamily: FONT.FAMILY.ROMAN,
    borderWidth: 2,
    borderColor: COLORS.GRAY,
    textAlignVertical: 'top',
    borderRadius:10
  },
});
