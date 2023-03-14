import { View, Text, Image } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import { Pressable, Surface } from '@react-native-material/core';

const RestaurantItem = ({ restaurant }) => {
  return (
    <Surface
      style={tw.style('w-60 h-48 rounded-xl overflow-hidden ml-2')}
      elevation={5}
    >
      <Pressable style={tw.style('w-full h-full')}>
        <Image
          source={{
            uri: 'https://nonprofitquarterly.org/wp-content/uploads/2019/11/chick-fil-a-night.jpg',
          }}
          style={tw.style('w-full', {
            height: '58%',
          })}
        />
        <View className='w-full p-1 px-2'>
          <Text className='font-extrabold text-base text-black'>
            {restaurant.name}
          </Text>
          <View className='flex flex-row mt-1'>
            <AntDesign name='star' color='#f59e0b' size={20} />
            <Text className='text-amber-500 font-bold text-base ml-1'>
              {restaurant.rating}
            </Text>
            <Text className='text-amber-500 font-bold text-base ml-2'>.</Text>
            <Text className='text-amber-500 font-bold text-sm ml-2 my-auto'>
              {restaurant.genre}
            </Text>
          </View>
          <Text className='font-light text-sm text-amber-500 mt-1'>
            {String(restaurant.dishes)}
          </Text>
        </View>
      </Pressable>
    </Surface>
  );
};

export default RestaurantItem;
