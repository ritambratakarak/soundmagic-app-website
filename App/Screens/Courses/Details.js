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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/Actions/authAction';
import Toast from 'react-native-root-toast';



function Details() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const [alldata, setalldata] = useState("");
  const [review, setreview] = useState([]);
  const [loadmore, setloadmore] = useState(false);
  const [limit, setlimit] = useState(5);
  
  let stopFetchMore = true;

  useEffect(() => {
    console.log("details", route.params.item);
    setalldata(route.params.item)
    const coursedata = route.params.item;
    const couseid = coursedata._id;
    getReviews(couseid)
  }, [route])

  const getReviews = async (id) => {
    console.log("review id", id);
    // setLoading(true)
    const userdata = await AsyncStorage.getItem("@user");
    const data = JSON.parse(userdata);
    const authtoken = data.authtoken;
    Network(`/get-course-review-list?page=${1}&limit=${limit}&courseID=${id == undefined ? alldata._id : id}`, 'get', { authtoken })
      .then(async (res) => {
        // setLoading(false)
        if (res.response_code === 200) {
          console.log("review data", res.response_data.docs);
          setreview(res.response_data.docs)
          // setcousesdata(res.response_data.docs)
          // Toast.show(res.response_message);
        }
        else if (res.response_code === 4000) {
          Toast.show(res.response_message);
          await AsyncStorage.removeItem('@user');
          dispatch(logoutUser())
        }
        else {
          Toast.show(res.response_message);
        }
      }).catch(error => {
        Toast.show(error)
        // setLoading(false)
      })
  }

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

  const _loadMoreData = () => {
    setloadmore(true)
    if (!stopFetchMore) {
      console.log("call load more");
      setlimit(limit + 5)
      getReviews();
      stopFetchMore = true;
    }
  }


  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.repeatContainer}>
            <Image source={{ uri: alldata.banner }} style={{ width: "100%", height: HEIGHT * 0.26, borderRadius: 10 }} resizeMode={"cover"} />
            <View style={{ paddingHorizontal: 5, paddingVertical: 15 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Heading color={"#000"} name={alldata.name} />
                <Heading color={COLORS.PRIMARY} name={"$" + alldata.price} />
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
                <Text style={[styles.description, { color: COLORS.PRIMARY }]} onPress={() => navigation.navigate("AllCourses", { item: alldata.tutorials })}>{"View all"}</Text>
              </View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                data={alldata.tutorials}
                renderItem={({ item }) => (
                  <CourseItem
                    heading={item.name}
                    image={item.type == "video" ? item.videoThumbnail : "https://image.shutterstock.com/mosaic_250/4082746/408292723/stock-vector-white-play-button-vector-icon-gray-background-408292723.jpg"}
                    textsize={FONT.SIZE.SMALL}
                    textcolor={"#909090"}
                    text={item.type + " | " + format(item.duration)}
                    categoryname={"Admin"}
                    onPress={() => navigation.navigate("Player", { url: item.type == "video" ? item.videoURL : item.audioURL, type: item.type })}
                    showfavorite={false}
                  />
                )}
                keyExtractor={item => item._id}
                ListEmptyComponent={<Text style={{ alignItems: "center", textAlign: "center", fontSize: FONT.SIZE.MEDIUM, fontFamily: FONT.FAMILY.MEDIUM }}>No data found!</Text>}
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
                data={review}
                loadmore={loadmore}
                endreached={_loadMoreData}
                // throttle={200}
                scrollbegin={() => {stopFetchMore = false;}}
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
