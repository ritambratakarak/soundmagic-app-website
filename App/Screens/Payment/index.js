import React, { useCallback, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, CheckBox } from 'react-native';
import { FONT, GAP, HEIGHT, WIDTH } from '../../Utils/constants';
import Button from "../../Components/Common/Button";
import PaymetComponent from "../../Components/Payment";
import { useFocusEffect, useNavigation } from '@react-navigation/core';


function Payment() {
  const [isSelected, setselected] = useState(false);
  const navigation = useNavigation()

  function setSelection(){
    setselected(!isSelected)
  }

  return (
    <View style={styles.container}>
      <View style={styles.repeatContainer}>
        <PaymetComponent
          cardname={"John Doe"}
          value={isSelected}
          onChange={setSelection}
          cardnumber={"XXXX  XXXX  XXXX  7895"}
          deletepress={()=> console.log("aaa")}
        />
        <PaymetComponent
          cardname={"John Doe"}
          value={isSelected}
          onChange={setSelection}
          cardnumber={"XXXX  XXXX  XXXX  7895"}
          deletepress={()=> console.log("aaa")}
        />
      
        <View style={styles.addcontainer}>
          <Text style={styles.addcard} onPress={()=> navigation.navigate("AddPayment")}>Add Debit / Credit Card</Text>
          <Button
            gradient={true}
            title={"PAY"}
            onPress={()=> console.log("aaa")}
          />
        </View>
      </View>
    </View>
  );
}

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: "#fff"
  },
  repeatContainer: {
    width: "90%",
    alignSelf: "center",
    marginVertical: HEIGHT * 0.02,
  },
  addcard: {
    color:"#424242", fontFamily:FONT.FAMILY.BLACK, fontSize:FONT.SIZE.SMALL, paddingBottom: HEIGHT * 0.02,
  },
  addcontainer:{
    alignItems:"center", width:"100%", marginVertical:HEIGHT * 0.05, 
  }
})
