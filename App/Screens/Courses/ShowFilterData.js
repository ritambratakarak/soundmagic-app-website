import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/core';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-root-toast';
import AnimatedLoader from '../../Components/AnimatedLoader';
import CategogyList from '../../Components/Common/CategogyList';
import CoursesItem from '../../Components/Courses/Courses';
import Filter from '../../Components/SearchComponent/Filter';
import Filterloader from '../../Components/SearchComponent/Filterloader';
import Search from '../../Components/SearchComponent/Search';
import {COLORS, FONT, GAP, HEIGHT, WIDTH} from '../../Utils/constants';



function ShowFilterData() {
  const textfocus = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const [search, setsearch] = useState('');
  const [modal, setModal] = useState(false);
  const [cousesdata, setcousesdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setcategory] = useState(null);
  const [duration, setduration] = useState([]);
  const [rating, setrating] = useState(null);

  useEffect(() => {
    textfocus.current.focus();
  }, []);

  var arr = ""

  useEffect(() => {
    const router = route.params;
    const categorydata = router;
    if(categorydata != undefined){
      setcategory(route.params?.category)
      setduration(route.params?.duration)
      setrating(route.params?.rating);
      getCourses(route.params?.category, route.params?.duration, route.params?.rating)
    }
  }, [route]);


  useFocusEffect(
    useCallback(() => {
      textfocus.current.focus();
      // getCourses()
    }, []),
  );
  
  const durationfilter = (duration) => {
    for (var i = 0; i < duration.length; i++) {
       arr += "&durationFilter="+ duration[i]
    }
    return arr
  }

  const getCourses = async (category, duration, rating, name) => {
    // console.log("category, duration, rating", category, duration, rating);
    setLoading(true)
    const alldata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    let url = ""
    if(name != undefined){
      url = `/get-course?page=${1}&limit=${20}&name=${name}`
    }
    else if(category != null && duration.length == 0 && rating == null){
      url = `/get-course?categoryID=${category}&page=${1}&limit=${20}` // only category
    }
    else if(category == null && duration.length != 0 && rating == null){
      url = `/get-course?page=${1}&limit=${20}${durationfilter(duration)}` // only duration
    }
    else if(category == null && duration.length == 0 && rating != null){
      url = `/get-course?page=${1}&limit=${20}&ratingFilter=${rating}` // only rating
    }
    else if(category != null && duration.length != 0 && rating == null){
      url = `/get-course?categoryID=${category}&page=${1}&limit=${20}${durationfilter(duration)}` // category and duration
    }
    else if(category != null && duration.length == 0 && rating != null){
      url = `/get-course?categoryID=${category}&page=${1}&limit=${20}&ratingFilter=${rating}` // category and rating
    }
    else if(category == null && duration.length != 0 && rating != null){
      url = `/get-course?page=${1}&limit=${20}&ratingFilter=${rating}${durationfilter(duration)}` // duration and rating
    }
    else if(category != null && duration.length != 0 && rating != null){
      url = `/get-course?categoryID=${category}&page=${1}&limit=${20}&ratingFilter=${rating}${durationfilter(duration)}` // all type here
    }
    // console.log(url);
    Network(
      url,
      'get',
      {authtoken},
    )
      .then(async (res) => {
        setLoading(false);
        if (res.response_code === 200) {
          console.log('courses data', res.response_data.docs);
          setcousesdata(res.response_data.docs);

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
    <View style={styles.container}>
      <Filter
        modal={modal}
        close={() => setModal(!modal)}
        applypress={(category, duration, rating) => {
          // console.log("category, duration, rating", category, duration, rating);
          setcategory(category);
          setduration(duration);
          setrating(rating);
          setModal(false)
          getCourses(category, duration, rating)
          // durationfilter(duration)
        }}
      />
      <View style={styles.repeatContainer}>
        <Search
          reffocus={textfocus}
          onChange={(text) => {
            setsearch(text), getCourses(category, duration, rating, text);
          }}
          value={search}
          onPress={() => setModal(true)}
          onFocus={true}
        />
        {loading ? (
          <Filterloader />
        ) : (
          <View style={{marginVertical: GAP.MEDIUM}}>
            <Text style={styles.courses}>Filter Couses</Text>
            <FlatList
              style={{marginBottom: HEIGHT * 0.18}}
              showsVerticalScrollIndicator={false}
              horizontal={false}
              data={cousesdata}
              renderItem={({item}) => (
                <CoursesItem
                  image={item.banner}
                  heading={item.name}
                  categoryname={item.categoryDetails.name}
                  tutorname={'Admin'}
                  qty={
                    item.totalAudio +
                    ' Audio' +
                    ' & ' +
                    item.totalVideo +
                    ' Video'
                  }
                  rateingvalue={item.avgRating}
                  rating={() => console.log('')}
                  ratingcolor={'#ECECEC'}
                  price={'$' + item.price}
                  ratingdisable={true}
                  onPress={() => navigation.navigate('Details', {item: item})}
                />
              )}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text
                    style={{
                      alignItems: 'center',
                      textAlign: 'center',
                      fontSize: FONT.SIZE.MEDIUM,
                      fontFamily: FONT.FAMILY.MEDIUM,
                    }}>
                    No data found!
                  </Text>
                </View>
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default ShowFilterData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: HEIGHT,
    width: WIDTH,
    backgroundColor: '#fff',
  },
  repeatContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: HEIGHT * 0.04,
  },
  courses: {
    color: COLORS.PRIMARY,
    fontSize: FONT.SIZE.LARGE,
    fontFamily: FONT.FAMILY.MEDIUM,
    marginBottom: GAP.MEDIUM,
  },
});
