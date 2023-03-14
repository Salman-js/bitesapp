import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from '@react-native-material/core';

const DishItem = () => {
  const [newItem, setNewItem] = useState({
    amount: 0,
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
            Dish Name
          </Text>
          <Text className='text-sm text-gray-500 font-light break-words'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
            provident aspernatur nam modi saepe dolore aliquid,
          </Text>
        </View>
        <Image
          source={{
            uri: 'https://restaurantclicks.com/wp-content/uploads/2022/03/Hooters-Closing.jpg',
          }}
          style={tw.style('w-1/5 h-16 rounded-md my-auto')}
        />
      </View>
      <View className='w-32'>
        <ItemCounter newItem={newItem} setNewItem={setNewItem} />
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
      <Text className='font-bold text-base mx-1 my-auto'>{newItem.amount}</Text>
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
