import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Platform,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import {FullscreenClose, FullscreenOpen} from '../../Assets/icons';
import {ProgressBar, PlayerControls} from '../../Components/Video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/core';
import Toast from 'react-native-root-toast';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../Redux/Actions/authAction';
import {COLORS, FONT, GAP, HEIGHT, WIDTH} from '../../Utils/constants';
import Feather from 'react-native-vector-icons/Feather';
import AnimatedLoader from '../../Components/AnimatedLoader';
import KeepAwake from 'react-native-keep-awake';

const TrackPlayer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const [state, setState] = useState({
    fullscreen: false,
    play: false,
    currentTime: 0,
    duration: 0,
    showControls: true,
  });
  const [videoUrl, setvideoUrl] = useState('');
  const [trackId, settrackId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [c_time, setc_time] = useState(0);

  useEffect(() => {
    const url = route.params.url;
    setvideoUrl(url);
    settrackId(route.params.trackID);
  }, [route]);

  useEffect(() => {
    // Orientation.addOrientationListener(handleOrientation);
    // BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick());
    KeepAwake.activate();

    return () => {
      KeepAwake.deactivate();
      // Orientation.removeOrientationListener(handleOrientation);
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick(),
      );
    };
  }, []);

  navigation.setOptions({
    headerShown: state.fullscreen ? false : true,
    headerTransparent: true,
    headerStyle: {
      height: Platform.OS == 'ios' ? HEIGHT * 0.12 : 60,
    },
    headerTitle: null,
    headerLeft: (props) => (
      <TouchableOpacity
        onPress={() => {
          SaveTrack();
          navigation.goBack();
        }}>
        <Feather
          name="chevron-left"
          size={30}
          color={'white'}
          style={{marginLeft: WIDTH * 0.04}}
        />
      </TouchableOpacity>
    ),
  });

  const handleBackButtonClick = () => {
    SaveTrack();
  };

  const getPlayer = async (playerdata) => {
    console.log('playerdata', playerdata);
    const alldata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    console.log(authtoken);
    Network(`/get-track-play?trackID=${route?.params?.trackID}`, 'get', {
      authtoken,
    })
      .then(async (res) => {
        setIsLoading(false);
        console.log('track data', res);
        if (res.response_code === 200) {
          if (res.response_data != null) {
            setapiTime(res.response_data, playerdata.duration);
            // setCurrentTime(currenttime);
            // videoPlayer?.current.seek(currenttime);
            // setPlayerState(PLAYER_STATES.PAUSED);
            // setPaused(true);
          } else {
            setState((s) => ({
              ...s,
              duration: playerdata.duration,
              currentTime: playerdata.currentTime,
            }));
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
        setIsLoading(false);
      });
  };

  const SaveTrack = async () => {
    const userdata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(userdata);
    const authtoken = data.authtoken;
    const time = await AsyncStorage.getItem('currenttime');
    const currenttime = JSON.parse(time);
    const submitData = {
      trackID: route.params.trackID,
      time: currenttime,
      authtoken,
    };
    Network('/save-track-play', 'post', submitData)
      .then(async (res) => {
        console.log(res);
        if (res.response_code === 200) {
          //Toast.show(res.response_message);
        } else {
          Toast.show(res.response_message);
        }
      })
      .catch((error) => {
        setLoading(false);
        const Error = error.response.data;
        Toast.show(Error.response_message);
      });
  };

  const onLoadStart = () => setIsLoading(true);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={showControls}>
        <View>
          <Video
            ref={videoRef}
            source={{
              uri: videoUrl,
            }}
            style={state.fullscreen ? styles.video : styles.fullscreenVideo}
            controls={false}
            resizeMode={state.fullscreen ? 'cover' : 'contain'}
            onLoad={onLoadEnd}
            onLoadStart={onLoadStart}
            onProgress={onProgress}
            onEnd={onEnd}
            paused={!state.play}
            fullscreen={state.fullscreen}
            audioOnly={route.params.type == 'video' ? false : true}
            disableFocus={true}
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
            onBuffer={() => setIsLoading(true)}
          />
          {state.showControls && (
            <View style={styles.controlOverlay}>
              {route.params.type == 'audio' && (
                <Image
                  source={{uri: route?.params?.image}}
                  style={{
                    width: WIDTH,
                    height: HEIGHT,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  resizeMode={'cover'}
                />
              )}
              <TouchableOpacity
                onPress={() => handleFullscreen()}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                style={styles.fullscreenButton}>
                {state.fullscreen ? (
                  <MaterialCommunityIcons
                    name="fullscreen-exit"
                    size={25}
                    color={'#fff'}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="fullscreen"
                    size={25}
                    color={'#fff'}
                  />
                )}
              </TouchableOpacity>
              {isLoading ? (
                <View
                  style={{
                    width: WIDTH,
                    height: HEIGHT / 1.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AnimatedLoader loading={isLoading} />
                </View>
              ) : (
                <>
                  <PlayerControls
                    onPlay={handlePlayPause}
                    onPause={handlePlayPause}
                    playing={state.play}
                    showPreviousAndNext={false}
                    showSkip={true}
                    skipBackwards={skipBackward}
                    skipForwards={skipForward}
                  />
                  <Text
                    style={{
                      fontSize: 30,
                      color: COLORS.WHITE,
                      fontFamily: FONT.FAMILY.HEAVY,
                      left: '3%',
                      marginBottom: GAP.SMALL,
                    }}>
                    {route?.params?.name}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.WHITE,
                      left: '3%',
                      fontFamily: FONT.FAMILY.REGULAR,
                      marginBottom: GAP.MEDIUM,
                    }}>
                    Upload By: Admin
                  </Text>
                  <ProgressBar
                    currentTime={state.currentTime}
                    duration={state.duration > 0 ? state.duration : 0}
                    onSlideStart={handlePlayPause}
                    onSlideComplete={handlePlayPause}
                    onSlideCapture={onSeek}
                  />
                </>
              )}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  function handleOrientation(orientation) {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (setState((s) => ({...s, fullscreen: true})), StatusBar.setHidden(true))
      : (setState((s) => ({...s, fullscreen: false})),
        StatusBar.setHidden(false));
  }

  function handleFullscreen() {
    setState((s) => ({...s, fullscreen: !state.fullscreen}));
  }

  function handlePlayPause() {
    // If playing, pause and show controls immediately.
    if (state.play) {
      setState({...state, play: false, showControls: true});
      return;
    }
    // SaveTrack();
    setState({...state, play: true});
    // setTimeout(() => setState((s) => ({...s, showControls: false})), 2000);
  }

  function skipBackward() {
    videoRef.current.seek(state.currentTime - 15);
    setState({...state, currentTime: state.currentTime - 15});
  }

  function skipForward() {
    videoRef.current.seek(state.currentTime + 15);
    setState({...state, currentTime: state.currentTime + 15});
  }

  function onSeek(data) {
    videoRef?.current.seek(data.seekTime);
    setState({...state, currentTime: data.seekTime});
  }

  async function onLoadEnd(data) {
    getPlayer(data);
  }

  async function onProgress(data) {
    console.log('current time', data.currentTime);
    // setc_time(data.currentTime);
    await AsyncStorage.setItem('currenttime', JSON.stringify(data.currentTime));
    setState((s) => ({
      ...s,
      currentTime: data.currentTime,
    }));
  }

  function onEnd() {
    setState({...state, play: false});
    videoRef.current.seek(0);
  }

  function showControls() {
    state.showControls
      ? setState({...state, showControls: false})
      : setState({...state, showControls: true});
  }

  function setapiTime(data, duration) {
    videoRef.current.seek(data.time);
    setState((s) => ({
      ...s,
      duration: duration,
      currentTime: data.time,
      play: false,
      showControls: true,
    }));
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  video: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  fullscreenVideo: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
  fullscreenButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },
});

export default TrackPlayer;
