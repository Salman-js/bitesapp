import { View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Skeleton } from '@rneui/themed';

const LoadingOrderItem = () => {
  return (
    <View className='w-full p-4'>
      <View className='w-full flex flex-row justify-between'>
        <View className='flex flex-row space-x-2'>
          <Skeleton
            animation='wave'
            style={tw.style('w-16 h-16 bg-amber-500  rounded-md my-auto')}
          />
          <View className='my-auto space-y-1'>
            <Skeleton
              animation='wave'
              style={tw.style('w-20 h-6 bg-amber-500 rounded-md')}
            />
            <Skeleton
              animation='wave'
              style={tw.style('w-14 h-4 bg-amber-500 rounded-md')}
            />
            <Skeleton
              animation='wave'
              style={tw.style('w-16 h-3 bg-amber-500 rounded-md')}
            />
          </View>
        </View>
        <Skeleton
          animation='wave'
          style={tw.style('w-10 h-6 bg-amber-500 rounded-md my-auto')}
        />
      </View>
    </View>
  );
};

export default LoadingOrderItem;
