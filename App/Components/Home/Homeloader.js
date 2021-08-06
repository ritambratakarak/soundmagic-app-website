import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {COLORS, FONT, HEIGHT, WIDTH} from '../../Utils/constants';

const Homeloader = () => {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: '#fff',
          height: HEIGHT,
        }}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width={'90%'}
            alignSelf={'center'}
            height={'100%'}
            >
            <View
              style={{
                width: WIDTH / 1.8,
                height: HEIGHT * 0.06,
                borderRadius: 8,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: HEIGHT * 0.02,
              }}>
              <View
                style={{
                  width: WIDTH / 1.3,
                  height: HEIGHT * 0.06,
                  borderRadius: 8,
                }}
              />
              <View
                style={{width: 50, height: HEIGHT * 0.06, borderRadius: 100}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'space-between',
                marginVertical: HEIGHT * 0.02,
              }}>
              <View style={styles.caregory} />
              <View style={styles.caregory} />
              <View style={styles.caregory} />
              <View style={styles.caregory} />
              <View style={styles.caregory} />
              <View style={styles.caregory} />
              <View style={styles.caregory} />
              <View style={styles.caregory} />
              {/* <View style={styles.caregory} />
              <View style={styles.caregory} />
              <View style={styles.caregory} />
              <View style={styles.caregory} /> */}
            </View>
            <View style={{flexDirection: 'row', marginBottom:HEIGHT * 0.02}}>
              <View style={{width: 100, height: 15, marginRight:10}} />
              {/* <View style={{width: 40, height: 15, marginRight:10}} />
              <View style={{width: 40, height: 15, marginRight:10}} />
              <View style={{width: 40, height: 15, marginRight:10}} />
              <View style={{width: 40, height: 15, marginRight:10}} /> */}
            </View>
            <View style={{flexDirection:"row", marginBottom:HEIGHT * 0.02}}>
              <View style={{width: WIDTH / 2.5, height: HEIGHT * 0.15, marginRight:10, borderRadius:8}} />
              <View style={{width: WIDTH / 2.5, height: HEIGHT * 0.15, marginRight:10, borderRadius:8}} />
              <View style={{width: WIDTH / 2.5, height: HEIGHT * 0.15, marginRight:10, borderRadius:8}} />
            </View>
            <View style={{width: WIDTH / 2.5, height: 15, marginBottom:HEIGHT * 0.02}} />
            <View style={{flexDirection:"row", marginBottom:HEIGHT * 0.02}}>
              <View style={{width: WIDTH / 2.8, height: HEIGHT * 0.15, marginRight:10, borderRadius:8}} />
              <View style={{width: WIDTH / 2.8, height: HEIGHT * 0.15, marginRight:10, borderRadius:8}} />
              <View style={{width: WIDTH / 2.8, height: HEIGHT * 0.15, marginRight:10, borderRadius:8}} />
            </View>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </ScrollView>
    </>
  );
};

export default Homeloader;

const styles = StyleSheet.create({
  caregory: {
    width: WIDTH * 0.21,
    height: HEIGHT * 0.1,
    borderRadius: 8,
    marginBottom: HEIGHT * 0.012,
  },
});
