import { View, Text, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';
import { IconButton } from '@react-native-material/core';
import RestaurantItem from './restaurantItem';
import LoadingRestaurantItem from './loadingRestaurantItem';

const TypeItem = ({ title, desc, restaurants, loading }) => {
  return (
    <View className='w-full pl-2 h-72'>
      <View className='w-full flex flex-row justify-between mb-3'>
        <View>
          <Text className='font-bold text-lg text-black'>{title}</Text>
          <Text className='font-extra light text-base text-amber-500'>
            {desc}
          </Text>
        </View>
        <IconButton
          icon={(props) => (
            <AntDesign name='arrowright' {...props} size={25} color='#ddba20' />
          )}
          style={tw.style('my-auto')}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='w-full py-2'
      >
        {loading
          ? [...Array(5).keys()].map((restaurant, index) => (
              <LoadingRestaurantItem key={index} />
            ))
          : restaurants.map((restaurant, index) => (
              <RestaurantItem restaurant={restaurant} key={index} />
            ))}
      </ScrollView>
    </View>
  );
};

export default TypeItem;
