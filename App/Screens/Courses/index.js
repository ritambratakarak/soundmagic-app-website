import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import AnimatedLoader from '../../Components/AnimatedLoader';
import CategogyList from '../../Components/Common/CategogyList';
import CoursesItem from '../../Components/Courses/Courses';
import Filter from '../../Components/SearchComponent/Filter';
import Search from '../../Components/SearchComponent/Search';
import { COLORS, FONT, GAP, HEIGHT, WIDTH } from '../../Utils/constants';
import { logoutUser } from '../../Redux/Actions/authAction';
import Toast from 'react-native-root-toast';
import Coursesloader from '../../Components/Courses/Cousesloader';


function Courses() {
  const navigation = useNavigation();
  const [search, setsearch] = useState("");
  const [modal, setModal] = React.useState(false);
  const [cousesdata, setcousesdata] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(()=>{
    getCourses()
  }, [])

  useFocusEffect(
    useCallback(() => {
      getCourses()
    }, []),
  );

  const getCourses = async () => {
    setLoading(true)
    const alldata = await AsyncStorage.getItem("@user");
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    Network(`/get-course?page=${1}&limit=${20}`, 'get', { authtoken })
      .then(async (res) => {
        setLoading(false)
        if (res.response_code === 200) {
          console.log("courses data", res.response_data.docs);
          setcousesdata(res.response_data.docs)
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
        setLoading(false)
      })
  }

  return (
    <View style={styles.container}>
      {/* <AnimatedLoader loading={loading} /> */}
      <Filter
        modal={modal}
        close={() => setModal(!modal)}
        applypress={(category, duration, rating)=> {navigation.navigate("Filter", {category, duration, rating}), setModal(false)}}
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
          <Text style={styles.courses}>All Couses</Text>
          <FlatList
            style={{marginBottom: HEIGHT * 0.18}}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            data={cousesdata}
            renderItem={({ item }) => (
              <CoursesItem
                image={item.banner}
                heading={item.name}
                categoryname={item.categoryDetails.name}
                tutorname={"Admin"}
                qty={item.totalAudio+" Audio" + " & " + item.totalVideo + " Video"}
                rateingvalue={item.avgRating}
                rating={() => console.log("")}
                ratingcolor={"#ECECEC"}
                price={"$"+item.price}
                ratingdisable={true}
                onPress={()=> navigation.navigate("Details", {item:item})}
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