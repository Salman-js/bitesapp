import { View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Skeleton } from '@rneui/themed';

const LoadingDishItem = () => {
  return (
    <View className='w-full p-2'>
      <View className='w-full flex flex-row justify-between'>
        <View
          style={tw.style('', {
            width: '75%',
          })}
        >
          <Skeleton
            animation='wave'
            style={tw.style('w-1/2 h-6 bg-amber-500 rounded-md')}
          />
          <Skeleton
            animation='wave'
            style={tw.style('w-11/12 h-3 mt-1 bg-amber-500 rounded-md')}
          />
          <Skeleton
            animation='wave'
            style={tw.style('w-2/3 h-3 mt-1 bg-amber-500 rounded-md')}
          />
        </View>
        <Skeleton
          animation='wave'
          style={tw.style(
            'w-1/5 h-16 rounded-md my-auto bg-amber-500 rounded-md'
          )}
        />
      </View>
    </View>
  );
};

export default LoadingDishItem;
