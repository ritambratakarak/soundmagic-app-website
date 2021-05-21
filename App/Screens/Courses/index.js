import { useFocusEffect, useNavigation } from '@react-navigation/core';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import CategogyList from '../../Components/Common/CategogyList';
import CoursesItem from '../../Components/Courses/Courses';
import Filter from '../../Components/SearchComponent/Filter';
import Search from '../../Components/SearchComponent/Search';
import { COLORS, FONT, GAP, HEIGHT, WIDTH } from '../../Utils/constants';


function Courses() {
  const navigation = useNavigation();
  const [search, setsearch] = useState("");
  const [modal, setModal] = React.useState(false);

  const data = [
    {
      _id: 1,
      image: require('../../Assets/Courses/rectangle.png'),
      heading: "Women Working Out",
      cName: "Yoga",
      tName: "Jasica Smith",
      qty:"10 Videos & 2 Audios",
      rate: 3,
      price: "$56"
    },
    {
      _id: 2,
      image: require('../../Assets/Courses/rectangle2.png'),
      heading: "Men Working Out",
      cName: "Yoga",
      tName: "John Smith",
      qty:"14 Audios",
      rate: 4,
      price: "$30"
    },
    {
      _id: 3,
      image: require('../../Assets/Courses/rectangle.png'),
      heading: "Stretch",
      cName: "Yoga",
      tName: "John Smith",
      qty:"14 Audios",
      rate: 4,
      price: "$30"
    },
  ]

  return (
    <View style={styles.container}>
      <Filter
        modal={modal}
        close={() => setModal(!modal)}
        caregory={() => console.log("aaa")}
        classduration={() => console.log("bbb")}
        rating={() => console.log("ccc")}
      />
      <View style={styles.repeatContainer}>
        <Search
          onChange={(text) => setsearch(text)}
          value={search}
          onPress={() => setModal(true)}
        />
        <View style={{ marginVertical: GAP.MEDIUM }}>
          <Text style={styles.courses}>All Couses</Text>
          <FlatList
            style={{marginBottom: HEIGHT * 0.18}}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            data={data}
            renderItem={({ item }) => (
              <CoursesItem
                image={item.image}
                heading={item.heading}
                categoryname={item.cName}
                tutorname={item.tName}
                qty={item.qty}
                rateingvalue={item.rate}
                rating={() => console.log("")}
                ratingcolor={"#ECECEC"}
                price={item.price}
                ratingdisable={true}
                onPress={()=> navigation.navigate("Details")}
              />
            )}
            keyExtractor={item => item._id}
            ListEmptyComponent={<Text style={{ alignItems: "center", textAlign: "center" }}>No data Found</Text>}
          />
        </View>
      </View>
    </View>
  );
}

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex:1,
    // height: HEIGHT,
    width: WIDTH,
    backgroundColor:"#fff"
  },
  repeatContainer: {
    width: "90%",
    alignSelf: "center",
    marginBottom: HEIGHT * 0.04
  },
  courses: {
    color: COLORS.PRIMARY, fontSize: FONT.SIZE.LARGE, fontFamily: FONT.FAMILY.MEDIUM, marginBottom: GAP.MEDIUM
  }
});
