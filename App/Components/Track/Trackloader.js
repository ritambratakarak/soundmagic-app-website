import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {COLORS, FONT, HEIGHT, WIDTH} from '../../Utils/constants';

const Trackloader = () => {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item marginLeft={0} width={'100%'}>
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
              <SkeletonPlaceholder.Item
                marginTop={10}
                width={WIDTH * 0.5}
                height={20}
                borderRadius={10}
              />
              <View style={{flexDirection:"row", marginVertical:HEIGHT * 0.02}}>
                <View style={{marginRight:10}}>
                  <View style={{width:100, height: HEIGHT * 0.10}} />
                </View>
                <View>
                  <View style={{width:WIDTH * 0.6, height: 20, marginBottom:8, borderRadius: 8,}} />
                  <View style={{width:WIDTH * 0.5, height: 20, marginBottom:8, borderRadius: 8,}} />
                  <View style={{width:WIDTH * 0.4, height: 20, borderRadius: 8,}} />
                </View>
              </View>
              <View style={{flexDirection:"row", marginVertical:HEIGHT * 0.02}}>
                <View style={{marginRight:10}}>
                  <View style={{width:100, height: HEIGHT * 0.10}} />
                </View>
                <View>
                  <View style={{width:WIDTH * 0.6, height: 20, marginBottom:8, borderRadius: 8,}} />
                  <View style={{width:WIDTH * 0.5, height: 20, marginBottom:8, borderRadius: 8,}} />
                  <View style={{width:WIDTH * 0.4, height: 20, borderRadius: 8,}} />
                </View>
              </View>
              <View style={{flexDirection:"row", marginVertical:HEIGHT * 0.02}}>
                <View style={{marginRight:10}}>
                  <View style={{width:100, height: HEIGHT * 0.10}} />
                </View>
                <View>
                  <View style={{width:WIDTH * 0.6, height: 20, marginBottom:8, borderRadius: 8,}} />
                  <View style={{width:WIDTH * 0.5, height: 20, marginBottom:8, borderRadius: 8,}} />
                  <View style={{width:WIDTH * 0.4, height: 20, borderRadius: 8,}} />
                </View>
              </View>
              <View style={{flexDirection:"row", marginVertical:HEIGHT * 0.02}}>
                <View style={{marginRight:10}}>
                  <View style={{width:100, height: HEIGHT * 0.10}} />
                </View>
                <View>
                  <View style={{width:WIDTH * 0.6, height: 20, marginBottom:8, borderRadius: 8,}} />
                  <View style={{width:WIDTH * 0.5, height: 20, marginBottom:8, borderRadius: 8,}} />
                  <View style={{width:WIDTH * 0.4, height: 20, borderRadius: 8,}} />
                </View>
              </View>
              <View style={{flexDirection:"row", marginVertical:HEIGHT * 0.02}}>
                <View style={{marginRight:10}}>
                  <View style={{width:100, height: HEIGHT * 0.10}} />
                </View>
                <View>
                  <View style={{width:WIDTH * 0.6, height: 20, marginBottom:8, borderRadius: 8,}} />
                  <View style={{width:WIDTH * 0.5, height: 20, marginBottom:8, borderRadius: 8,}} />
                  <View style={{width:WIDTH * 0.4, height: 20, borderRadius: 8,}} />
                </View>
              </View>
              <View style={{flexDirection:"row", marginVertical:HEIGHT * 0.02}}>
                <View style={{marginRight:10}}>
                  <View style={{width:100, height: HEIGHT * 0.10}} />
                </View>
                <View>
                  <View style={{width:WIDTH * 0.6, height: 20, marginBottom:8, borderRadius: 8,}} />
                  <View style={{width:WIDTH * 0.5, height: 20, marginBottom:8, borderRadius: 8,}} />
                  <View style={{width:WIDTH * 0.4, height: 20, borderRadius: 8,}} />
                </View>
              </View>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </ScrollView>
    </>
  );
};

export default Trackloader;
