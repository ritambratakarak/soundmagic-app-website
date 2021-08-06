import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Platform, Text, TouchableOpacity} from 'react-native';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Video from 'react-native-video';
import {COLORS, HEIGHT} from '../../../Utils/constants';
import VideoPlayer from 'react-native-video-controls';
import {useFocusEffect, useRoute} from '@react-navigation/core';

const newPlayer = () => {
  const route = useRoute();
  // The video we will play on the player.
  const video = require('../../Assets/demo2.mp4');

  const videoPlayer = useRef(null);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setshowVideo] = useState(true);
  const [videoUrl, setvideoUrl] = useState('');
  const [rate, setrate] = useState(1);
  const [volume, setvolume] = useState(1);
  const [resizeMode, setresizeMode] = useState("");


  useEffect(() => {
    const url = route.params.url;
    setvideoUrl(url), setshowVideo(true);
  }, [route]);

  const onSeek = (seek) => {
    console.log('seek', seek);
    videoPlayer?.current.seek(seek);
  };

  const onSeeking = (currentVideoTime) => {
    console.log('currentVideoTime', currentVideoTime);
    setCurrentTime(currentVideoTime);
  };

  const onPaused = (newState) => {
    setPaused(!paused);
    setPlayerState(newState);
  };

  const onReplay = () => {
    console.log('reply');
    // videoPlayer?.current.seek(0);
    // setCurrentTime(0);
    if (Platform.OS === 'android') {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };

  const onProgress = async (data) => {
    console.log('current time', data.currentTime);
    if (!isLoading) {
      setCurrentTime(data.currentTime);
      await AsyncStorage.setItem(
        'currenttime',
        JSON.stringify(data.currentTime),
      );
    }
  };

  const onLoad = async (data) => {
    console.log('onload data', data);
    const time = await AsyncStorage.getItem('currenttime');
    const currenttime = JSON.parse(time);
    if (currenttime > 0) {
      setCurrentTime(currenttime);
      videoPlayer?.current.seek(currenttime);
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    }
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };

  const renderResizeModeControl = (resize) => {
    const isSelected = (resizeMode === resize);

    return (
      <TouchableOpacity onPress={() => { setresizeMode(resize) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {resize}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderVolumeControl = (vol) => {
    const isSelected = (volume === vol);

    return (
      <TouchableOpacity onPress={() => { setvolume(vol) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {vol * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Video
        volume={volume}
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        posterResizeMode={'cover'}
        onProgress={onProgress}
        paused={paused}
        ref={(ref) => (videoPlayer.current = ref)}
        resizeMode={resizeMode}
        source={{uri: route.params.url}}
        audioOnly={route.params.type == 'video' ? false : true}
        style={styles.backgroundVideo}
      />
      <View style={styles.controls}>
        <View style={styles.generalControls}>
          <View style={styles.volumeControl}>
            {renderVolumeControl(0.5)}
            {renderVolumeControl(1)}
            {renderVolumeControl(1.5)}
          </View>
          <View style={styles.resizeModeControl}>
            {renderResizeModeControl('cover')}
            {renderResizeModeControl('contain')}
            {renderResizeModeControl('stretch')}
          </View>
        </View>
      </View>
      <MediaControls
        isFullScreen={false}
        duration={duration}
        isLoading={isLoading}
        progress={currentTime}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        mainColor={COLORS.PRIMARY}
        playerState={playerState}
        sliderStyle={{containerStyle: {}, thumbStyle: {}, trackStyle: {}}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      },
  backgroundVideo: {
    height: HEIGHT,
    width: '100%',
  },
  mediaControls: {
    height: '100%',
    flex: 1,
    alignSelf: 'center',
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default newPlayer;