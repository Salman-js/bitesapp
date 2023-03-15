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
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnimatedNumbers from 'react-native-animated-numbers';
import CartItem from '../Components/cartItem';

const CartScreen = ({ route }) => {
  const navigation = useNavigation();
  const { orderPassed } = route.params;
  const [order, setOrder] = useState(orderPassed);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
  });
  async function removeWholeItem(id) {
    let newItems = order.items;
    const thisItem = order.items.filter((item) => item.id === id);
    newItems = newItems.filter((item) => item.id !== id);
    setOrder({
      ...order,
      items: newItems,
      totalPrice: order.totalPrice - thisItem[0].price * thisItem.length,
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
    <View className='pb-28 bg-slate-200 h-full flex items-center'>
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
          'py-3 text-gray-700 my-4 border-t border-gray-200 w-full bg-white',
          {
            borderTopWidth: 0.7,
          }
        )}
        titleStyle={tw.style('text-gray-700')}
        onPress={() => console.log('')}
      />
      <ScrollView className='w-full h-full'>
        <View className='w-full'>
          <View className='w-full px-4 bg-white pb-28'>
            {uniqItems.map((dish, index) => (
              <CartItem
                key={index}
                order={order}
                dish={dish}
                removeItem={removeWholeItem}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View className='absolute bottom-6 w-11/12 '>
        <List.Item
          title='View cart'
          left={(props) => (
            <View
              {...props}
              className='p-2 px-3 rounded-md bg-amber-700 shadow-inner'
            >
              <AnimatedNumbers
                animateToNumber={order.items.length}
                fontStyle={tw.style('text-base text-white')}
                animationDuration={500}
              />
            </View>
          )}
          right={(props) => (
            <View {...props} className='my-auto flex flex-row'>
              <Text className='text-xl font-extrabold text-white'>ETB </Text>
              <AnimatedNumbers
                animateToNumber={parseFloat(order.totalPrice).toPrecision(2)}
                fontStyle={tw.style('text-xl font-extrabold text-white')}
                animationDuration={500}
              />
            </View>
          )}
          style={tw.style('py-3 text-gray-700 mt-3 bg-amber-600 rounded-lg')}
          titleStyle={tw.style('text-white text-xl font-extrabold')}
          onPress={() => console.log('')}
          disabled={!order.items.length}
        />
      </View>
    </View>
  );
};

export default CartScreen;
