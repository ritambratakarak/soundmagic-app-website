/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { HEIGHT, GAP, COLORS, WIDTH, FONT } from '../../Utils/constants';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { logoutUser } from '../../Redux/Actions/authAction';
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WeightTab from '../../Components/Common/WeightTab';
import HomeList from '../../Components/Video/VideoList';
import AnimatedLoader from '../../Components/AnimatedLoader';



const Home = (props) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [search, setsearch] = useState("")
  const [secondtab, setsecondtab] = useState("0");
  const [userMe, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 3000)
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
  }

  const secondUserData = ["Popular Courses", "Featured", "Member Only"];

  const changesecondTab = (tab) => {
    if (tab == 0) {
      setsecondtab("0")
    } else if (tab == 1) {
      setsecondtab("1")
    } else if (tab == 2) {
      setsecondtab("2")
    }
  }

  return (
    <>
      <View style={styles.container}>
        <AnimatedLoader loading={loading} />
        <View style={styles.repeatContainer}>
          <View style={{ marginVertical: HEIGHT * 0.020 }}>
            <Text style={{ fontSize: FONT.SIZE.EXTRALARGE, fontFamily: FONT.FAMILY.MEDIUM }}>Good Morning, <Text style={{ fontFamily: FONT.FAMILY.BOLD }}>{userMe != null ? userMe.fname : ""}</Text></Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: HEIGHT * 0.005, justifyContent: "space-between" }}>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={COLORS.GRAY}
                placeholder={"Search for Courses"}
                onChangeText={(text) => setsearch(text)}
                value={search}
              />
              <EvilIcons
                name="search"
                size={30}
                color={'gray'}
                style={{ position: "absolute", right: 10, top: 10 }}
              />
            </View>
            <View style={{ backgroundColor: "#edeffc", height: HEIGHT * 0.06, width: WIDTH * 0.12, borderRadius: HEIGHT / 2, alignItems: "center", justifyContent: "center" }}>
              <AntDesign
                name="filter"
                size={HEIGHT * 0.03}
                color={'gray'}
              />
            </View>
          </View>
        </View>
        <View style={[styles.repeatContainer, { marginBottom: HEIGHT * 0.04 }]}>
          <WeightTab
            data={secondUserData}
            active={secondtab}
            onPress={(tab) => changesecondTab(tab)}
          />
          {secondtab == "0" &&
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <HomeList
                name={"Yoga for DOSHA"}
                img={"https://mk0doyoucomnn0s0iurt.kinstacdn.com/wp-content/uploads/2021/03/j-u0wzxoxg8-scaled.jpg"}
                author={"Alex D Costa"}
                onPress={() => {
                  console.log("aa");
                }}
                price={"29"}
                authorimg={"https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg"}
              />
              <HomeList
                name={"Yoga for DOSHA"}
                img={"https://m.timesofindia.com/thumb/msid-69889676/69889676.jpg?resizemode=4&width=400"}
                author={"Alex D Costa"}
                onPress={() => {
                  console.log("aa");
                }}
                price={"29"}
                authorimg={"https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg"}
              />
              <HomeList
                name={"Yoga for DOSHA"}
                img={"https://st.depositphotos.com/1686706/4692/i/600/depositphotos_46924139-stock-photo-young-asian-woman-practicing-yoga.jpg"}
                author={"Alex D Costa"}
                onPress={() => {
                  console.log("aa");
                }}
                price={"29"}
                authorimg={"https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg"}
              />
              <HomeList
                name={"Yoga for DOSHA"}
                img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNjnw7uUuIVXqOs2SNig7to8D1La-qYiJ6Ew&usqp=CAU"}
                author={"Alex D Costa"}
                onPress={() => {
                  console.log("aa");
                }}
                price={"29"}
                authorimg={"https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg"}
              />
            </ScrollView>
          }
          {secondtab == "1" &&
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <HomeList
                name={"Yoga for DOSHA"}
                img={"https://st.depositphotos.com/1686706/4692/i/600/depositphotos_46924139-stock-photo-young-asian-woman-practicing-yoga.jpg"}
                author={"Alex D Costa"}
                onPress={() => {
                  console.log("aa");
                }}
                price={"29"}
                authorimg={"https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg"}
              />
              <HomeList
                name={"Yoga for DOSHA"}
                img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNjnw7uUuIVXqOs2SNig7to8D1La-qYiJ6Ew&usqp=CAU"}
                author={"Alex D Costa"}
                onPress={() => {
                  console.log("aa");
                }}
                price={"29"}
                authorimg={"https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg"}
              />
              <HomeList
                name={"Yoga for DOSHA"}
                img={"https://mk0doyoucomnn0s0iurt.kinstacdn.com/wp-content/uploads/2021/03/j-u0wzxoxg8-scaled.jpg"}
                author={"Alex D Costa"}
                onPress={() => {
                  console.log("aa");
                }}
                price={"29"}
                authorimg={"https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg"}
              />
              <HomeList
                name={"Yoga for DOSHA"}
                img={"https://m.timesofindia.com/thumb/msid-69889676/69889676.jpg?resizemode=4&width=400"}
                author={"Alex D Costa"}
                onPress={() => {
                  console.log("aa");
                }}
                price={"29"}
                authorimg={"https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg"}
              />
            </ScrollView>
          }
          {secondtab == "2" &&
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

              <HomeList
                name={"Yoga for DOSHA"}
                img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNjnw7uUuIVXqOs2SNig7to8D1La-qYiJ6Ew&usqp=CAU"}
                author={"Alex D Costa"}
                onPress={() => {
                  console.log("aa");
                }}
                price={"29"}
                authorimg={"https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg"}
              />
              <HomeList
                name={"Yoga for DOSHA"}
                img={"https://mk0doyoucomnn0s0iurt.kinstacdn.com/wp-content/uploads/2021/03/j-u0wzxoxg8-scaled.jpg"}
                author={"Alex D Costa"}
                onPress={() => {
                  console.log("aa");
                }}
                price={"29"}
                authorimg={"https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg"}
              />
              <HomeList
                name={"Yoga for DOSHA"}
                img={"https://m.timesofindia.com/thumb/msid-69889676/69889676.jpg?resizemode=4&width=400"}
                author={"Alex D Costa"}
                onPress={() => {
                  console.log("aa");
                }}
                price={"29"}
                authorimg={"https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg"}
              />
              <HomeList
                name={"Yoga for DOSHA"}
                img={"https://st.depositphotos.com/1686706/4692/i/600/depositphotos_46924139-stock-photo-young-asian-woman-practicing-yoga.jpg"}
                author={"Alex D Costa"}
                onPress={() => {
                  console.log("aa");
                }}
                price={"29"}
                authorimg={"https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg"}
              />
            </ScrollView>
          }
        </View>
        <View style={[styles.repeatContainer, { marginBottom: HEIGHT * 0.04 }]}>
          <Text style={{ fontSize: FONT.SIZE.LARGE, fontFamily: FONT.FAMILY.HEAVY, marginBottom: HEIGHT * 0.02 }}>Recently Played</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={{ width: WIDTH * 0.30, height: HEIGHT * 0.15, marginRight: 10 }}>
              <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4JDUINyMkunfue2_WCsmqFfdnywUMYmJr0Q&usqp=CAU" }} style={{ width: "100%", height: "100%", borderRadius: 5 }} resizeMode={"stretch"} />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: WIDTH * 0.30, height: HEIGHT * 0.15, marginRight: 10 }}>
              <Image source={{ uri: "https://grazia.wwmindia.com/content/2020/dec/yoga71607321001.jpg" }} style={{ width: "100%", height: "100%", borderRadius: 5 }} resizeMode={"stretch"} />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: WIDTH * 0.30, height: HEIGHT * 0.15, marginRight: 10 }}>
              <Image source={{ uri: "https://img.freepik.com/free-photo/sporty-young-woman-doing-yoga-practice-isolated-concept-healthy-life-natural-balance-body-mental-development_231208-10353.jpg?size=626&ext=jpg" }} style={{ width: "100%", height: "100%", borderRadius: 5 }} resizeMode={"stretch"} />
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.repeatContainer}>
          <Text style={{ fontSize: FONT.SIZE.LARGE, fontFamily: FONT.FAMILY.HEAVY, marginBottom: HEIGHT * 0.02 }}>New Addtion</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={{ width: WIDTH * 0.30, height: HEIGHT * 0.15, marginRight: 10 }}>
              <Image source={{ uri: "https://us.123rf.com/450wm/fizkes/fizkes1710/fizkes171000616/87527966-young-attractive-woman-practicing-yoga-stretching-in-natarajasana-exercise-lord-of-the-dance-pose-wo.jpg?ver=6" }} style={{ width: "100%", height: "100%", borderRadius: 5 }} resizeMode={"stretch"} />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: WIDTH * 0.30, height: HEIGHT * 0.15, marginRight: 10 }}>
              <Image source={{ uri: "https://imgk.timesnownews.com/story/iStock-1076946698.jpg?tr=w-400,h-300,fo-auto" }} style={{ width: "100%", height: "100%", borderRadius: 5 }} resizeMode={"stretch"} />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: WIDTH * 0.30, height: HEIGHT * 0.15, marginRight: 10 }}>
              <Image source={{ uri: "https://www.adityabirlacapital.com/healthinsurance/active-together/wp-content/uploads/2020/04/Yogi-with-kids.jpg" }} style={{ width: "100%", height: "100%", borderRadius: 5 }} resizeMode={"stretch"} />
            </TouchableOpacity>
          </ScrollView>
        </View>
        
      </View>
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

  },
  InputContainer: {
    width: "85%",
    height: HEIGHT * 0.060,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#edeffc",
    position: "relative"
  },
  textInput: {
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.PRIMARY,
    // backgroundColor: 'red',
    padding: HEIGHT * 0.015,
    width: WIDTH * 0.68,
    textAlign: 'left',
    fontFamily: FONT.FAMILY.ROMAN,
    alignSelf: "flex-start"
  },
});

export default Home;