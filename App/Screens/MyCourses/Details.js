import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/core';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import CategogyList from '../../Components/Common/CategogyList';
import Button from '../../Components/Common/Button';
import TextContainer from '../../Components/Common/Text';
import {COLORS, FONT, GAP, HEIGHT, WIDTH} from '../../Utils/constants';
import CourseItem from '../../Components/Details/CourseItem';
import CustomerRating from '../../Components/Details/CustomerRating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../Redux/Actions/authAction';
import Toast from 'react-native-root-toast';
import AnimatedLoader from '../../Components/AnimatedLoader';
import Review from '../../Components/Review';
import ProgressiveImage from '../../Components/Common/PrograssiveImage';

function MycourseDetails() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const input = useRef(null);
  const [alldata, setalldata] = useState('');
  const [review, setreview] = useState([]);
  const [loadmore, setloadmore] = useState(false);
  const [limit, setlimit] = useState(5);
  const [loading, setLoading] = useState(5);
  const [modal, setModal] = useState(false);
  const [reviewinput, setreviewinput] = useState('');
  const [star, setstar] = useState(0);

  let stopFetchMore = true;

  useEffect(() => {
    console.log('details', route.params.item);
    setalldata(route.params.item);
    const coursedata = route.params.item;
    const couseid = coursedata.courseID;
    getReviews(couseid);
  }, [route]);

  const getReviews = async (id) => {
    // setLoading(true)
    const userdata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(userdata);
    const authtoken = data.authtoken;
    Network(
      `/get-course-review-list?page=${1}&limit=${limit}&courseID=${
        id == undefined ? alldata.courseID : id
      }`,
      'get',
      {authtoken},
    )
      .then(async (res) => {
        // setLoading(false)
        if (res.response_code === 200) {
          console.log('review data', res.response_data.docs);
          setreview(res.response_data.docs);
          // setcousesdata(res.response_data.docs)
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
        // setLoading(false)
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

  const _loadMoreData = () => {
    setloadmore(true);
    if (!stopFetchMore) {
      console.log('call load more');
      setlimit(limit + 5);
      getReviews();
      stopFetchMore = true;
    }
  };

  const ReviewNow = async () => {
    if (star == 0) {
      alert('Rating is empty!');
    } else if (reviewinput == '') {
      alert('Review is empty');
    } else {
      const userdata = await AsyncStorage.getItem('@user');
      const data = JSON.parse(userdata);
      const authtoken = data.authtoken;
      setLoading(true);
      const submitData = {
        courseID: alldata.courseDetails._id,
        rating: star,
        review: reviewinput,
        authtoken,
      };
      Network('/add-course-review', 'post', submitData)
        .then(async (res) => {
          console.log(res);
          setLoading(false);
          if (res.response_code === 200) {
            getCoursesDetails();
            getReviews();
            setModal(false);
            setreviewinput('');
            setstar(0);
            Toast.show(res.response_message);
          } else {
            setreviewinput('');
            setstar(0);
            setModal(false);
            Toast.show(res.response_message);
          }
        })
        .catch((error) => {
          setLoading(false);
          const Error = error.response.data;
          Toast.show(Error.response_message);
        });
    }
  };

  const getCoursesDetails = async () => {
    setLoading(true);
    const userdata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(userdata);
    const authtoken = data.authtoken;
    const id = alldata._id;
    Network(
      `/get-my-course?page=${1}&limit=${100}&_id=${
        id != undefined ? id : null
      }`,
      'get',
      {
        authtoken,
      },
    )
      .then(async (res) => {
        setLoading(false);
        console.log('courses data', res.response_data);
        if (res.response_code === 200) {
          const data = res.response_data.docs;
          setalldata(data.length != 0 ? res.response_data.docs[0] : '');
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
      });
  };

  return (
    <>
      <ScrollView>
        <AnimatedLoader loading={loading} />
        <Review
          modal={modal}
          close={() => setModal(false)}
          inputRef={input}
          placeholder={'Type Review'}
          onChange={(val) => setreviewinput(val)}
          value={reviewinput}
          ratenow={(val) => setstar(val)}
          lengthtext={reviewinput.length + ' / 2000'}
          submit={() => ReviewNow()}
          modalVisible={() => setModal(!modal)}
        />
        <View style={styles.container}>
          <View style={styles.repeatContainer}>
            <ProgressiveImage
              defaultImageSource={require('../../Assets/defaultimg.png')}
              source={{uri: alldata.courseDetails != undefined
                ? alldata.courseDetails.banner
                : 'https://pinkladies24-7.com/assets/images/defaultimg.png'}}
              style={{width: '100%', height: HEIGHT * 0.26, borderRadius: 10}}
              resizeMode="cover"
            />
            {/* <Image
              source={{
                uri:
                  alldata.courseDetails != undefined
                    ? alldata.courseDetails.banner
                    : '',
              }}
              style={{width: '100%', height: HEIGHT * 0.26, borderRadius: 10}}
              resizeMode={'cover'}
            /> */}
            <View style={{paddingHorizontal: 5, paddingVertical: 15}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Heading
                  color={'#000'}
                  name={
                    alldata.courseDetails != undefined
                      ? alldata.courseDetails.name
                      : ''
                  }
                />
                <Heading color={COLORS.PRIMARY} name={'Purchased'} />
              </View>
              <CategogyList
                categoryname={'Category'}
                name={
                  alldata.categoryDetails != undefined
                    ? alldata.categoryDetails.name
                    : ''
                }
              />
              <CategogyList categoryname={'Tutor'} name={'Admin'} />
              <View
                style={{borderBottomColor: '#E5E5E5', borderBottomWidth: 0.5}}>
                <TextContainer
                  size={FONT.SIZE.SMALL}
                  color={'#797979'}
                  content={alldata.description}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: HEIGHT * 0.02,
                }}>
                <Text
                  style={[
                    styles.description,
                    {color: '#909090', fontSize: FONT.SIZE.SMALL},
                  ]}>
                  Related documents &amp; Videos audios :
                </Text>
                <Text
                  style={[styles.description, {color: COLORS.PRIMARY}]}
                  onPress={() =>
                    navigation.navigate('AllCourses', {item: alldata.tutorials})
                  }>
                  {'View all'}
                </Text>
              </View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                data={alldata.tutorials}
                renderItem={({item}) => (
                  <CourseItem
                    heading={item.name}
                    image={
                      item.type == 'video'
                        ? item.videoThumbnail
                        : 'https://image.shutterstock.com/mosaic_250/4082746/408292723/stock-vector-white-play-button-vector-icon-gray-background-408292723.jpg'
                    }
                    textsize={FONT.SIZE.SMALL}
                    textcolor={'#909090'}
                    text={item.type + ' | ' + format(item.duration)}
                    categoryname={'Admin'}
                    onPress={() =>
                      navigation.navigate('Player', {
                        url:
                          item.type == 'video' ? item.videoURL : item.audioURL,
                        type: item.type,
                      })
                    }
                    showfavorite={false}
                  />
                )}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={
                  <Text
                    style={{
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: FONT.SIZE.MEDIUM,
                      fontFamily: FONT.FAMILY.MEDIUM,
                    }}>
                    No data found!
                  </Text>
                }
                initialNumToRender={2}
              />
              <View
                style={{
                  alignSelf: 'center',
                  width: '100%',
                  alignItems: 'center',
                  marginVertical: GAP.MEDIUM,
                }}>
                {alldata.isReviewed == false && (
                  <Button
                    onPress={() => setModal(true)}
                    gradient={true}
                    title="Rate now"
                  />
                )}
              </View>
              <CustomerRating
                main={'Rating & Reviews :'}
                data={review}
                loadmore={loadmore}
                endreached={_loadMoreData}
                // throttle={200}
                scrollbegin={() => {
                  stopFetchMore = false;
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default MycourseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: '#fff',
  },
  repeatContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: HEIGHT * 0.02,
  },
  courses: {
    color: COLORS.PRIMARY,
    fontSize: FONT.SIZE.LARGE,
    fontFamily: FONT.FAMILY.MEDIUM,
    marginBottom: GAP.MEDIUM,
  },
  description: {
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.SMALL,
    marginBottom: GAP.MEDIUM,
    color: '#797979',
    paddingBottom: 10,
  },
});
