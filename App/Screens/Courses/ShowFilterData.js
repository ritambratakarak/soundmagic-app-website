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

  useEffect(() => {
    setcategory(route.params.category);
    setduration(route.params.duration);
    setrating(route.params.rating);
    console.log(
      route.params.category,
      route.params.duration,
      route.params.rating,
    );
  }, [route]);

  useFocusEffect(
    useCallback(() => {
      textfocus.current.focus();
      // getCourses()
    }, []),
  );

  const getNameCourses = async (name) => {
    setLoading(true);
    const alldata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    Network(
      '/get-course?name=' + `${name}` + '&page=' + `${1}` + '&limit=' + `${20}`,
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
          setcategory(category);
          setduration(duration);
          setrating(rating);
          setModal(false)
        }}
      />
      <View style={styles.repeatContainer}>
        <Search
          reffocus={textfocus}
          onChange={(text) => {
            setsearch(text), getNameCourses(text);
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
                  rateingvalue={4}
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
