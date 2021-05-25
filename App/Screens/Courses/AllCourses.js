import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native';
import { FONT, GAP, HEIGHT, WIDTH } from '../../Utils/constants';
import CourseItem from '../../Components/Details/CourseItem';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';


function AllCourses() {
  const route = useRoute();
  const [alldata, setalldata] = useState("");

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

  useEffect(() => {
    console.log("details", route.params.item);
    setalldata(route.params.item)
  }, [route])

  function format(time) {   
    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;

    let ret = "";
    if (hrs > 0) {
        ret += "" + hrs + " hours " + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + " min " + (secs < 10 ? "0" : "");
    ret += "" + secs + " sec ";
    return ret;
  }

  return (
    <View style={styles.container}>
      <View style={styles.repeatContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          data={alldata}
          renderItem={({ item }) => (
            <CourseItem
              heading={item.heading}
              image={item.type == "video" ? item.videoThumbnail : "https://image.shutterstock.com/mosaic_250/4082746/408292723/stock-vector-white-play-button-vector-icon-gray-background-408292723.jpg"}
              textsize={FONT.SIZE.SMALL}
              textcolor={"#909090"}
              text={item.type + " | " + format(item.duration)}
              categoryname={"Admin"}
              onPress={() => navigation.navigate("Details",)}
              showfavorite={false}
            />
          )}
          keyExtractor={item => item._id}
          ListEmptyComponent={<Text style={{ alignItems: "center", textAlign: "center", justifyContent:"center" }}>No data Found</Text>}
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