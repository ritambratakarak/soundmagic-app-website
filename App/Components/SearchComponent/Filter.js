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
import {useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {xorBy} from 'lodash';
import MultipleSelect from '../MultipleSelect';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

let chekdata = [];

export default FilterModal = ({modal, category, close, applypress}) => {
  let multiSelect = useRef(null);
  const allcategory = useSelector((state) => state.categorydata);
  const [mealtime, setmealtime] = useState(null);
  const [ratingvalue, setratingvalue] = useState(null);
  const [value, setvalue] = useState(null);
  const [hastag, sethastag] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    console.log('allcategory', allcategory);
  }, [allcategory]);

  const submit = async() => {
    if(value == null && selectedTeams.length == 0 && hastag.length == 0){
      alert("Please Select One Filter")
    }
    else{
      applypress(value, selectedTeams, hastag);
      console.log(JSON.stringify({value, selectedTeams, hastag}));
      // await AsyncStorage.setItem("filterdata", JSON.stringify({value, selectedTeams, hastag}))
      setvalue(null);
      setSelectedTeams([]);
      sethastag([])
    }
  };

  const benefitarray = [
    {item: 'Managing Stress', label: 'Managing Stress', id: 1},
    {item: 'Improves Sleep', label: 'Improves Sleep', id: 2},
    {item: 'For Anxiety', label: 'For Anxiety', id: 3},
    {item: 'Relaxation', label: 'Relaxation', id: 4},
    {item: 'Pain Management', label: 'Pain Management', id: 5},
    {item: 'Overcoming Fear', label: 'Overcoming Fear', id: 6},
    {item: 'Dealing with Grief', label: 'Dealing with Grief', id: 7},
    {item: 'Dealing with Anger', label: 'Dealing with Anger', id: 8},
    {item: 'Developing Acceptance', label: 'Developing Acceptance', id: 9},
    {item: 'Wellness', label: 'Wellness', id: 10},
    {item: 'Compassion', label: 'Compassion', id: 11},
    {item: 'Kindness', label: 'Kindness', id: 12},
    {item: 'Forgiveness', label: 'Forgiveness', id: 13},
    {item: 'Gratitude', label: 'Gratitude', id: 14},
    {item: 'Patience', label: 'Patience', id: 15},
    {item: 'Emotional Regulation', label: 'Emotional Regulation', id: 16},
    {item: 'Body Flexibility', label: 'Body Flexibility', id: 17},
    {item: 'Physical Strength', label: 'Physical Strength', id: 18},
    {item: 'Health', label: 'Health', id: 19},
    {item: 'Childbirth Preparation', label: 'Childbirth Preparation', id: 20},
    {item: 'Parenting', label: 'Parenting', id: 21},
  ];

  const hastagarray = [
    {item: 'Insomnia', label: 'Insomnia', id: 1},
    {item: 'Anxiety', label: 'Anxiety', id: 2},
    {item: 'Sleep', label: 'Sleep', id: 3},
    {item: 'Fear', label: 'Fear', id: 4},
    {item: 'Children', label: 'Children', id: 5},
    {item: 'Pregnancy', label: 'Pregnancy', id: 6},
    {item: 'Child Birth', label: 'Child Birth', id: 7},
    {item: 'Stress Management', label: 'Stress Management', id: 8},
    {item: 'Grief', label: 'Grief', id: 9},
    {item: 'Compassion', label: 'Compassion', id: 10},
    {item: 'Relaxation', label: 'Relaxation', id: 11},
    {item: 'Yoga', label: 'Yoga', id: 12},
    {item: 'Bed Time', label: 'Bed Time', id: 13},
    {item: 'Mindfulness', label: 'Mindfulness', id: 14},
  ];

  const onMultiChange = () => {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
  };

  const onMultiHasTagChange = () => {
    return (item) => sethastag(xorBy(hastag, [item], 'id'));
  };

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
                <View
                  style={{
                    borderRadius: 10,
                    borderColor: '#000',
                    borderWidth: 1,
                    marginBottom: 15,
                  }}>
                  <RNPickerSelect
                    placeholder={{
                      label: 'Plaese Select Activity',
                      value: null,
                    }}
                    placeholderTextColor="#fff"
                    onValueChange={(val) => {
                      setvalue(val);
                    }}
                    style={{
                      ...pickerSelectStyles,
                      iconContainer: {
                        top: 15,
                        right: '5%',
                      },
                    }}
                    Icon={() => {
                      return (
                        <AntDesign
                          name={'down'}
                          color={'#000'}
                          size={20}
                          style={{left: 0}}
                        />
                      );
                    }}
                    value={value}
                    items={[
                      {value: 'Guided Meditation', label: 'Guided Meditation'},
                      {value: 'Mindfulness', label: 'Mindfulness'},
                      {value: 'Mindful Movement', label: 'Mindful Movement'},
                      {value: 'Relaxation', label: 'Relaxation'},
                      {value: 'Yoga', label: 'Yoga'},
                      {value: 'Nutrition', label: 'Nutrition'},
                      {value: 'Music', label: 'Music'},
                      {value: 'Sound Healing', label: 'Sound Healing'},
                      {value: 'Tai Chi', label: 'Tai Chi'},
                      {value: 'Hypnosis', label: 'Hypnosis'},
                      {value: 'Breathing', label: 'Breathing'},
                      {value: 'Lecture', label: 'Lecture'},
                      {value: 'Talk', label: 'Talk'},
                      {value: 'Educational', label: 'Educational'},
                      {value: 'Course', label: 'Course'},
                    ]}
                  />
                </View>

                <View
                  style={{
                    borderRadius: 10,
                    borderColor: '#000',
                    borderWidth: 1,
                    marginBottom: 15,
                    padding: 8,
                  }}>
                  <MultipleSelect
                    inputPlaceholder={'Please Select Benefit'}
                    options={benefitarray}
                    selectedValues={selectedTeams}
                    onMultiSelect={onMultiChange()}
                    onTapClose={onMultiChange()}
                    isMulti
                  />
                </View>

                <View
                  style={{
                    borderRadius: 10,
                    borderColor: '#000',
                    borderWidth: 1,
                    marginBottom: 15,
                    padding: 8,
                  }}>
                  <MultipleSelect
                    inputPlaceholder={'Please Select Hastag'}
                    options={hastagarray}
                    selectedValues={hastag}
                    onMultiSelect={onMultiHasTagChange()}
                    onTapClose={onMultiHasTagChange()}
                    isMulti
                  />
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: GAP.MEDIUM,
              }}>
              <Button onPress={() => submit()} gradient={true} title="Apply" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    //justifyContent: 'flex-end',
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.WHITE,
    fontFamily: FONT.FAMILY.REGULAR,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: '#000',
    paddingRight: 10, // to ensure the text is never behind the icon
    width: WIDTH * 0.85,
  },
  inputAndroid: {
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.WHITE,
    fontFamily: FONT.FAMILY.REGULAR,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    color: '#000',
    paddingRight: 10, // to ensure the text is never behind the icon
    width: WIDTH * 0.85,
  },
});
