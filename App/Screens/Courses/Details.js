import { useFocusEffect, useNavigation } from '@react-navigation/core';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import CategogyList from '../../Components/Common/CategogyList';
import Button from '../../Components/Common/Button';
import TextContainer from '../../Components/Common/Text';
import { COLORS, FONT, GAP, HEIGHT, WIDTH } from '../../Utils/constants';
import RatingComponent from '../../Components/Rating/Rating';
import CourseItem from '../../Components/Details/CourseItem';
import CustomerRating from '../../Components/Details/CustomerRating';


function Details() {
  const navigation = useNavigation();
  const [search, setsearch] = useState("");
  const [modal, setModal] = React.useState(false);

  const data = [
    {
      heading:"Regular Yoga",
      image:require("../../Assets/Courses/Rectangle_2.png"),
      text: "Video | 3 min 55 sec",
      categoryname: "Admin"
    },
    {
      heading:"Mind Meditition Tone",
      image:require("../../Assets/Courses/Rectangle_1.png"),
      text: "Video | 3 min 55 sec",
      categoryname: "Admin"
    },
  ]

  const data2 = [
    {
      heading:"Regular Yoga",
      image:require("../../Assets/Courses/Rectangle_1.png"),
      commentrate: 5,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      heading:"Regular Yoga",
      image:require("../../Assets/Courses/Rectangle_2.png"),
      commentrate: 5,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ]

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.repeatContainer}>
            <Image source={require("../../Assets/Courses/rectangle.png")} style={{ width: "100%", height: HEIGHT * 0.26, borderRadius: 10 }} resizeMode={"cover"} />
            <View style={{ paddingHorizontal: 5, paddingVertical: 15 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Heading color={"#000"} name={"Women Working Out"} />
                <Heading color={COLORS.PRIMARY} name={"$59"} />
              </View>
              <CategogyList
                categoryname={"Category"}
                name={"Yoga"}
              />
              <CategogyList
                categoryname={"Tutor"}
                name={"Jasica Smith"}
              />
              <View style={{ borderBottomColor: "#E5E5E5", borderBottomWidth: 0.5 }}>
                <TextContainer
                  size={FONT.SIZE.SMALL}
                  color={"#797979"}
                  content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                />
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: HEIGHT * 0.02 }}>
                <Text style={[styles.description, { color: "#909090", fontSize: FONT.SIZE.SMALL }]}>Related documents &amp; Videos audios :</Text>
                <Text style={[styles.description, { color: COLORS.PRIMARY }]} onPress={()=> navigation.navigate("AllCourses")}>{"View all"}</Text>
              </View>
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
                    onPress={()=> console.log()}
                    showfavorite={false}
                  />
                )}
                keyExtractor={item => item._id}
                ListEmptyComponent={<Text style={{ alignItems: "center", textAlign: "center" }}>No data Found</Text>}
              />
              <View style={{ alignSelf: "center", width: "100%", alignItems: "center", marginVertical: GAP.MEDIUM }}>
                <Button
                  onPress={() => console.log("ss")}
                  gradient={true}
                  title="Enroll Now"
                />
              </View>
              <CustomerRating
                main={"Rating & Reviews :"}
                data={data2}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default Details;

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
  courses: {
    color: COLORS.PRIMARY, fontSize: FONT.SIZE.LARGE, fontFamily: FONT.FAMILY.MEDIUM, marginBottom: GAP.MEDIUM
  },
  description: {
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.SMALL,
    marginBottom: GAP.MEDIUM,
    color: "#797979",
    paddingBottom: 10
  }
});
