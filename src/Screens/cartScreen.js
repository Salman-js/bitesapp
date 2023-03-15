import { View, Text, Image } from 'react-native';
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
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnimatedNumbers from 'react-native-animated-numbers';
import CartItem from '../Components/cartItem';
import { StatusBar } from 'react-native';

const CartScreen = ({ route }) => {
  const navigation = useNavigation();
  const { orderPassed } = route.params;
  const [order, setOrder] = useState(orderPassed);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
  });
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
    });
    return order;
  }
  let uniqItems = [];
  let uniqueObject = {};
  for (let i in order.items) {
    objId = order.items[i]['id'];
    uniqueObject[objId] = order.items[i];
  }
  for (i in uniqueObject) {
    uniqItems.push(uniqueObject[i]);
  }
  return (
    <View className='bg-slate-200 h-full flex items-center pb-44'>
      <View className='w-full flex flex-row justify-between px-3 py-4 mb-1 bg-white'>
        <IconButton
          icon={(props) => <Icon name='chevron-down' {...props} size={30} />}
          style={tw.style('my-auto')}
          onPress={() => navigation.goBack()}
        />
        <View className='my-auto'>
          <Text className='text-2xl text-black break-words font-extrabold text-center'>
            Cart
          </Text>
          <Text className='text-base text-gray-400 break-words font-extralight text-center'>
            {orderPassed.restaurantName}
          </Text>
        </View>
        <IconButton
          icon={(props) => (
            <Icon name='chevron-down' {...props} size={30} color='white' />
          )}
          style={tw.style('my-auto')}
          disabled
        />
      </View>
      <List.Item
        title='Delivery in 50-75 minutes'
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
            Change
          </Text>
        )}
        style={tw.style(
          'text-gray-700 my-4 border-t border-gray-200 w-full bg-white',
          {
            borderTopWidth: 0.7,
          }
        )}
        titleStyle={tw.style('text-gray-700')}
        onPress={() => console.log('')}
      />
      <ScrollView className='w-full divide-y divide-gray-300'>
        {uniqItems.map((dish, index) => (
          <CartItem
            key={index}
            order={order}
            dish={dish}
            removeItem={removeItemFromCart}
          />
        ))}
      </ScrollView>
      <View className='absolute bottom-0 w-full bg-white flex items-center py-6 space-y-4'>
        <View className='w-full px-6 flex flex-row justify-between'>
          <Text className='text-lg text-gray-400 my-auto'>Subtotal</Text>
          <View className='flex flex-row'>
            <Text className='text-lg text-gray-400'>ETB </Text>
            <AnimatedNumbers
              includeComma
              animateToNumber={order.totalPrice}
              fontStyle={tw.style('text-lg text-gray-400')}
              animationDuration={500}
            />
          </View>
        </View>
        <View className='w-full px-6 flex flex-row justify-between'>
          <Text className='text-lg text-gray-400 my-auto'>Delivery fee</Text>
          <View className='flex flex-row'>
            <Text className='text-lg text-gray-400'>ETB </Text>
            <AnimatedNumbers
              includeComma
              animateToNumber={order.items.length ? order.deliveryFee : 0}
              fontStyle={tw.style('text-lg text-gray-400')}
              animationDuration={500}
            />
          </View>
        </View>
        <View className='w-full px-6 flex flex-row justify-between'>
          <Text className='text-xl text-black my-auto font-extrabold'>
            Order total
          </Text>
          <View className='flex flex-row'>
            <Text className='text-xl text-black font-extrabold'>ETB </Text>
            <AnimatedNumbers
              includeComma
              animateToNumber={
                order.items.length ? order.totalPrice + 35 : order.totalPrice
              }
              fontStyle={tw.style('text-xl text-black font-extrabold')}
              animationDuration={500}
            />
          </View>
        </View>
        <Surface
          style={tw.style('w-11/12 rounded-xl bg-amber-600')}
          elevation={5}
        >
          <Pressable
            className='w-full p-6 flex items-center justify-center'
            onPress={() =>
              navigation.navigate('Track', {
                order,
              })
            }
          >
            <Text className='text-xl font-semibold text-white'>
              Place order
            </Text>
          </Pressable>
        </Surface>
      </View>
    </View>
  );
};

export default CartScreen;
