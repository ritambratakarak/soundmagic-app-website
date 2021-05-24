import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/core';
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
  const route = useRoute();
  const [search, setsearch] = useState("");
  const [alldata, setalldata] = useState("");
  const [modal, setModal] = React.useState(false);

  useEffect(()=>{
    console.log("details", route.params.item);
    setalldata(route.params.item)
  }, [route])

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
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.repeatContainer}>
            <Image source={require("../../Assets/Courses/rectangle.png")} style={{ width: "100%", height: HEIGHT * 0.26, borderRadius: 10 }} resizeMode={"cover"} />
            <View style={{ paddingHorizontal: 5, paddingVertical: 15 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Heading color={"#000"} name={alldata.name} />
                <Heading color={COLORS.PRIMARY} name={"$"+alldata.price} />
              </View>
              <CategogyList
                categoryname={"Category"}
                name={alldata.categoryDetails != undefined ? alldata.categoryDetails.name : ""}
              />
              <CategogyList
                categoryname={"Tutor"}
                name={"Admin"}
              />
              <View style={{ borderBottomColor: "#E5E5E5", borderBottomWidth: 0.5 }}>
                <TextContainer
                  size={FONT.SIZE.SMALL}
                  color={"#797979"}
                  content={alldata.description}
                />
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: HEIGHT * 0.02 }}>
                <Text style={[styles.description, { color: "#909090", fontSize: FONT.SIZE.SMALL }]}>Related documents &amp; Videos audios :</Text>
                <Text style={[styles.description, { color: COLORS.PRIMARY }]} onPress={()=> navigation.navigate("AllCourses", {item: alldata.tutorials})}>{"View all"}</Text>
              </View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                data={alldata.tutorials}
                renderItem={({ item }) => (
                  <CourseItem
                    heading={item.heading}
                    image={item.type == "video" ? item.videoThumbnail : "https://image.shutterstock.com/mosaic_250/4082746/408292723/stock-vector-white-play-button-vector-icon-gray-background-408292723.jpg"}
                    textsize={FONT.SIZE.SMALL}
                    textcolor={"#909090"}
                    text={item.type +" | "+ format(item.duration)}
                    categoryname={"Admin"}
                    onPress={()=> navigation.navigate("Details", )}
                    showfavorite={false}
                  />
                )}
                keyExtractor={item => item._id}
                ListEmptyComponent={<Text style={{ alignItems: "center", textAlign: "center" }}>No data Found</Text>}
                initialNumToRender={2}
              />
              <View style={{ alignSelf: "center", width: "100%", alignItems: "center", marginVertical: GAP.MEDIUM }}>
                <Button
                  onPress={() => navigation.navigate("Payment")}
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
