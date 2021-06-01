import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { COLORS, FONT, HEIGHT, WIDTH } from '../../Utils/constants';


const Filterloader = () => {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false
      }>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item marginLeft={0} width={'100%'}>
              <SkeletonPlaceholder.Item
                marginTop={10}
                width={WIDTH * 0.5}
                height={20}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item
                marginTop={10}
                width={'100%'}
                height={250}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item
                marginTop={10}
                width={'100%'}
                height={250}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item
                marginTop={10}
                width={'100%'}
                height={250}
                borderRadius={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </ScrollView>
    </>
  );
};

export default Filterloader;
