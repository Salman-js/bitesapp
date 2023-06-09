import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { IconButton } from '@react-native-material/core';
import Icon from '@expo/vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { useState } from 'react';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { StatusBar } from 'react-native';
import DishItem from '../Components/dishItem';
import axios from 'axios';
import LoadingDishItem from '../Components/loadingDishItem';
import { useNavigation } from '@react-navigation/native';
import AnimatedNumbers from 'react-native-animated-numbers';
import * as Animatable from 'react-native-animatable';
import { URI } from '../api/constants';

const RestaurantScreen = ({ route }) => {
  const navigation = useNavigation();
  const { restaurantPassed } = route.params;
  // const orderQuery = useQuery({
  //   queryKey: ['order'],
  // });
  const [order, setOrder] = useState({
    items: [],
    totalPrice: 0.0,
    deliveryLocation: {
      latitude: 36.691062845810485,
      longitude: -96.30832214478872,
    },
    deliveryFee: 35.0,
    restaurantName: restaurantPassed.name,
    restaurantId: restaurantPassed.id,
    restaurantAddress: restaurantPassed.address,
    restaurantDescription: restaurantPassed.description,
    restaurantLocation: {
      latitude: restaurantPassed.latitude,
      longitude: restaurantPassed.longitude,
    },
  });
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
  });
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  async function addItemToCart(item) {
    setOrder({
      ...order,
      items: [...order.items, item],
      totalPrice: order.totalPrice + item.price,
    });
    return order;
  }
  async function removeItemFromCart(id) {
    let newItems = order.items;
    let newItem = order.items.filter((item) => item.id === id);
    const thisItem = order.items.filter((item) => item.id === id);
    newItem.pop();
    newItems = newItems.filter((item) => item.id !== id);
    newItems = newItems.concat(newItem);
    setOrder({
      ...order,
      items: newItems,
      totalPrice: order.totalPrice - thisItem[0].price,
      deliveryFee: 0.0,
    });
    return order;
  }
  async function getRestaurant(id) {
    setLoading(true);
    axios
      .get(`${URI}/restaurants?id=${id}`)
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
          <View
            className={`w-full px-4 mt-4 bg-white ${
              order.items.length && 'pb-28'
            }`}
          >
            {loading
              ? [...Array(4).keys()].map((dish, index) => (
                  <LoadingDishItem key={index} />
                ))
              : restaurant &&
                Object.keys(restaurant) &&
                restaurant.dishes.map((dish, index) => (
                  <DishItem
                    key={index}
                    order={order}
                    dish={dish}
                    addItem={addItemToCart}
                    removeItem={removeItemFromCart}
                  />
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
      {order.items.length ? (
        <Animatable.View
          animation='slideInUp'
          iterationCount={1}
          duration={500}
          className='absolute bottom-6 w-11/12'
        >
          <List.Item
            title='View cart'
            left={(props) => (
              <View
                {...props}
                className='p-2 px-3 rounded-md bg-amber-700 shadow-inner'
              >
                <AnimatedNumbers
                  animateToNumber={order.items.length}
                  fontStyle={tw.style('text-lg text-white font-bold')}
                  animationDuration={500}
                />
              </View>
            )}
            right={(props) => (
              <View {...props} className='my-auto flex flex-row'>
                <Text className='text-xl font-extrabold text-white'>ETB </Text>
                <AnimatedNumbers
                  includeComma
                  animateToNumber={order.totalPrice}
                  fontStyle={tw.style('text-xl font-extrabold text-white')}
                  animationDuration={500}
                />
              </View>
            )}
            style={tw.style('py-3 text-gray-700 mt-3 bg-amber-600 rounded-lg')}
            titleStyle={tw.style('text-white text-xl font-extrabold')}
            onPress={() =>
              navigation.navigate('Cart', {
                orderPassed: order,
              })
            }
            disabled={!order.items.length}
          />
        </Animatable.View>
      ) : null}
    </View>
  );
};

export default RestaurantScreen;
