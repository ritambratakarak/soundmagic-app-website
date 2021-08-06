import React, { useCallback, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import Button from "../../Components/Common/Button";
import { COLORS, FONT, HEIGHT, WIDTH } from '../../Utils/constants';
import { CheckBox } from "react-native-elements";


function AddPayment() {
  const [carddata, setcarddata] = useState("");
  const [savecard, setsavecard] = useState(false);
  const _onChange = (formData) => setcarddata(formData);
  const _onFocus = (field) => console.log("focusing", field);

  return (
    <View style={styles.container}>
      <View style={styles.repeatContainer}>
        <CreditCardInput
          autoFocus
          requiresName
          requiresCVC
          labelStyle={styles.label}
          inputStyle={styles.input}
          validColor={"black"}
          invalidColor={"red"}
          placeholderColor={"darkgray"}
          onFocus={_onFocus}
          onChange={_onChange} />
        {
          carddata.valid ?
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <CheckBox
                title={"Do you want save this card?"}
                checked={savecard}
                onPress={() => setsavecard(!savecard)}
                containerStyle={{ backgroundColor: COLORS.TRANSPARENT, borderWidth: 0, width: "80%" }}
                textStyle={{ color: COLORS.BLACK, fontSize: FONT.SIZE.BIG, fontFamily: FONT.FAMILY.HEAVY, fontWeight: "100" }}
              />
            </View>
            : null
        }
        {carddata.valid == true ?
        <View style={{alignSelf:"center", width:"100%", alignItems:"center"}}>
          <Button
            gradient={true}
            title="ENTER"
            onPress={() => console.log("aaa")}
          />
        </View>
          : null
        }
      </View>
    </View>
  );
}

export default AddPayment;

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
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
})