import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Dimensions, BackHandler, TouchableOpacity, SafeAreaView, StatusBar, Platform, ActivityIndicator, Text, DeviceEventEmitter, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Axios from 'axios';
import Toast from 'react-native-root-toast';
import Loader from '../../Components/Common/Loader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HEIGHT, WIDTH } from '../../Utils/constants';



function Player() {
  const navigation = useNavigation()
  const route = useRoute()
  let playerref = useRef(null)
  const [showVideo, setshowVideo] = useState(true);
  const [videoUrl, setvideoUrl] = useState("");
  const [loader, setloader] = useState(false);



  useEffect(() => {
    const url = route.params.url;
    setvideoUrl(url),
    setshowVideo(true)
  }, [route])

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity style={{ paddingLeft: 15 }} onPress={() => {
        navigation.goBack()
      }}>
        <Image source={require("../../Assets/Auths/arrow.png")} style={{ width: 15, height: 20 }} />
      </TouchableOpacity>
    ),
  });


  const handleBackButtonClick = () => {
    // console.log("back");
    navigation.goBack();
  }

  const onBuffer = (bufferObj) => {
    // console.log('buffering', bufferObj.isBuffering);
  }

  const videoError = (error) => {
    // console.log('video error:', error);
  }




  const renderVideo = () => {
    if (showVideo) {
      return (
        <>
          <VideoPlayer
            ref={ref => {
              playerref = ref;
            }}
            audioOnly={route.params.type == "video" ? false : true}
            source={{ uri: route.params.url }}
            navigator={navigation}
            fullscreen={false}
            Volume
            disableBack
            showOnStart={true}
            poster={'https://nodeserver.mydevfactory.com:1449/uploads/dummy/audio_background.png'}
            posterResizeMode={"cover"}
            onShowControls
            style={{ flex: 1 }}
          />
        </>
      );
    }
  }

  return (
    <>
      <Loader loading={loader} />
      {
        renderVideo()
      }
    </>
  )
}

export default Player;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    marginTop: 20,
    margin: 20,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  castButton: {
    height: 24,
    width: 24,
    marginRight: 10,
    marginTop: 10,
    tintColor: 'white',
    position: 'absolute', top: 40, right: 20
  },
  midiaContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  renderImg: {
    width: 160,
    height: 90,
  },
  textMidia: {
    flex: 1,
    marginLeft: 10,
    alignSelf: 'center',
  },
})