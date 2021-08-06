import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {COLORS, HEIGHT, FONT, GAP, WIDTH} from '../../Utils/constants';
import CategogyList from '../Common/CategogyList';
import Heading from '../Common/Heading';
import ProgressiveImage from '../Common/PrograssiveImage';
import Favorite from '../Favorite';
import RatingComponent from '../Rating/Rating';


export default Courses = ({
  image,
  heading,
  categoryname,
  tutorname,
  qty,
  rateingvalue,
  rating,
  ratingcolor,
  price,
  ratingdisable,
  onPress,
  showrating,
  showfavorite,
  Pressfavorite,
  favorite,
  suitble,
  activity,
  origin,
  benefit,
  hastag,
  fortrackComponent,
  category,
  tutor
}) => {
  return (
    <>
      <Ripple
        rippleDuration={1000}
        rippleOpacity={0.3}
        rippleColor={'#fff'}
        rippleSize={'100%'}
        style={{
          width: '100%',
          overflow: 'hidden',
          borderRadius: 8,
          backgroundColor: '#ECECEC',
          marginBottom: HEIGHT * 0.02,
        }}
        onPress={onPress}>
        <ProgressiveImage
          defaultImageSource={require('../../Assets/defaultimg.png')}
          source={{
            uri: image,
          }}
          style={{width: '100%', height: HEIGHT * 0.22}}
          resizeMode="cover"
        />
        {/* <Image
        source={{uri: image}}
        style={{width: '100%', height: HEIGHT * 0.22}}
        resizeMode={'cover'}
      /> */}
        <View style={{padding: 15}}>
          <Heading color={'#000'} name={heading} />
          <CategogyList categoryname={category} name={categoryname} />
          <CategogyList categoryname={tutor} name={tutorname} />
          <Text
            style={{
              fontSize: FONT.SIZE.SMALL,
              fontFamily: FONT.FAMILY.REGULAR,
              color: '#909090',
            }}>
            {qty}
          </Text>
          {fortrackComponent &&
            <>
              <CategogyList categoryname={'Suitable for'} name={suitble} />
              <CategogyList categoryname={'Activity'} name={activity} />
              <CategogyList categoryname={'Origins/influences'} name={origin} />
              <CategogyList categoryname={'Benefits'} name={benefit} />
              <CategogyList categoryname={'Hashtags'} name={hastag} />
            </>
          }
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {showrating && (
              <RatingComponent
                value={rateingvalue}
                rate={rating}
                backgroundColor={ratingcolor}
                disable={ratingdisable}
                imageSize={18}
              />
            )}
            {
              fortrackComponent &&
              <Heading color={COLORS.PRIMARY} name={price} />
            }
          </View>
        </View>
      </Ripple>
      {showfavorite && (
        <View
          style={{
            position: 'absolute',
            top: HEIGHT * 0.23,
            right: WIDTH * 0.03,
          }}>
          <Favorite AddFav={Pressfavorite} fav={favorite} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  InputContainer: {
    width: '85%',
    height: HEIGHT * 0.06,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#edeffc',
    position: 'relative',
  },
  textInput: {
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.PRIMARY,
    // backgroundColor: 'red',
    padding: HEIGHT * 0.015,
    width: WIDTH * 0.68,
    textAlign: 'left',
    fontFamily: FONT.FAMILY.ROMAN,
    alignSelf: 'flex-start',
  },
  // repeatContainer: {
  //   width: "90%",
  //   alignSelf: "center",
  // },
});
