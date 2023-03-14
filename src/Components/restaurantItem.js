import { View, Text, Image } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import { Pressable, Surface } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';

const RestaurantItem = ({ restaurant }) => {
  const navigation = useNavigation();
  return (
    <Surface
      style={tw.style('w-60 h-48 rounded-lg overflow-hidden mx-1')}
      elevation={5}
    >
      <Pressable
        style={tw.style('w-full h-full')}
        onPress={() => navigation.navigate('Restaurant')}
      >
        <Image
          source={{
            uri: restaurant.image,
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
          <View className='flex flex-row mt-1'>
            <Ionicons
              name='location-sharp'
              size={20}
              color='#f59e0b'
              style={tw.style('')}
            />
            <Text className='font-light text-sm text-amber-500 ml-1 my-auto'>
              {restaurant.address}
            </Text>
          </View>
        </View>
      </Pressable>
    </Surface>
  );
};

export default RestaurantItem;
