import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, View, Text, StatusBar, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { HEIGHT, GAP, COLORS, WIDTH, FONT } from '../../Utils/constants';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { logoutUser } from '../../Redux/Actions/authAction';
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeightTab from '../../Components/Common/WeightTab';
import HomeList from '../../Components/Home/VideoList';
import AnimatedLoader from '../../Components/AnimatedLoader';
import Search from '../../Components/SearchComponent/Search';
import ImageView from '../../Components/Home/ImageView';
import Category from '../../Components/Home/Category';
import Filter from '../../Components/SearchComponent/Filter';
import Toast from 'react-native-root-toast';
import { category } from '../../Redux/Actions/Categoryaction';


const Home = (props) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [search, setsearch] = useState("");
  const [secondtab, setsecondtab] = useState("0");
  const [userMe, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [categorydata, setcategorydata] = React.useState([]);
  const [cousesdata, setcousesdata] = React.useState([]);
  const [allcousesdata, setallcousesdata] = React.useState([]);

  useEffect(() => {
    // setTimeout(() => { setLoading(false) }, 2500)
    getData()
  }, [])

  useFocusEffect(
    useCallback(() => {
      getData()
    }, []),
  );

  const getData = async () => {
    const alldata = await AsyncStorage.getItem("@user");
    const data = JSON.parse(alldata);
    setUser(data)
    getCategory(data)
    getAllCourses()
  }

  const changesecondTab = (tab, id) => {
    categorydata.map((data, i) => {
      if (i == tab) {
        console.log("tab", tab, id);
        setsecondtab(tab)
        getCourses(id)
      }
    })
  }

  const Recentdata = [
    {
      _id: 1,
      banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4JDUINyMkunfue2_WCsmqFfdnywUMYmJr0Q&usqp=CAU"
    },
    {
      _id: 2,
      banner: "https://grazia.wwmindia.com/content/2020/dec/yoga71607321001.jpg"
    },
    {
      _id: 3,
      banner: "https://img.freepik.com/free-photo/sporty-young-woman-doing-yoga-practice-isolated-concept-healthy-life-natural-balance-body-mental-development_231208-10353.jpg?size=626&ext=jpg"
    }
  ]

  const getCategory = (data) => {
    setLoading(true)
    Network('/get-course-category', 'get', { authtoken: data.authtoken })
      .then(async (res) => {
        setLoading(false)
        if (res.response_code === 200) {
          console.log("category data", res.response_data);
          setcategorydata(res.response_data)
          dispatch(category(res.response_data))
          if(res.response_data.length != 0){
            console.log("courses default id", res.response_data[0]._id);
            getCourses(res.response_data[0]._id)
          }
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

  const getCourses = async (id) => {
    setLoading(true)
    const alldata = await AsyncStorage.getItem("@user");
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    Network('/get-course?page=' + `${1}` + "&limit=" + `${100}` + "&categoryID=" + `${id}`, 'get', { authtoken })
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

  const getAllCourses = async () => {
    setLoading(true)
    const alldata = await AsyncStorage.getItem("@user");
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    Network('/get-course?page=' + `${1}` + "&limit=" + `${100}`, 'get', { authtoken })
      .then(async (res) => {
        setLoading(false)
        if (res.response_code === 200) {
          console.log("courses data", res.response_data.docs);
          setallcousesdata(res.response_data.docs)
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

  const gettime = () => {
    var curHr = new Date().getHours()
    if (curHr < 12) {
      return "Good Morning"
    } else if (curHr < 18) {
      return 'Good Afternoon'
    } else if (curHr > 17 && curHr < 24) {
      return 'Good Evening'
    } else {
      return 'Good Night'
    }
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Filter
          modal={modal}
          close={() => setModal(!modal)}
          applypress={(category, duration, rating)=> {navigation.navigate("Filter", {category, duration, rating}), setModal(false)}}
        />
        <View style={styles.container}>
          <AnimatedLoader loading={loading} />
          <View style={styles.repeatContainer}>
            <View style={{ marginVertical: HEIGHT * 0.020 }}>
              <Text style={{ fontSize: FONT.SIZE.EXTRALARGE, fontFamily: FONT.FAMILY.MEDIUM }}>{gettime()+", "} <Text style={{ fontFamily: FONT.FAMILY.BOLD }}>{userMe != null ? userMe.fname : ""}</Text></Text>
            </View>
            <Search
              onChange={(text) => setsearch(text)}
              value={search}
              onPress={() => setModal(true)}
              keypress={()=> navigation.navigate("Filter")}
              onFocus={false}
            />
          </View>
          <View style={[styles.repeatContainer, { marginBottom: 0 }]}>
            <View style={styles.categorycontainer}>
              <Category
                name={"Breath"}
                image={require("../../Assets/Home/breath.png")}
              />
              <Category
                name={"Timer"}
                image={require("../../Assets/Home/timer.png")}
              />
              <Category
                name={"Courses"}
                image={require("../../Assets/Home/courses.png")}
              />
              <Category
                name={"Talks"}
                image={require("../../Assets/Home/talks.png")}
              />
              <Category
                name={"Sounds"}
                image={require("../../Assets/Home/sound.png")}
              />
              <Category
                name={"Sleep"}
                image={require("../../Assets/Home/sleep.png")}
              />
              <Category
                name={"Children"}
                image={require("../../Assets/Home/children.png")}
              />
              <Category
                name={"Welness Mamas"}
                image={require("../../Assets/Home/welness.png")}
              />
              <Category
                name={"Guided Meditation"}
                image={require("../../Assets/Home/meditition.png")}
              />
              <Category
                name={"Movement"}
                image={require("../../Assets/Home/movement.png")}
              />
              <Category
                name={"Relaxation"}
                image={require("../../Assets/Home/relaxation.png")}
              />
              <Category
                name={"Work Well"}
                image={require("../../Assets/Home/work.png")}
              />
            </View>
          </View>
          <View style={[styles.repeatContainer]}>
            <WeightTab
              data={categorydata}
              active={secondtab}
              onPress={(tab, id) => changesecondTab(tab, id)}
            />
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={cousesdata}
              renderItem={({ item }) => (
                <HomeList
                  name={item.name}
                  img={item.banner}
                  author={"Admin"}
                  onPress={() => {
                    navigation.navigate("Details", {item:item})
                  }}
                  price={item.price}
                />
              )}
              keyExtractor={item => item._id}
              ListEmptyComponent={
                <View style={{ alignItems: "center", justifyContent: "center", width: WIDTH }}>
                  <Text style={{ alignItems: "center", textAlign: "center", fontSize:FONT.SIZE.MEDIUM, fontFamily:FONT.FAMILY.MEDIUM }}>This category have no data!</Text>
                </View>
              }
            />
          </View>
          <ImageView
            name={"Recently Played"}
            data={Recentdata}
            initialnumber={15}
          />
          <ImageView
            name={"New Addtion"}
            data={allcousesdata}
            initialnumber={10}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // paddingTop: GAP.MEDIUM,
    backgroundColor: COLORS.WHITE
  },
  repeatContainer: {
    width: "90%",
    alignSelf: "center",
    marginBottom: HEIGHT * 0.04
  },
  categorycontainer: {
    flexDirection: "row", flexWrap: "wrap", width: "100%", justifyContent: 'space-between',
  }
});

export default Home;