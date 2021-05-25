import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native';
import { FONT, GAP, HEIGHT, WIDTH } from '../../Utils/constants';
import CourseItem from '../../Components/Details/CourseItem';


function AllCourses() {
  const data = [
    {
      heading: "Regular Yoga",
      image: require("../../Assets/Courses/Rectangle_2.png"),
      text: "Video | 3 min 55 sec",
      categoryname: "Admin"
    },
    {
      heading: "Mind Meditition Tone",
      image: require("../../Assets/Courses/Rectangle_1.png"),
      text: "Video | 3 min 55 sec",
      categoryname: "Admin"
    },
  ]
  return (
    <View style={styles.container}>
      <View style={styles.repeatContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          data={data}
          renderItem={({ item }) => (
            <CourseItem
              heading={item.heading}
              image={item.image}
              textsize={FONT.SIZE.SMALL}
              textcolor={"#909090"}
              text={item.text}
              categoryname={"Admin"}
              onPress={() => console.log()}
              showfavorite={false}
            />
          )}
          keyExtractor={item => item._id}
          ListEmptyComponent={<Text style={{ alignItems: "center", textAlign: "center" }}>No data Found</Text>}
        />
      </View>
    </View>
  )
}

export default AllCourses;

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
})