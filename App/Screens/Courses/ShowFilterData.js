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
  ScrollView,
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
  const [rating, setrating] = useState([]);

  useEffect(() => {
    textfocus.current.focus();
  }, []);

  var arr = ""
  var arr2 = ""

  useEffect(() => {
    const router = route.params;
    const categorydata = router;
    if(categorydata != undefined){
      console.log("categorydata", categorydata);
      setcategory(route.params?.activity)
      setduration(route.params?.benefit)
      setrating(route.params?.hastag);
      // hastagfilter(route.params?.hastag)
      getCourses(route.params?.activity, route.params?.benefit, route.params?.hastag)
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
       arr += "&benefit="+ duration[i].item
    }
    console.log("arr", arr);
    return arr
  }

  const hastagfilter = (hashtag) => {
    for (var i = 0; i < hashtag.length; i++) {
       arr2 += "&hashtag="+ hashtag[i].item
    }
    console.log("arr2", arr2);
    return arr2
  }

  const getCourses = async (activity, benefit, hastag, name) => {
    // console.log("category, duration, rating", category, duration, rating);
    setLoading(true)
    const alldata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    let url = ""
    if(name != undefined){
      url = `/get-track-list?page=${1}&limit=${20}&name=${name}`
    }
    else if(activity != null && benefit.length == 0 && hastag.length == 0){
      url = `/get-track-list?activity=${activity}&page=${1}&limit=${20}` // only category
    }
    else if(activity == null && benefit.length != 0 && hastag.length == 0){
      url = `/get-track-list?page=${1}&limit=${20}${durationfilter(benefit)}` // only duration
    }
    else if(activity == null && benefit.length == 0 && hastag.length != 0){
      url = `/get-track-list?page=${1}&limit=${20}${hastagfilter(hastag)}` // only rating
    }
    else if(activity != null && benefit.length != 0 && hastag.length == 0){
      url = `/get-track-list?activity=${activity}&page=${1}&limit=${20}${durationfilter(benefit)}` // category and duration
    }
    else if(activity != null && benefit.length == 0 && hastag.length != 0){
      url = `/get-track-list?activity=${activity}&page=${1}&limit=${20}${hastagfilter(hastag)}` // category and rating
    }
    else if(activity == null && benefit.length != 0 && hastag.length != 0){
      url = `/get-track-list?page=${1}&limit=${20}${hastagfilter(hastag)}${durationfilter(benefit)}` // duration and rating
    }
    else if(activity != null && benefit.length != 0 && hastag.length != 0){
      url = `/get-track-list?activity=${activity}&page=${1}&limit=${20}${hastagfilter(hastag)}${durationfilter(benefit)}` // all type here
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
          console.log('Track data', res.response_data.docs);
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
          placeholder={"Search for Tracks"}
          inputwidth={"85%"}
          showfilter={true}
        />
        {loading ? (
          <Filterloader />
        ) : (
          <View style={{marginVertical: GAP.MEDIUM}}>
            <View style={{flexDirection:"row",}}>
              <ScrollView horizontal={true} style={{marginBottom:20, width:"80%"}} showsHorizontalScrollIndicator={false}>
                {category != null &&
                  <View style={{flexDirection:"row", marginRight:5}}>
                    <Text style={{fontWeight:"bold"}}>Activity: </Text>
                    <View style={{borderColor:COLORS.PRIMARY, borderWidth:1, borderRadius:HEIGHT/2, paddingHorizontal:10,}}>
                      <Text style={{color:COLORS.BLACK}}>{category}</Text>
                    </View>
                  </View>}
                  {duration.length != 0 &&
                    <View style={{flexDirection:"row", marginRight:5}}>
                    <Text style={{fontWeight:"bold"}}>Benefit: </Text>
                    {duration.map((data, i)=>{
                      return(
                        <View style={{borderColor:COLORS.PRIMARY, borderWidth:0.5, borderRadius:HEIGHT/2, paddingHorizontal:10, marginRight:2}} key={i}>
                          <Text style={{color:COLORS.BLACK, }}>{data.item}</Text>
                        </View>
                      )})}
                  </View>}
                  {rating.length != 0 &&
                    <View style={{flexDirection:"row", marginRight:5}}>
                    <Text style={{fontWeight:"bold"}}>Hastag: </Text>
                    {rating.map((data, i)=>{
                      return(
                        <View style={{borderColor:COLORS.PRIMARY, borderWidth:0.5, borderRadius:HEIGHT/2, paddingHorizontal:10, marginRight:2}} key={i}>
                          <Text style={{color:COLORS.BLACK}}>{data.item}</Text>
                        </View>
                      )})}
                  </View>}
              </ScrollView>
              { category != null || rating.length != 0 || duration.length != 0 ?
                <Text style={{color:COLORS.PRIMARY, fontWeight:"bold", marginLeft:10}} onPress={()=> {setcategory(null), setcousesdata([]), setduration([]), setrating([])}}>Reset</Text>
                : null}
            </View>
            

            <FlatList
              style={{marginBottom: HEIGHT * 0.18}}
              showsVerticalScrollIndicator={false}
              horizontal={false}
              data={cousesdata}
              renderItem={({item}) => (
                <CoursesItem
                  category={"Activity"}
                  tutor={"Instractor"}
                  image={item.audioThumbnail}
                  heading={item.name}
                  categoryname={item.activity}
                  tutorname={'Admin'}
                  qty={
                    item.type
                  }
                  showrating={false}
                  price={'$' + item.price}
                  ratingdisable={true}
                  onPress={() => navigation.navigate('TrackDetails', {item: item})}
                />
              )}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={
                <View style={{alignItems: 'center', justifyContent: 'center', marginTop:HEIGHT * 0.30}}>
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
