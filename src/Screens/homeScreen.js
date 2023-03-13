import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { IconButton, Pressable } from '@react-native-material/core';
import { Searchbar } from 'react-native-paper';
import BannerSlider from '../Components/bannerSlider';
import Carousel from 'react-native-reanimated-carousel';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const renderBanner = ({ item }) => {
  return <BannerSlider data={item} />;
};

const HomeScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const products = [
    {
      banner:
        'https://img.us.news.samsung.com/us/wp-content/uploads/2022/08/10085138/galaxy_zfold4_graygreen_phantomblack_beige-scaled.jpg',
    },
    {
      banner:
        'https://img.us.news.samsung.com/us/wp-content/uploads/2022/08/10085138/galaxy_zfold4_graygreen_phantomblack_beige-scaled.jpg',
    },
    {
      banner:
        'https://img.us.news.samsung.com/us/wp-content/uploads/2022/08/10085138/galaxy_zfold4_graygreen_phantomblack_beige-scaled.jpg',
    },
    {
      banner:
        'https://img.us.news.samsung.com/us/wp-content/uploads/2022/08/10085138/galaxy_zfold4_graygreen_phantomblack_beige-scaled.jpg',
    },
    {
      banner:
        'https://img.us.news.samsung.com/us/wp-content/uploads/2022/08/10085138/galaxy_zfold4_graygreen_phantomblack_beige-scaled.jpg',
    },
    {
      banner:
        'https://img.us.news.samsung.com/us/wp-content/uploads/2022/08/10085138/galaxy_zfold4_graygreen_phantomblack_beige-scaled.jpg',
    },
  ];
  const categories = [
    {
      name: 'Phone',
      icon: <Ionicons name='phone-portrait-outline' size={32} />,
    },
    {
      name: 'Appliance',
      icon: <Ionicons name='home-outline' size={32} />,
    },
    {
      name: 'Computer',
      icon: <Ionicons name='laptop-outline' size={32} />,
    },
    {
      name: 'Accessories',
      icon: <Feather name='headphones' size={32} />,
    },
    {
      name: 'Other',
      icon: <Feather name='more-horizontal' size={32} />,
    },
  ];
  useEffect(() => {
    const scrollToTop = navigation.addListener('tabPress', (e) => {
      scrollView.current.scrollToOffset({
        offset: 0,
        animated: true,
      });
    });
    return navigation.removeListener(scrollToTop);
  }, []);
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <View className='pt-14 bg-white h-full px-2'>
      <View className='w-full flex flex-row pb-2'>
        <IconButton
          icon={(props) => <Feather name='menu' {...props} size={35} />}
        />
        <Searchbar
          placeholder='Search'
          style={tw.style('rounded-xl h-12 bg-gray-100 ml-2', {
            width: '85%',
          })}
          inputStyle={tw.style('text-black')}
          placeholderTextColor='black'
          iconColor='black'
          // onSubmitEditing={() => navigation.navigate('Search')}
          elevation={false}
        />
      </View>
      <View className='w-full'>
        <View className='w-full mt-4'>
          <Text
            style={tw.style('text-lg ml-3 text-black', {
              fontWeight: '900',
            })}
          >
            Featured This Week:
          </Text>
          <Carousel
            data={products}
            renderItem={renderBanner}
            width={windowWidth - 10}
            height={windowWidth / 2 - 20}
            itemWidth={300}
            loop
            autoplay
            autoPlayInterval={3000}
            mode='parallax'
            onSnapToItem={(index) => setActiveSlide(index)}
            scrollAnimationDuration={1000}
          />
        </View>
        <View className='h-50 w-full mt-4'>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className='w-full h-20'
          >
            {categories.map((category, index) => {
              return (
                <View className='flex justify-center items-center' key={index}>
                  <Pressable
                    style={tw.style(
                      'w-14 h-14 rounded-xl flex items-center justify-center bg-gray-200 mx-4'
                    )}
                  >
                    {category.icon}
                  </Pressable>
                  <Text>{category.name}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View className='w-full flex flex-row justify-between px-3 mt-8'>
          <Text className='font-bold text-base text-black my-auto'>
            Latest offers
          </Text>
          <Pressable style={tw.style('p-2')}>
            <Text className='text-base text-black'>View all</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;