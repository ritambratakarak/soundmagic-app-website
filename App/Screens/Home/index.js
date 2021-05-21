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


const Home = (props) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [search, setsearch] = useState("");
  const [secondtab, setsecondtab] = useState("0");
  const [userMe, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);

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
  }

  const secondUserData = ["Mind", "Body", "Sprit", "More"];

  const changesecondTab = (tab) => {
    if (tab == 0) {
      setsecondtab("0")
    } else if (tab == 1) {
      setsecondtab("1")
    } else if (tab == 2) {
      setsecondtab("2")
    }
  }

  const Recentdata = [
    {
      _id: 1,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4JDUINyMkunfue2_WCsmqFfdnywUMYmJr0Q&usqp=CAU"
    },
    {
      _id: 2,
      image: "https://grazia.wwmindia.com/content/2020/dec/yoga71607321001.jpg"
    },
    {
      _id: 3,
      image: "https://img.freepik.com/free-photo/sporty-young-woman-doing-yoga-practice-isolated-concept-healthy-life-natural-balance-body-mental-development_231208-10353.jpg?size=626&ext=jpg"
    }
  ]

  const Arrivaldata = [
    {
      _id: 1,
      image: "https://us.123rf.com/450wm/fizkes/fizkes1710/fizkes171000616/87527966-young-attractive-woman-practicing-yoga-stretching-in-natarajasana-exercise-lord-of-the-dance-pose-wo.jpg?ver=6"
    },
    {
      _id: 2,
      image: "https://imgk.timesnownews.com/story/iStock-1076946698.jpg?tr=w-400,h-300,fo-auto"
    },
    {
      _id: 3,
      image: "https://www.adityabirlacapital.com/healthinsurance/active-together/wp-content/uploads/2020/04/Yogi-with-kids.jpg"
    }
  ]

  const Popular = [
    {
      _id: 1,
      name: "Yoga for DOSHA",
      img: "https://mk0doyoucomnn0s0iurt.kinstacdn.com/wp-content/uploads/2021/03/j-u0wzxoxg8-scaled.jpg",
      author: "Alex D Costa",
      price: "29",
      authorimg: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg",
    },
    {
      _id: 2,
      name: "Yoga for DOSHA",
      img: "https://m.timesofindia.com/thumb/msid-69889676/69889676.jpg?resizemode=4&width=400",
      author: "Alex D Costa",
      price: "29",
      authorimg: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg",
    },
    {
      _id: 3,
      name: "Yoga for DOSHA",
      img: "https://st.depositphotos.com/1686706/4692/i/600/depositphotos_46924139-stock-photo-young-asian-woman-practicing-yoga.jpg",
      author: "Alex D Costa",
      price: "29",
      authorimg: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg",
    },
    {
      _id: 4,
      name: "Yoga for DOSHA",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNjnw7uUuIVXqOs2SNig7to8D1La-qYiJ6Ew&usqp=CAU",
      author: "Alex D Costa",
      price: "29",
      authorimg: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg",
    }
  ]

  const Featured = [
    {
      _id: 1,
      name: "Yoga for DOSHA",
      img: "https://st.depositphotos.com/1686706/4692/i/600/depositphotos_46924139-stock-photo-young-asian-woman-practicing-yoga.jpg",
      author: "Alex D Costa",
      price: "29",
      authorimg: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg",
    },
    {
      _id: 2,
      name: "Yoga for DOSHA",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNjnw7uUuIVXqOs2SNig7to8D1La-qYiJ6Ew&usqp=CAU",
      author: "Alex D Costa",
      price: "29",
      authorimg: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg",
    },
    {
      _id: 3,
      name: "Yoga for DOSHA",
      img: "https://mk0doyoucomnn0s0iurt.kinstacdn.com/wp-content/uploads/2021/03/j-u0wzxoxg8-scaled.jpg",
      author: "Alex D Costa",
      price: "29",
      authorimg: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg",
    },
    {
      _id: 4,
      name: "Yoga for DOSHA",
      img: "https://m.timesofindia.com/thumb/msid-69889676/69889676.jpg?resizemode=4&width=400",
      author: "Alex D Costa",
      price: "29",
      authorimg: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg",
    }
  ]

  const Member = [
    {
      _id: 1,
      name: "Yoga for DOSHA",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNjnw7uUuIVXqOs2SNig7to8D1La-qYiJ6Ew&usqp=CAU",
      author: "Alex D Costa",
      price: "29",
      authorimg: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg",
    },
    {
      _id: 2,
      name: "Yoga for DOSHA",
      img: "https://mk0doyoucomnn0s0iurt.kinstacdn.com/wp-content/uploads/2021/03/j-u0wzxoxg8-scaled.jpg",
      author: "Alex D Costa",
      price: "29",
      authorimg: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg",
    },
    {
      _id: 3,
      name: "Yoga for DOSHA",
      img: "https://m.timesofindia.com/thumb/msid-69889676/69889676.jpg?resizemode=4&width=400",
      author: "Alex D Costa",
      price: "29",
      authorimg: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg",
    },
    {
      _id: 4,
      name: "Yoga for DOSHA",
      img: "https://st.depositphotos.com/1686706/4692/i/600/depositphotos_46924139-stock-photo-young-asian-woman-practicing-yoga.jpg",
      author: "Alex D Costa",
      price: "29",
      authorimg: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X.jpg",
    }
  ]


  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Filter
          modal={modal}
          close={()=> setModal(!modal)}
          caregory={()=> console.log("aaa")}
          classduration={()=> console.log("bbb")}
          rating={()=> console.log("ccc")}
        />
        <View style={styles.container}>
          <AnimatedLoader loading={loading} />
          <View style={styles.repeatContainer}>
            <View style={{ marginVertical: HEIGHT * 0.020 }}>
              <Text style={{ fontSize: FONT.SIZE.EXTRALARGE, fontFamily: FONT.FAMILY.MEDIUM }}>Good Morning, <Text style={{ fontFamily: FONT.FAMILY.BOLD }}>{userMe != null ? userMe.fname : ""}</Text></Text>
            </View>
            <Search
              onChange={(text) => setsearch(text)}
              value={search}
              onPress={() => setModal(true)}
            />
          </View>
          <View style={[styles.repeatContainer, {marginBottom: 0}]}>
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
              data={secondUserData}
              active={secondtab}
              onPress={(tab) => changesecondTab(tab)}
            />
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={secondtab == "0" ? Popular : secondtab == "1" ? Member : secondtab == "2" ? Featured : []}
              renderItem={({ item }) => (
                <HomeList
                  name={item.name}
                  img={item.img}
                  author={item.author}
                  onPress={() => {
                    console.log("aa");
                  }}
                  price={item.price}
                  authorimg={item.authorimg}
                />
              )}
              keyExtractor={item => item._id}
              ListEmptyComponent={<Text style={{ alignItems: "center", textAlign: "center" }}>No data Found</Text>}
            />
          </View>
          <ImageView
            name={"Recently Played"}
            data={Recentdata}
          />
          <ImageView
            name={"New Addtion"}
            data={Arrivaldata}
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