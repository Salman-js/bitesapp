import { View, Text, Image, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { Button, IconButton, Surface } from '@react-native-material/core';
import Icon from '@expo/vector-icons/Feather';
import Material from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { useState } from 'react';
import { Button as PaperButton, List } from 'react-native-paper';
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnimatedNumbers from 'react-native-animated-numbers';
import CartItem from '../Components/cartItem';
import * as Progress from 'react-native-progress';

const TrackingScreen = () => {
  const navigation = useNavigation();
  return (
    <View className='bg-cyan-500 h-full flex items-center pb-44'>
      <StatusBar
        animated={true}
        translucent
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      <View className='w-full flex flex-row justify-between px-3 pt-14  mb-1 bg-transparent'>
        <IconButton
          icon={(props) => <Icon name='x' {...props} size={30} />}
          style={tw.style('my-auto')}
          onPress={() => navigation.navigate('Home')}
        />
        <Pressable className='my-auto'>
          <Text className='text-lg text-gray-200'>Order help</Text>
        </Pressable>
      </View>
      <Surface
        style={tw.style(
          'my-4 w-11/12 rounded-md p-4 py-6 bg-white flex flex-row justify-between'
        )}
        elevation={5}
      >
        <View className='space-y-1'>
          <Text className='text-sm text-gray-400'>
            Estimated time of arrival
          </Text>
          <Text className='text-3xl font-extrabold text-black'>
            50-75 Minutes
          </Text>
          <Progress.Bar
            progress={0.3}
            width={150}
            indeterminate
            color='#ddba20'
          />
          <Text className='text-xs text-gray-400'>
            Your order at Chik fil A is being prepared
          </Text>
        </View>
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/thumbnails/007/557/606/small/flat-design-of-delivery-man-with-motorcycle-illustration-vector.jpg',
          }}
          style={tw.style('w-16 h-16 rounded-full my-auto')}
        />
      </Surface>
    </View>
  );
};

export default TrackingScreen;
