import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../Utils/constants';


const CheckboxScreen = (props) => {
  const [isCheck, setisCheck] = useState(false);

  const handleCheck = () => {
    if (isCheck) {
      props.onPress(false);
      setisCheck(false);
    } else {
      setisCheck(true);
      props.onPress(true);
    }
  };

  // console.log('checked=======>', props.checked);
  return (
    <TouchableOpacity onPress={handleCheck} style={{flexDirection:"row",
    marginVertical:10}}>
      <View
        style={{
          height: 24,
          width: 24,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight:10
        }}>
        <View
          style={{
            height: 12,
            width: 12,
            backgroundColor: isCheck ? '#000' : '#FFF',
          }}
        />
      </View>
      <Text style={{fontSize:FONT.SIZE.MEDIUM}}>{props.name}</Text>
    </TouchableOpacity>
  );
};

export default CheckboxScreen;
