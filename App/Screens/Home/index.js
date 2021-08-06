import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  RefreshControl,
} from 'react-native';
import {HEIGHT, GAP, COLORS, WIDTH, FONT} from '../../Utils/constants';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {logoutUser} from '../../Redux/Actions/authAction';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeightTab from '../../Components/Common/WeightTab';
import HomeList from '../../Components/Home/VideoList';
import AnimatedLoader from '../../Components/AnimatedLoader';
import Search from '../../Components/SearchComponent/Search';
import ImageView from '../../Components/Home/ImageView';
import Category from '../../Components/Home/Category';
import Filter from '../../Components/SearchComponent/Filter';
import Toast from 'react-native-root-toast';
import {category} from '../../Redux/Actions/Categoryaction';
import Homeloader from '../../Components/Home/Homeloader';
import RecentPlayedView from '../../Components/Home/RecentPlayedView';

const Home = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [search, setsearch] = useState('');
  const [secondtab, setsecondtab] = useState('0');
  const [userMe, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [modal, setModal] = React.useState(false);
  const [categorydata, setcategorydata] = React.useState([]);
  const [cousesdata, setcousesdata] = React.useState([]);
  const [allcousesdata, setallcousesdata] = React.useState([]);
  const [trackdata, settrackdata] = React.useState([]);
  const [categoryloader, setcategoryloader] = React.useState(false);
  const [refreash, setrefreash] = React.useState(false);
  const [playedcourse, setplayedcourse] = React.useState(false);

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    const alldata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(alldata);
    setUser(data);
    getCategory(data);
    getAllCourses();
    getRecentPlayedCourse();
    getTrack();
  };

  const changesecondTab = (tab, id) => {
    categorydata.map((data, i) => {
      if (i == tab) {
        console.log('tab', tab, id);
        setsecondtab(tab);
        getCourses(id);
      }
    });
  };

  const getCategory = (data) => {
    setLoading(true);
    Network('/get-course-category', 'get', {authtoken: data.authtoken})
      .then(async (res) => {
        setLoading(false);
        setrefreash(false);
        if (res.response_code === 200) {
          console.log('category data', res.response_data);
          setcategorydata(res.response_data);
          dispatch(category(res.response_data));
          if (res.response_data.length != 0) {
            console.log('courses default id', res.response_data[0]._id);
            getCourses(res.response_data[0]._id);
          }
        } else if (res.response_code === 4000) {
          Toast.show(res.response_message);
          await AsyncStorage.removeItem('@user');
          dispatch(logoutUser());
        } else {
          Toast.show(res.response_message);
        }
      })
      .catch((error) => {
        Toast.show(error);
        setLoading(false);
        setrefreash(false);
      });
  };

  const getCourses = async (id) => {
    setLoading(true);
    const alldata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    Network(`/get-course?page=${1}&limit=${100}&categoryID=${id}`, 'get', {
      authtoken,
    })
      .then(async (res) => {
        setLoading(false);
        setrefreash(false);
        if (res.response_code === 200) {
          console.log('courses data', res.response_data.docs);
          setcousesdata(res.response_data.docs);
        } else if (res.response_code === 4000) {
          Toast.show(res.response_message);
          await AsyncStorage.removeItem('@user');
          dispatch(logoutUser());
        } else {
          Toast.show(res.response_message);
        }
      })
      .catch((error) => {
        Toast.show(error);
        setLoading(false);
        setrefreash(false);
      });
  };

  const getAllCourses = async () => {
    setLoading(true);
    const alldata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    Network(`/get-course?page=${1}&limit=${100}`, 'get', {authtoken})
      .then(async (res) => {
        setLoading(false);
        setrefreash(false);
        if (res.response_code === 200) {
          console.log('courses data', res.response_data.docs);
          setallcousesdata(res.response_data.docs);
        } else if (res.response_code === 4000) {
          Toast.show(res.response_message);
          await AsyncStorage.removeItem('@user');
          dispatch(logoutUser());
        } else {
          Toast.show(res.response_message);
        }
      })
      .catch((error) => {
        Toast.show(error);
        setLoading(false);
        setrefreash(false);
      });
  };

  const getRecentPlayedCourse = async () => {
    setLoading(true);
    const alldata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    Network(`/get-user-recent-play?page=${1}&limit=${100}`, 'get', {authtoken})
      .then(async (res) => {
        setLoading(false);
        setrefreash(false);
        if (res.response_code === 200) {
          console.log('Played data', res.response_data.docs);
          setplayedcourse(res.response_data.docs);
          // Toast.show(res.response_message);
        } else if (res.response_code === 4000) {
          Toast.show(res.response_message);
          await AsyncStorage.removeItem('@user');
          dispatch(logoutUser());
        } else {
          Toast.show(res.response_message);
        }
      })
      .catch((error) => {
        Toast.show(error);
        setLoading(false);
        setrefreash(false);
      });
  };

  const gettime = () => {
    var curHr = new Date().getHours();
    if (curHr < 12) {
      return 'Good Morning';
    } else if (curHr < 18) {
      return 'Good Afternoon';
    } else if (curHr > 17 && curHr < 24) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  };

  const onRefresh = React.useCallback(() => {
    setrefreash(true);
    getData();
  }, []);

  const getTrack = async () => {
    setLoading(true);
    const alldata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    Network(`/get-track-list?page=${1}&limit=${100}`, 'get', {authtoken})
      .then(async (res) => {
        setLoading(false);
        setrefreash(false);
        if (res.response_code === 200) {
          console.log('track data', res.response_data.docs);
          settrackdata(res.response_data.docs);
        } else if (res.response_code === 4000) {
          Toast.show(res.response_message);
          await AsyncStorage.removeItem('@user');
          dispatch(logoutUser());
        } else {
          Toast.show(res.response_message);
        }
      })
      .catch((error) => {
        Toast.show(error);
        setLoading(false);
        setrefreash(false);
      });
  };

  function format(time) {
    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;
    let ret = '';
    if (hrs > 0) {
      ret += '' + hrs + ' hours ' + (mins < 10 ? '0' : '');
    }
    ret += '' + mins + ' min ' + (secs < 10 ? '0' : '');
    ret += '' + secs + ' sec ';
    return ret;
  }

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <Homeloader />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreash}
              onRefresh={() => {
                onRefresh();
              }}
            />
          }>
          <Filter
            modal={modal}
            close={() => setModal(!modal)}
            applypress={(category, duration, rating) => {
              navigation.navigate('Filter', {category, duration, rating}),
                setModal(false);
            }}
          />
          <View style={styles.container}>
            <View style={styles.repeatContainer}>
              <View style={{marginVertical: HEIGHT * 0.02}}>
                <Text
                  style={{
                    fontSize: FONT.SIZE.EXTRALARGE,
                    fontFamily: FONT.FAMILY.MEDIUM,
                  }}>
                  {gettime() + ', '}
                  <Text style={{
                      fontFamily: FONT.FAMILY.HEAVY
                    }}>
                    {userMe != null ? userMe.fname : ''}
                  </Text>
                </Text>
              </View>
              <Search
                onChange={(text) => setsearch(text)}
                value={search}
                onPress={() => setModal(true)}
                keypress={() => navigation.navigate('Track')}
                onFocus={false}
                placeholder={"Search for Track"}
                inputwidth={"100%"}
                showfilter={false}
              />
            </View>
            <View style={[styles.repeatContainer, {marginBottom: 0}]}>
              <ScrollView contentContainerStyle={{flexDirection:"row"}} horizontal={true}>
                  <View style={[styles.categorycontainer, {width:WIDTH / 1.1}]}>
                    <Category
                      name={'Breath'}
                      image={require('../../Assets/Home/breath.png')}
                    />
                    <Category
                      name={'Timer'}
                      image={require('../../Assets/Home/timer.png')}
                    />
                    <Category
                      name={'Courses'}
                      image={require('../../Assets/Home/courses.png')}
                    />
                    <Category
                      name={'Talks'}
                      image={require('../../Assets/Home/talks.png')}
                    />
                    <Category
                      name={'Sounds'}
                      image={require('../../Assets/Home/sound.png')}
                    />
                    <Category
                      name={'Sleep'}
                      image={require('../../Assets/Home/sleep.png')}
                    />
                    <Category
                      name={'Children'}
                      image={require('../../Assets/Home/children.png')}
                    />
                    <Category
                      name={'Welness Mamas'}
                      image={require('../../Assets/Home/welness.png')}
                    />
                  </View>
                  <View style={[styles.categorycontainer,{width:WIDTH / 1.8}]}>
                    <Category
                      name={'Guided Meditation'}
                      image={require('../../Assets/Home/meditition.png')}
                    />
                    <Category
                      name={'Movement'}
                      image={require('../../Assets/Home/movement.png')}
                    />
                    <Category
                      name={'Relaxation'}
                      image={require('../../Assets/Home/relaxation.png')}
                    />
                    <Category
                      name={'Work Well'}
                      image={require('../../Assets/Home/work.png')}
                    />
                  </View>
            </ScrollView>
            </View>
            <View style={[styles.repeatContainer]}>
              {/* <WeightTab
                data={categorydata}
                active={secondtab}
                onPress={(tab, id) => changesecondTab(tab, id)}
              />
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={cousesdata}
                renderItem={({item}) => (
                  <>
                    <HomeList
                      name={item.name}
                      img={item.banner}
                      onLoadStart={() => setcategoryloader(true)}
                      onLoadEnd={() => setcategoryloader(false)}
                      author={'Admin'}
                      onPress={() => {
                        navigation.navigate('Details', {item: item});
                      }}
                      price={"$" + item.price}
                    />
                  </>
                )}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: WIDTH,
                    }}>
                    <Text
                      style={{
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: FONT.SIZE.MEDIUM,
                        fontFamily: FONT.FAMILY.MEDIUM,
                      }}>
                      This category have no data!
                    </Text>
                  </View>
                }
              /> */}
              <Text style={{ fontSize: FONT.SIZE.LARGE, fontFamily: FONT.FAMILY.HEAVY, marginVertical: HEIGHT * 0.02 }}>{"Track "}</Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={trackdata}
                renderItem={({item}) => (
                  <>
                    <HomeList
                      name={item.name}
                      img={item.audioThumbnail}
                      onLoadStart={() => setcategoryloader(true)}
                      onLoadEnd={() => setcategoryloader(false)}
                      author={'Admin'}
                      onPress={() => {
                        navigation.navigate('TrackDetails', {item: item});
                      }}
                      price={format(item.duration)}
                    />
                  </>
                )}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: WIDTH,
                    }}>
                    <Text
                      style={{
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: FONT.SIZE.MEDIUM,
                        fontFamily: FONT.FAMILY.MEDIUM,
                      }}>
                      Track have no data!
                    </Text>
                  </View>
                }
              />
            </View>
            <RecentPlayedView
              name={'Recently Played'}
              data={playedcourse}
              initialnumber={15}
              onPress={(item)=> navigation.navigate('TrackPlayer', {
                url:
                  item.trackDetails.type == 'video'
                    ? item.trackDetails.videoURL
                    : item.trackDetails.audioURL,
                type: item.trackDetails.type,
                trackID: item.trackID,
                name: item.trackDetails.name,
                image: item.trackDetails.audioThumbnail
              })}
            />
            {/* <ImageView
              name={'New Addtion'}
              data={allcousesdata}
              initialnumber={10}
              onPress={(item) => navigation.navigate('Details', {item: item})}
            /> */}
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.WHITE,
  },
  repeatContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: HEIGHT * 0.04,
  },
  categorycontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});

export default Home;