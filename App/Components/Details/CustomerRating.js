import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text, FlatList } from 'react-native';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';
import Heading2 from '../Common/Heading2';
import RatingComponent from '../Rating/Rating';
import TextContainer from '../../Components/Common/Text';


export default CustomerRating = ({ main, data }) => {
  return (
    <View style={{ marginVertical: GAP.MEDIUM, }}>
      <Text style={[styles.description, { color: "#909090", fontSize: FONT.SIZE.SMALL }]}>{main}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        data={data}
        renderItem={({ item }) => (
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={item.image} style={{ marginRight: 10, borderRadius: HEIGHT / 2, height: 35, width: 35 }} />
              <Heading2
                name={item.heading}
              />
            </View>
            <View style={{ justifyContent: "flex-start", alignCenter: "flex-start", alignSelf: "flex-start", }}>
              <RatingComponent
                value={item.commentrate}
                rate={() => console.log()}
                backgroundColor={"#fff"}
                disable={true}
              />
            </View>
            <TextContainer
              size={FONT.SIZE.SMALL}
              color={"#909090"}
              content={item.comment}
            />
          </View>
        )}
        keyExtractor={item => item._id}
        ListEmptyComponent={<Text style={{ alignItems: "center", textAlign: "center" }}>No data Found</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  description: {
    fontFamily: FONT.FAMILY.REGULAR,
    marginBottom: GAP.MEDIUM,
    paddingBottom: 10
  }
  // repeatContainer: {
  //   width: "90%",
  //   alignSelf: "center",
  // },
})