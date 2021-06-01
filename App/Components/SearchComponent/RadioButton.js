import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import { COLORS } from '../../Utils/constants';


function CustomRadioButton({PROP, press}) {
  const [value, setvalue] = useState(null);

  return (
    <View>
      {PROP.map((res) => {
        return (
          <TouchableOpacity key={res.key} style={styles.container} onPress={() => {
            press(res.key), setvalue(res.key)
          }}>
            <View style={styles.radioCircle}>
              {value === res.key && <View style={styles.selectedRb} />}
            </View>
            <Image source={res.image} style={{width: 100, height:20, marginLeft:5}} resizeMode={'cover'} />
            <Text style={styles.radioText}>{res.text}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CustomRadioButton;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioText: {
    marginRight: 35,
    fontSize: 20,
    color: '#000',
    fontWeight: '400',
    marginLeft:10
  },
  radioCircle: {
    height: 25,
    width: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: COLORS.PRIMARY,
  },
  result: {
    marginTop: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#F3FBFE',
  },
});
