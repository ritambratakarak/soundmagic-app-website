import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Text, FlatList } from 'react-native';
import { COLORS, HEIGHT, FONT, GAP, WIDTH } from '../../Utils/constants';
import Heading2 from '../Common/Heading2';
import RatingComponent from '../Rating/Rating';
import TextContainer from '../../Components/Common/Text';


export default CustomerRating = ({ main, data, loadmore, endreached, throttle, scrollbegin }) => {
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
              <Image source={{ uri: item.userDetails.profile_image }} style={{ marginRight: 10, borderRadius: HEIGHT / 2, height: 35, width: 35 }} />
              <Heading2
                name={item.userDetails.fname + " " + item.userDetails.lname}
              />
            </View>
            <View style={{ justifyContent: "flex-start", alignCenter: "flex-start", alignSelf: "flex-start", }}>
              <RatingComponent
                value={item.rating}
                rate={() => console.log()}
                backgroundColor={"#fff"}
                disable={true}
              />
            </View>
            <TextContainer
              size={FONT.SIZE.SMALL}
              color={"#909090"}
              content={item.review}
            />
          </View>
        )}
        keyExtractor={item => item._id}
        ListEmptyComponent={<View style={{ alignItems: "center", justifyContent: "center", width: WIDTH }}>
          <Text style={{ alignItems: "center", textAlign: "center", fontSize: FONT.SIZE.MEDIUM, fontFamily: FONT.FAMILY.MEDIUM }}>No data found!</Text>
        </View>}
        ListFooterComponent={
          <View style={styles.footer}>
            {loadmore &&
              <Text style={styles.footerText}>Loading More...</Text>
            }
          </View>
        }
        scrollEventThrottle={throttle}
        onEndReached={endreached}
        onEndReachedThreshold={0.01}
        onMomentumScrollBegin={scrollbegin}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  description: {
    fontFamily: FONT.FAMILY.REGULAR,
    marginBottom: GAP.MEDIUM,
    paddingBottom: 10
  },
  footerText:{
    fontSize:FONT.SIZE.MEDIUM,
    paddingBottom: GAP.LARGE,
    textAlign:"center"
  }
  // repeatContainer: {
  //   width: "90%",
  //   alignSelf: "center",
  // },
})