import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from '@react-native-material/core';
import AnimatedNumbers from 'react-native-animated-numbers';

const DishItem = ({ dish }) => {
  const [newItem, setNewItem] = useState({
    amount: 0,
  });
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
  });
  return (
    <View className='w-full p-2'>
      <View className='w-full flex flex-row justify-between'>
        <View
          style={tw.style('', {
            width: '75%',
          })}
        >
          <Text className='text-xl text-black font-light break-words'>
            {dish.name}
          </Text>
          <Text className='text-sm text-gray-500 font-light break-words'>
            {dish.description}
          </Text>
        </View>
        <Image
          source={{
            uri: dish.image,
          }}
          style={tw.style('w-1/5 h-16 rounded-md my-auto')}
        />
      </View>
      <View className='w-full flex flex-row justify-between'>
        <ItemCounter newItem={newItem} setNewItem={setNewItem} />
        <Text className='text-xl font-extrabold text-black my-auto'>
          {formatter.format(dish.price)}
        </Text>
      </View>
    </View>
  );
};

const ItemCounter = ({ newItem, setNewItem }) => {
  return (
    <View className='flex flex-row bg-gray-200 rounded-lg p-1 mt-2'>
      <IconButton
        icon={(props) => (
          <Icon
            name={
              newItem.amount === 1
                ? 'delete'
                : newItem.amount === 0
                ? ''
                : 'minus'
            }
            {...props}
            size={26}
          />
        )}
        onPress={() =>
          setNewItem({
            ...newItem,
            amount: newItem.amount - 1,
          })
        }
        disabled={!newItem.amount}
      />
      <View className='my-auto'>
        <AnimatedNumbers
          animateToNumber={newItem.amount}
          fontStyle={tw.style('font-bold text-base mx-1 my-auto')}
          animationDuration={500}
        />
      </View>
      <IconButton
        icon={(props) => <Icon name='plus' {...props} size={26} />}
        onPress={() =>
          setNewItem({
            ...newItem,
            amount: newItem.amount + 1,
          })
        }
      />
    </View>
  );
};
export default DishItem;
