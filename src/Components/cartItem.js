import { View, Text, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from '@react-native-material/core';

const CartItem = ({ order, dish, removeItem }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
  });
  const dishInOrder = order.items.filter((item) => item.id === dish.id);
  return (
    <View className='w-full p-4 bg-white'>
      <View className='w-full flex flex-row justify-between'>
        <View
          style={tw.style('', {
            width: '60%',
          })}
        >
          <View style={tw.style('w-full flex flex-row')}>
            <Text className='text-2xl text-black font-bold my-auto'>
              {dishInOrder.length}{' '}
            </Text>
            <Text className='text-sm text-black font-bold my-auto mr-3'>X</Text>
            <Image
              source={{
                uri: dish.image,
              }}
              style={tw.style('w-1/4 h-12 rounded-full my-auto')}
            />
            <Text className='text-lg text-black font-bold break-words my-auto ml-3'>
              {dish.name}
            </Text>
          </View>
        </View>
        <View className='flex flex-row space-x-1'>
          <Text className='text-base font-light text-black my-auto'>
            {formatter.format(dish.price)}
          </Text>
          <IconButton
            icon={(props) => <Icon name='delete' {...props} size={26} />}
            onPress={() => removeItem(dish.id)}
            style={tw.style('my-auto')}
          />
        </View>
      </View>
    </View>
  );
};

export default CartItem;
