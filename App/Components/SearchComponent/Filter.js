import React, {useState, useEffect} from 'react';
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
import Ripple from 'react-native-material-ripple';
import Button from '../../Components/Common/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {useSelector} from 'react-redux';
import Checkbox from './Checkbox';
import CustomRadioButton from './RadioButton';

let chekdata = [];

const checkboxdata = [
  {
    _id: 1,
    value: 'short',
    name: 'Short',
  },
  {
    _id: 2,
    value: 'medium',
    name: 'Medium',
  },
  {
    _id: 3,
    value: 'long',
    name: 'Long',
  },
  {
    _id: 4,
    value: 'verylong',
    name: 'Very Long',
  },
];

const PROP = [
  {
    key: 1,
    image: require('../../Assets/star/1star.png'),
    text: '1 Star',
  },
  {
    key: 2,
    image: require('../../Assets/star/2star.png'),
    text: '2 Star',
  },
  {
    key: 3,
    image: require('../../Assets/star/3star.png'),
    text: '3 Star',
  },
  {
    key: 4,
    image: require('../../Assets/star/4star.png'),
    text: '4 Star',
  },
  {
    key: 5,
    image: require('../../Assets/star/5star.png'),
    text: '5 Star',
  },
];

export default FilterModal = ({modal, category, close, applypress}) => {
  const allcategory = useSelector((state) => state.categorydata);
  const [expanded, setexpanded] = useState(false);
  const [expanded2, setexpanded2] = useState(false);
  const [expanded3, setexpanded3] = useState(false);
  const [mealtime, setmealtime] = useState(null);
  const [categorydata, setcategorydata] = useState([]);
  const [ratingvalue, setratingvalue] = useState(null);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpanded(!expanded);
  };

  const toggleExpand2 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpanded2(!expanded2);
  };

  const toggleExpand3 = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpanded3(!expanded3);
  };

  const radio_props = allcategory.map((data, i) => {
    return {label: data.name, value: data._id};
  });

  useEffect(() => {
    console.log('allcategory', allcategory);
  }, [allcategory]);

  const checkboxArray = (value) => {
    console.log(value);
    if (!chekdata.includes(value)) {
      chekdata.push(value);
      console.log('checked chekdata', chekdata);
    } else {
      chekdata.splice(chekdata.indexOf(value), 1);
      console.log('uncheked chekdata', chekdata);
    }
  };

  console.log('mealtime', mealtime);
  console.log('ratingvalue', ratingvalue);

  const submit = () => {
    if(mealtime == null && chekdata.length == 0 && ratingvalue == null){
      alert("Filter data is empty!")
    }
    else{
      applypress(mealtime, chekdata, ratingvalue)
      setmealtime(null)
      chekdata = []
      setratingvalue(null)
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => {
        modalVisible(!modal);
      }}>
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
            <ScrollView>
              <View style={styles.privacyContainer}>
                <View style={{marginBottom: GAP.LARGE}}>
                  <Text
                    style={{
                      fontSize: FONT.SIZE.EXTRALARGE,
                      marginTop: 0,
                      textAlign: 'center',
                      fontFamily: FONT.FAMILY.MEDIUM,
                    }}>
                    Filter
                  </Text>
                </View>
                <Ripple
                  rippleDuration={1000}
                  rippleOpacity={0.87}
                  rippleColor={'gray'}
                  rippleSize={'100%'}
                  style={styles.row}
                  onPress={() => toggleExpand()}>
                  <Text style={[styles.title]}>{'Category'}</Text>
                  <Icon
                    name={
                      expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                    }
                    size={30}
                    color={'#5E5E5E'}
                  />
                </Ripple>
                <View style={styles.parentHr} />
                {expanded && (
                  <View>
                    <RadioForm
                      radio_props={radio_props}
                      initial={mealtime}
                      formHorizontal={false}
                      labelHorizontal={true}
                      buttonColor={COLORS.PRIMARY}
                      selectedButtonColor={COLORS.PRIMARY}
                      animation={false}
                      buttonStyle={{borderWidth: 0.5}}
                      onPress={(value) => setmealtime(value)}
                      labelStyle={{
                        fontFamily: FONT.FAMILY.REGULAR,
                        fontSize: FONT.SIZE.MEDIUM,
                        marginBottom: 12,
                        color: COLORS.PRIMARY,
                        marginRight: 10,
                      }}
                      buttonSize={16}
                      style={{flexWrap: 'wrap', justifyContent: 'center'}}
                    />
                  </View>
                )}
                <Ripple
                  rippleDuration={1000}
                  rippleOpacity={0.87}
                  rippleColor={'gray'}
                  rippleSize={'100%'}
                  style={styles.row}
                  onPress={() => toggleExpand2()}>
                  <Text style={[styles.title]}>{'Class duration'}</Text>
                  <Icon
                    name={
                      expanded2 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                    }
                    size={30}
                    color={'#5E5E5E'}
                  />
                </Ripple>
                {expanded2 && (
                  <View>
                    {checkboxdata.map((data, i) => {
                      return (
                        <Checkbox
                          onPress={(value) => checkboxArray(data.value)}
                          checked={data.value}
                          name={data.name}
                        />
                      );
                    })}
                  </View>
                )}

                <Ripple
                  rippleDuration={1000}
                  rippleOpacity={0.87}
                  rippleColor={'gray'}
                  rippleSize={'100%'}
                  style={styles.row}
                  onPress={() => toggleExpand3()}>
                  <Text style={[styles.title]}>{'Rating'}</Text>
                  <Icon
                    name={
                      expanded3 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                    }
                    size={30}
                    color={'#5E5E5E'}
                  />
                </Ripple>
                {expanded3 && (
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <CustomRadioButton
                      PROP={PROP}
                      press={(val) => {
                        setratingvalue(val);
                      }}
                    />
                  </View>
                )}
              </View>
            </ScrollView>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Button
                onPress={() => submit()}
                gradient={true}
                title="Apply"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    //justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    //flexDirection: 'column',
    backgroundColor: ' rgba(0,0,0,0.8)',
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
  Filtercontainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: HEIGHT * 0.02,
    borderBottomWidth: 0.4,
    borderBottomColor: '#cecbcb',
  },
  item: {
    textAlign: 'left',
    fontFamily: FONT.FAMILY.BOOK,
    fontSize: FONT.SIZE.MEDIUM,
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
    width: '100%',
  },
  title: {
    fontSize: FONT.SIZE.LARGE,
  },
});
