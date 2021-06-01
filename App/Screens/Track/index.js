import { useFocusEffect, useNavigation } from '@react-navigation/core';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import CategogyList from '../../Components/Common/CategogyList';
import CourseItem from '../../Components/Details/CourseItem';
import Filter from '../../Components/SearchComponent/Filter';
import Search from '../../Components/SearchComponent/Search';
import { COLORS, FONT, GAP, HEIGHT, WIDTH } from '../../Utils/constants';


function Track() {
  const navigation = useNavigation();
  const [search, setsearch] = useState("");
  const [modal, setModal] = React.useState(false);

  const data = [
    {
      _id: 1,
      heading:"Regular Yoga",
      image: require("../../Assets/Courses/Rectangle_2.png"),
      text: "Video | 3 min 55 sec",
      categoryname: "Admin",
      isFavorite: false
    },
    {
      _id: 2,
      heading:"Mind Meditition Tone",
      image: require("../../Assets/Courses/Rectangle_1.png"),
      text: "Video | 3 min 55 sec",
      categoryname: "Admin",
      isFavorite: true
    },
    {
      _id: 3,
      heading:"Mind Meditition Tone",
      image: require("../../Assets/Courses/Rectangle_1.png"),
      text: "Video | 3 min 55 sec",
      categoryname: "Admin",
      isFavorite: false,
    },
    {
      _id: 4,
      heading:"Mind Meditition Tone",
      image: require("../../Assets/Courses/Rectangle_1.png"),
      text: "Video | 3 min 55 sec",
      categoryname: "Admin",
      isFavorite: true,
    },
    {
      _id: 5,
      heading:"Mind Meditition Tone",
      image: require("../../Assets/Courses/Rectangle_1.png"),
      text: "Video | 3 min 55 sec",
      categoryname: "Admin",
      isFavorite: true,
    },
    {
      _id: 6,
      heading:"Mind Meditition Tone",
      image: require("../../Assets/Courses/Rectangle_1.png"),
      text: "Video | 3 min 55 sec",
      categoryname: "Admin",
      isFavorite: true,
    },
    {
      _id: 7,
      heading:"Mind Meditition Tone",
      image: require("../../Assets/Courses/Rectangle_1.png"),
      text: "Video | 3 min 55 sec",
      categoryname: "Admin",
      isFavorite: true,
    },
  ]

  return (
    <View style={styles.container}>
      <Filter
        modal={modal}
        close={() => setModal(!modal)}
      />
      <View style={styles.repeatContainer}>
        <Search
          onChange={(text) => setsearch(text)}
          value={search}
          onPress={() => setModal(true)}
          keypress={()=> navigation.navigate("Filter")}
          onFocus={false}
        />
        <View style={{ marginVertical: GAP.MEDIUM }}>
          <Text style={styles.courses}>All Track</Text>
          <FlatList
            style={{ marginBottom: HEIGHT * 0.18 }}
            showsVerticalScrollIndicator={false}
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
                showfavorite={true}
                Pressfavorite={() => console.log()}
                favorite={item.isFavorite}
              />
            )}
            keyExtractor={item => item._id}
            ListEmptyComponent={<View style={{ alignItems: "center", justifyContent: "center", width: WIDTH }}>
            <Text style={{ alignItems: "center", textAlign: "center", fontSize:FONT.SIZE.MEDIUM, fontFamily:FONT.FAMILY.MEDIUM }}>No data found!</Text>
          </View>}
          />
        </View>
      </View>
    </View>
  );
}

export default Track;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: HEIGHT,
    width: WIDTH,
    backgroundColor: "#fff"
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
