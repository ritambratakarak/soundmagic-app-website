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
import TextContainer from '../../Components/Common/Text';
import {COLORS, FONT, GAP, HEIGHT, WIDTH} from '../../Utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../Redux/Actions/authAction';
import Toast from 'react-native-root-toast';
import AnimatedLoader from '../../Components/AnimatedLoader';
import ProgressiveImage from '../../Components/Common/PrograssiveImage';
import Favorite from '../../Components/Favorite';
import Button from '../../Components/Common/Button';

function TrackDetails() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const input = useRef(null);
  const [alldata, setalldata] = useState('');
  const [review, setreview] = useState([]);
  const [loadmore, setloadmore] = useState(false);
  const [limit, setlimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [reviewinput, setreviewinput] = useState('');
  const [star, setstar] = useState(0);

  let stopFetchMore = true;

  useEffect(() => {
    const router = route.params;
    const categorydata = router;
    if (categorydata != undefined) {
      // input.current.focus()
      console.log('details', route?.params?.item);
      setalldata(route?.params?.item);
      const coursedata = route?.params?.item;
      const couseid = coursedata?._id;
    }
  }, [route]);

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
      <ScrollView>
        <AnimatedLoader loading={loading} />
        <View style={styles.container}>
          <View style={styles.repeatContainer}>
            <ProgressiveImage
              defaultImageSource={require('../../Assets/defaultimg.png')}
              source={{uri: alldata.audioThumbnail}}
              style={{width: '100%', height: HEIGHT * 0.26, borderRadius: 10}}
              resizeMode="cover"
            />
            <View style={{paddingHorizontal: 5, paddingVertical: 15}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Heading color={'#000'} name={alldata.name} />
              </View>
              <CategogyList
                categoryname={'Activity'}
                name={alldata.activity != undefined ? alldata.activity : ''}
              />
              <CategogyList
                categoryname={'Origin'}
                name={alldata.origin != undefined ? alldata.origin : ''}
              />
              <CategogyList
                categoryname={'Suitable'}
                name={alldata.suitable != undefined ? alldata.suitable : ''}
              />
              <CategogyList
                categoryname={'instructor'}
                name={alldata.instructor}
              />
              <View>
                <Text
                  style={{
                    fontSize: FONT.SIZE.SMALL,
                    fontFamily: FONT.FAMILY.REGULAR,
                    color: '#909090',
                  }}>
                  Benefit :{' '}
                  {alldata.benefit != undefined &&
                    alldata.benefit.map((data, i) => {
                      return (
                        <Text style={{color: '#000'}} key={i}>
                          {data + ', '}
                        </Text>
                      );
                    })}{' '}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: FONT.SIZE.SMALL,
                    fontFamily: FONT.FAMILY.REGULAR,
                    color: '#909090',
                  }}>
                  Hastag :{' '}
                  {alldata.hashtag != undefined &&
                    alldata.hashtag.map((data, i) => {
                      return (
                        <Text style={{color: '#000'}} key={i}>
                          {data + ', '}
                        </Text>
                      );
                    })}{' '}
                </Text>
              </View>
              <View
                style={{borderBottomColor: '#E5E5E5', borderBottomWidth: 0.5}}>
                <TextContainer
                  size={FONT.SIZE.SMALL}
                  color={'#797979'}
                  content={alldata.description}
                />
              </View>
            </View>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Button
                title={'Play'}
                onPress={() =>
                  navigation.navigate('TrackPlayer', {
                    url:
                      alldata.type == 'video'
                        ? alldata.videoURL
                        : alldata.audioURL,
                    type: alldata.type,
                    trackID: alldata._id,
                    name: alldata.name,
                    image: alldata.audioThumbnail
                  })
                }
                gradient={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default TrackDetails;

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
