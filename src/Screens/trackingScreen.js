import { View, Text, Image, StatusBar, SafeAreaView } from 'react-native';
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
import MapView, { Marker } from 'react-native-maps';

const TrackingScreen = ({ route }) => {
  const navigation = useNavigation();
  const { order } = route.params;
  return (
    <View className='bg-cyan-500 h-full flex items-center'>
      <StatusBar
        animated={true}
        translucent
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      <View className='w-full flex flex-row justify-between px-3 pt-14  mb-1 bg-transparent'>
        <IconButton
          icon={(props) => <Icon name='x' {...props} size={30} color='white' />}
          style={tw.style('my-auto')}
          onPress={() => navigation.navigate('Home')}
        />
        <Pressable className='my-auto'>
          <Text className='text-lg text-white'>Order help</Text>
        </Pressable>
      </View>
      <SafeAreaView className='w-full flex items-center z-40'>
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
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: order.restaurantLocation.latitude,
          longitude: order.restaurantLocation.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={tw.style('-mt-10 z-0 flex w-full', {
          height: '75%',
        })}
        mapType='standard'
      >
        <Marker
          coordinate={{
            latitude: order.restaurantLocation.latitude,
            longitude: order.restaurantLocation.longitude,
          }}
          title={order.restaurantName}
          description={order.restaurantDescription}
          identifier='origin'
          pinColor='#a44d0f'
        />
      </MapView>
      <SafeAreaView className='absolute bottom-0 w-full z-40 bg-white'>
        <List.Item
          title='Salman Mohammed'
          description='Delivery person'
          left={(props) => (
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/thumbnails/007/557/606/small/flat-design-of-delivery-man-with-motorcycle-illustration-vector.jpg',
              }}
              style={tw.style('w-14 h-14 rounded-full ml-3')}
            />
          )}
          right={(props) => (
            <Text
              {...props}
              className='text-base font-light text-blue-400 my-auto'
            >
              Call
            </Text>
          )}
          style={tw.style('text-gray-700 my-4 w-full bg-white')}
          titleStyle={tw.style('text-gray-700')}
          onPress={() => console.log('')}
        />
      </SafeAreaView>
    </View>
  );
};

export default TrackingScreen;
