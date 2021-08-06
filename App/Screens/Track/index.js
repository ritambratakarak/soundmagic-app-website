import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import Toast from 'react-native-root-toast';
import AnimatedLoader from '../../Components/AnimatedLoader';
import CategogyList from '../../Components/Common/CategogyList';
import CourseItem from '../../Components/Details/CourseItem';
import Filter from '../../Components/SearchComponent/Filter';
import Search from '../../Components/SearchComponent/Search';
import {COLORS, FONT, GAP, HEIGHT, WIDTH} from '../../Utils/constants';
import CoursesItem from '../../Components/Courses/Courses';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../Redux/Actions/authAction';
import {addFavorite, removeFavorite} from '../../Redux/Actions/favoriteaction';
import Filterloader from '../../Components/SearchComponent/Filterloader';

function Track() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoritedata = useSelector((state) => state.favorite);
  const [search, setsearch] = useState('');
  const [modal, setModal] = React.useState(false);
  const [cousesdata, setcousesdata] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refreash, setrefreash] = React.useState(false);

  useEffect(() => {
    getTrack();
  }, []);

  useEffect(() => {
    if (favoritedata != null) {
      if (favoritedata?.favorite != null) {
        getTrack();
        dispatch(addFavorite(null));
      }
    }
  }, [favoritedata]);

  useFocusEffect(
    useCallback(() => {
      getTrack();
    }, []),
  );

  const getTrack = async (name) => {
    setLoading(true);
    const alldata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    let url = '';
    if (name != undefined) {
      url = `/get-track-list?page=${1}&limit=${20}&name=${name}`;
    } else {
      url = `/get-track-list?page=${1}&limit=${20}`;
    }
    Network(url, 'get', {authtoken})
      .then(async (res) => {
        setLoading(false);
        setrefreash(false);
        if (res.response_code === 200) {
          console.log('track data', res.response_data);
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
        setrefreash(false);
      });
  };

  const onRefresh = React.useCallback(() => {
    setrefreash(true);
    getTrack();
  }, []);

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

  const AddFavorite = async (id) => {
    const userdata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(userdata);
    const authtoken = data.authtoken;
    const submitData = {
      trackID: id,
      authtoken,
    };
    setLoading(true);
    dispatch(addFavorite(submitData));
  };

  const RemoveFavorite = async (id) => {
    const userdata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(userdata);
    const authtoken = data.authtoken;
    setLoading(true);
    const submitData = {
      trackID: id,
      authtoken,
    };
    dispatch(removeFavorite(submitData));
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.repeatContainer}>
          <Search
            onChange={(text) => {
              setsearch(text), getTrack(text);
            }}
            value={search}
            // keypress={() => navigation.navigate('Filter')}
            onFocus={false}
            placeholder={'Search for Track'}
            inputwidth={'100%'}
            showfilter={false}
          />
          {loading ? (
            <Filterloader />
          ) : (
            <View style={{marginVertical: GAP.MEDIUM}}>
              <Text style={styles.courses}>All Track</Text>
              <FlatList
                style={{marginBottom: HEIGHT * 0.2}}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                data={cousesdata}
                renderItem={({item}) => (
                  <CoursesItem
                    image={
                      item.type == 'video'
                        ? item.videoThumbnail
                        : item.audioThumbnail
                    }
                    heading={item.name}
                    categoryname={item.name}
                    tutorname={item.instructor}
                    qty={item.type + '  ' + format(item.duration)}
                    onPress={() =>
                      navigation.navigate('TrackDetails', {item: item})
                    }
                    showrating={false}
                    showfavorite={true}
                    fortrackComponent={false}
                    Pressfavorite={() =>
                      item.isFavorite == true
                        ? RemoveFavorite(item._id)
                        : AddFavorite(item._id)
                    }
                    favorite={item.isFavorite}
                  />
                )}
                refreshControl={
                  <RefreshControl
                    //refresh control used for the Pull to Refresh
                    refreshing={refreash}
                    onRefresh={() => {
                      onRefresh();
                    }}
                  />
                }
                keyExtractor={(item) => item._id}
                ListEmptyComponent={
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
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
    </>
  );
}

export default Track;

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
