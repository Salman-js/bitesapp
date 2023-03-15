import { View, Text, Image } from 'react-native';
import React from 'react';
import { IconButton, Surface } from '@react-native-material/core';
import Icon from '@expo/vector-icons/Feather';
import tw from 'twrnc';
import { useState } from 'react';
import { List } from 'react-native-paper';
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnimatedNumbers from 'react-native-animated-numbers';
import CartItem from '../Components/cartItem';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../api/orders';
import OrderItem from '../Components/orderItem';

const OrdersScreen = ({ route }) => {
  const navigation = useNavigation();
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
  });
  const orderQuery = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
  });
  return (
    <View className='pt-14 bg-white h-full flex items-center'>
      <View className='w-full flex flex-row justify-between px-3 py-4 mb-1 bg-white'>
        <IconButton
          icon={(props) => <Icon name='chevron-left' {...props} size={30} />}
          style={tw.style('my-auto')}
          onPress={() => navigation.goBack()}
        />
        <View className='my-auto'>
          <Text className='text-2xl text-black break-words font-extrabold text-center'>
            Orders
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
      <ScrollView className='w-full divide-y divide-gray-300'>
        {orderQuery.data &&
          orderQuery.data.map((order, index) => (
            <OrderItem key={index} order={order} />
          ))}
      </ScrollView>
    </View>
  );
};

export default OrdersScreen;
