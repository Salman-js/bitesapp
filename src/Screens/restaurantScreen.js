import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { Button, IconButton } from '@react-native-material/core';
import Icon from '@expo/vector-icons/Feather';
import Material from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { useState } from 'react';
import { Button as PaperButton, List } from 'react-native-paper';
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { StatusBar } from 'react-native';
import DishItem from '../Components/dishItem';
import axios from 'axios';
import LoadingDishItem from '../Components/loadingDishItem';
import { useNavigation } from '@react-navigation/native';

const RestaurantScreen = ({ route }) => {
  const navigation = useNavigation();
  const { restaurantPassed } = route.params;
  const [order, setOrder] = useState({
    items: [],
    totalPrice: 0,
  });
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  async function getRestaurant(id) {
    setLoading(true);
    axios
      .get(
        `https://75b9-2a0d-5600-44-4000-00-3401.ap.ngrok.io/restaurants?id=${id}`
      )
      .then((res) => {
        setRestaurant(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  useEffect(() => {
    getRestaurant(restaurantPassed.id);
  }, []);
  return (
    <View className='h-full items-center'>
      <StatusBar
        animated={true}
        translucent
        backgroundColor='#00000078'
        barStyle='light-content'
      />
      <ScrollView className='w-full h-full'>
        <Image
          source={{
            uri: restaurantPassed.image,
          }}
          style={tw.style('w-full h-64')}
        />
        <View className='w-full pt-4 bg-white'>
          <View className='px-4 w-full'>
            <Text
              className='text-3xl text-black break-words'
              style={{
                fontWeight: '900',
                width: '80%',
              }}
            >
              {restaurantPassed.name}
            </Text>
            <View className='flex flex-row mt-2 items-center'>
              <AntDesign name='star' color='#f59e0b' size={22} />
              <Text className='text-amber-500 font-bold text-lg ml-1'>
                {restaurantPassed.rating}
              </Text>
              <Text className='text-amber-500 font-bold text-lg ml-2'>.</Text>
              <Text className='text-amber-500 font-bold text-base ml-2 my-auto'>
                {restaurantPassed.genre}
              </Text>
              <Text className='text-amber-500 font-bold text-lg ml-2'>.</Text>
              <Ionicons
                name='location-sharp'
                size={20}
                color='#f59e0b'
                style={tw.style('ml-2')}
              />
              <Text className='text-amber-500 font-bold text-base ml-1 my-auto'>
                {restaurantPassed.address}
              </Text>
            </View>
            <Text className='text-base text-gray-500 break-words text-left mt-3'>
              {restaurantPassed.description}
            </Text>
          </View>
          <List.Item
            title='Have a food allergy?'
            left={(props) => (
              <List.Icon {...props} icon='help-circle-outline' size={24} />
            )}
            right={(props) => (
              <Icon name='chevron-right' size={24} {...props} />
            )}
            style={tw.style(
              'py-3 text-gray-700 mt-3 border-t border-gray-200',
              {
                borderTopWidth: 0.7,
              }
            )}
            titleStyle={tw.style('text-gray-700')}
            onPress={() => console.log('')}
          />
        </View>
        <View className='w-full mt-8'>
          <View className='w-full px-4'>
            <Text className='text-2xl text-gray-700 font-extrabold break-words'>
              Menu
            </Text>
          </View>
          <View className='w-full px-4 mt-4 bg-white pb-28'>
            {loading
              ? [...Array(3).keys()].map((dish, index) => (
                  <LoadingDishItem key={index} />
                ))
              : restaurant &&
                Object.keys(restaurant) &&
                restaurant.dishes.map((dish, index) => (
                  <DishItem key={index} dish={dish} />
                ))}
          </View>
        </View>
      </ScrollView>
      <View
        style={tw.style(
          'absolute top-12 px-3 py-2 flex flex-row justify-between w-full'
        )}
      >
        <IconButton
          icon={(props) => <Icon name='arrow-left' {...props} size={25} />}
          onPress={() => navigation.goBack()}
          style={tw.style('', {
            backgroundColor: '#ffffffcf',
          })}
        />
      </View>
      <View className='absolute bottom-6 w-11/12 '>
        <List.Item
          title='View cart'
          left={(props) => (
            <View
              {...props}
              className='p-2 px-3 rounded-md bg-amber-700 shadow-inner'
            >
              <Text className='text-base text-white'>{order.items.length}</Text>
            </View>
          )}
          right={(props) => (
            <Text {...props} className='text-xl font-extrabold text-white'>
              {order.totalPrice} ETB
            </Text>
          )}
          style={tw.style('py-3 text-gray-700 mt-3 bg-amber-600 rounded-lg')}
          titleStyle={tw.style('text-white text-xl font-extrabold')}
          onPress={() => console.log('')}
        />
      </View>
    </View>
  );
};

export default RestaurantScreen;
