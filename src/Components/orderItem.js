import { View, Text, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton, Pressable } from '@react-native-material/core';
import AnimatedNumbers from 'react-native-animated-numbers';
import { useNavigation } from '@react-navigation/native';

const OrderItem = ({ order }) => {
  const navigation = useNavigation();
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
  });
  return (
    <View className='w-full p-2'>
      <Pressable
        style={tw.style('w-full p-4')}
        onPress={() =>
          navigation.navigate('Track', {
            order,
          })
        }
      >
        <View className='w-full flex flex-row justify-between'>
          <View className='flex flex-row space-x-2'>
            <Image
              source={{
                uri: order.restaurantImage,
              }}
              style={tw.style('w-16 h-16 rounded-md my-auto')}
            />
            <View style={tw.style('my-auto')}>
              <Text className='text-2xl text-black font-extrabold break-words'>
                {order.restaurantName}
              </Text>
              <Text className='text-xl text-gray-500 font-light break-words'>
                {order.items.length} items
              </Text>
            </View>
          </View>
          <Text className='text-xl font-extrabold text-black my-auto'>
            {formatter.format(order.totalPrice)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default OrderItem;
