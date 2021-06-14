import React, {useState, useEffect} from 'react';
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
  BackHandler
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import {FullscreenClose, FullscreenOpen} from '../../Assets/icons';
import {ProgressBar, PlayerControls} from '../../Components/Video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/core';
import Toast from 'react-native-root-toast';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/Actions/authAction';
import { COLORS, FONT, HEIGHT, WIDTH } from '../../Utils/constants';


const Player = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const videoRef = React.createRef();
  const [state, setState] = useState({
    fullscreen: false,
    play: false,
    currentTime: 0,
    duration: 0,
    showControls: true,
  });
  const [videoUrl, setvideoUrl] = useState('');
  const [trackId, settrackId] = useState('');

  useEffect(() => {
    const url = route.params.url;
    setvideoUrl(url)
    settrackId(route.params.trackID)
  }, [route]);

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);
    // BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick());
    navigation.setOptions({
    headerShown: true,
    headerStyle: { height: Platform.OS == "ios" ? HEIGHT * 0.12 : 60, backgroundColor: "#f4f4f4" },
    headerTitle: (props) => (<Text style={{ fontSize: FONT.SIZE.EXTRALARGE, fontFamily: FONT.FAMILY.SEMI_BOLD }}>Player</Text>),
    headerLeft: (props) => (
      <TouchableOpacity onPress={() => {SaveTrack()}}>
        <Image source={require('../../Assets/Auths/arrow.png')} resizeMode="contain" style={{ width: 12, HEIGHT: 18, marginLeft: WIDTH * 0.06 }} />
      </TouchableOpacity>
    ),
  })
    return () => {
      Orientation.removeOrientationListener(handleOrientation);
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick());
    };
  }, []);
  
  const handleBackButtonClick = () => {
    SaveTrack()
  }

  const getPlayer = async (playerdata) => {
    console.log("trackid", route?.params?.trackID);
    console.log("trackid", trackId);
    const alldata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(alldata);
    const authtoken = data.authtoken;
    console.log(authtoken);
    Network(`/get-track-play?trackID=${route?.params?.trackID}`, 'get', {
      authtoken,
    })
      .then(async (res) => {
        console.log('track data', res);
        if (res.response_code === 200) {
          if(res.response_data != null){
              videoRef?.current.seek(res.response_data.time);
              setState((s) => ({
                ...s,
                duration: playerdata.duration,
                currentTime: res.response_data.time,
                play: false,
                showControls: true
              }));
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
      });
  };

  const SaveTrack = async () => {
    const userdata = await AsyncStorage.getItem('@user');
    const data = JSON.parse(userdata);
    const authtoken = data.authtoken;
    const submitData = {
      trackID: route.params.trackID,
      time: state.currentTime,
      authtoken,
    };
    Network('/save-track-play', 'post', submitData)
      .then(async (res) => {
        console.log(res);
        if (res.response_code === 200) {
          navigation.goBack()
          Toast.show(res.response_message);
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

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={showControls}>
        <View>
          <Video
            ref={videoRef}
            source={{
              uri: videoUrl
            }}
            style={state.fullscreen ? styles.fullscreenVideo : styles.video}
            controls={false}
            resizeMode={'contain'}
            onLoad={onLoadEnd}
            onProgress={onProgress}
            onEnd={onEnd}
            paused={!state.play}
          />
          {state.showControls && (
            <View style={styles.controlOverlay}>
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
              <PlayerControls
                onPlay={handlePlayPause}
                onPause={handlePlayPause}
                playing={state.play}
                showPreviousAndNext={true}
                showSkip={true}
                skipBackwards={skipBackward}
                skipForwards={skipForward}
              />
              <ProgressBar
                currentTime={state.currentTime}
                duration={state.duration > 0 ? state.duration : 0}
                onSlideStart={handlePlayPause}
                onSlideComplete={handlePlayPause}
                onSlideCapture={onSeek}
              />
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
    state.fullscreen
      ? Orientation.unlockAllOrientations()
      : Orientation.lockToLandscapeLeft();
  }

  function handlePlayPause() {
    // If playing, pause and show controls immediately.
    if (state.play) {
      setState({...state, play: false, showControls: true});
      return;
    }
    SaveTrack()
    setState({...state, play: true});
    setTimeout(() => setState((s) => ({...s, showControls: false})), 2000);
    
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
    const time = await AsyncStorage.getItem('currenttime');
    const currenttime = JSON.parse(time);
    getPlayer(data)
  }

  async function onProgress(data) {
    console.log("current time", data.currentTime);
    await AsyncStorage.setItem(
      'currenttime',
      JSON.stringify(data.currentTime),
    );
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  video: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
  },
  fullscreenVideo: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
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

export default Player;