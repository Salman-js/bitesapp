import { View, ImageBackground } from 'react-native';
import React from 'react';
import { Pressable } from '@react-native-material/core';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const BannerSlider = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View className='rounded-xl overflow-hidden bg-gray-700 mx-2'>
      <ImageBackground
        source={{
          uri: data.banner,
        }}
        // imageStyle={tw.style('opacity-50')}
      >
        <Pressable
          style={tw.style('h-44 flex flex-col justify-end p-3')}
          onPress={() => navigation.navigate('Product')}
        ></Pressable>
      </ImageBackground>
    </View>
  );
};

export default BannerSlider;
