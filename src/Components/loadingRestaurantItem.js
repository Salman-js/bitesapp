import { View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Pressable, Surface } from '@react-native-material/core';
import { Skeleton } from '@rneui/themed';

const LoadingRestaurantItem = () => {
  return (
    <Surface
      style={tw.style('w-60 h-48 rounded-xl overflow-hidden ml-2')}
      elevation={5}
    >
      <Pressable style={tw.style('w-full h-full')}>
        <Skeleton
          animation='wave'
          style={tw.style('w-full bg-amber-500', {
            height: '58%',
          })}
        />
        <View className='w-full p-1 px-2'>
          <Skeleton
            style={tw.style('w-1/2 h-4 bg-amber-500')}
            animation='wave'
          />
          <View className='flex flex-row mt-1'>
            <Skeleton
              style={tw.style('w-1/2 h-4 bg-amber-500')}
              animation='wave'
            />
          </View>
          <Skeleton
            style={tw.style('w-4/5 h-4 mt-1 bg-amber-500')}
            animation='wave'
          />
        </View>
      </Pressable>
    </Surface>
  );
};

export default LoadingRestaurantItem;
