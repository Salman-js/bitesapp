import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import { IconButton, Pressable } from '@react-native-material/core';
import { Searchbar } from 'react-native-paper';
import BannerSlider from '../Components/bannerSlider';
import Carousel from 'react-native-reanimated-carousel';
import TypeItem from '../Components/typeItem';
import axios from 'axios';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const renderBanner = ({ item }) => {
  return <BannerSlider data={item} />;
};

const HomeScreen = ({ navigation }) => {
  const scrollView = useRef(null);
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(false);
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const categories = [
    {
      name: 'Burger',
      image:
        'https://assets.bonappetit.com/photos/5b919cb83d923e31d08fed17/1:1/w_2560%2Cc_limit/basically-burger-1.jpg',
    },
    {
      name: 'Chicken',
      image:
        'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2022/10/Roast-Chicken-main.jpg',
    },
    {
      name: 'Habeshan',
      image:
        'https://ca-times.brightspotcdn.com/dims4/default/a5d4d80/2147483647/strip/false/crop/2048x1366+0+0/resize/1486x991!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F5e%2Fb1%2F9d1c051e0e9f29cb4892eea6e254%2Flmieo8nc-recipe-db',
    },
    {
      name: 'Pizza',
      image:
        'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2021/06/1200/675/iStock-1222455274.jpg?ve=1&tl=1',
    },
    {
      name: 'Sandwich',
      image:
        'https://ca-times.brightspotcdn.com/dims4/default/4af5613/2147483647/strip/true/crop/6646x4154+0+139/resize/1200x750!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F60%2Fa1%2Fbb50c79f4ca9b598de8538c9db9f%2F1176080-fo-cooking-september-2022-03.jpg',
    },
    {
      name: 'Juice',
      image:
        'https://assets.bonappetit.com/photos/5b919cb83d923e31d08fed17/1:1/w_2560%2Cc_limit/basically-burger-1.jpg',
    },
    {
      name: 'Wrap',
      image:
        'https://assets.bonappetit.com/photos/5b919cb83d923e31d08fed17/1:1/w_2560%2Cc_limit/basically-burger-1.jpg',
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
  async function getRestaurants() {
    setLoading(true);
    axios
      .get('https://75b9-2a0d-5600-44-4000-00-3401.ap.ngrok.io/restaurants', {
        params: { _sort: 'name' },
      })
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  async function getFeaturedRestaurants() {
    setFeaturedLoading(true);
    axios
      .get(
        'https://75b9-2a0d-5600-44-4000-00-3401.ap.ngrok.io/restaurants?type=featured',
        {
          params: { _sort: 'id' },
        }
      )
      .then((res) => {
        setFeaturedRestaurants(res.data);
        setFeaturedLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setFeaturedLoading(false);
      });
  }
  useEffect(() => {
    getRestaurants();
    getFeaturedRestaurants();
  }, []);
  return (
    <View className='pt-14 pb-28 bg-white h-full px-2'>
      <View className='w-full flex flex-row justify-between px-1 mb-1'>
        <View className='rounded-xl overflow-hidden my-auto'>
          <Pressable style={tw.style('p-1 flex flex-row')}>
            <Icon
              name='map-marker-outline'
              size={25}
              color='#ddba20'
              style={tw.style('my-auto mr-2')}
            />
            <View>
              <Text className='font-extralight text-xs text-black mb-3 my-auto'>
                Destination
              </Text>
              <Text className='text-sm text-black mb-3 my-auto'>
                Current location
              </Text>
            </View>
            <Feather
              name='chevron-down'
              size={20}
              style={tw.style('ml-1 my-auto')}
              color='#939191'
            />
          </Pressable>
        </View>
        <IconButton
          icon={(props) => (
            <Feather name='user' {...props} size={30} color='#ddba20' />
          )}
          style={tw.style('my-auto')}
        />
      </View>
      <View className='w-full flex flex-row pb-3'>
        <Searchbar
          placeholder='Search'
          style={tw.style('rounded-xl bg-gray-100 ml-2 my-auto', {
            width: '85%',
          })}
          inputStyle={tw.style('text-black my-auto')}
          placeholderTextColor='black'
          iconColor='black'
          onSubmitEditing={() => navigation.navigate('Search')}
          elevation={false}
        />
        <IconButton
          icon={(props) => (
            <Icon name='tune-variant' {...props} size={30} color='#ddba20' />
          )}
          style={tw.style('my-auto')}
        />
      </View>
      <View className='w-full h-auto'>
        <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
          <View className='h-20 w-full'>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className='w-full h-20'
            >
              {categories.map((category, index) => {
                return (
                  <View
                    className='w-16 h-16 mx-1 rounded-lg overflow-hidden bg-gray-700'
                    key={index}
                  >
                    <ImageBackground
                      source={{
                        uri: category.image,
                      }}
                      resizeMode='cover'
                      imageStyle={tw.style('opacity-50')}
                    >
                      <Pressable
                        style={tw.style(
                          'w-full h-full rounded-xl flex items-start justify-end p-1'
                        )}
                      >
                        <Text className='text-xs font-bold text-white'>
                          {category.name}
                        </Text>
                      </Pressable>
                    </ImageBackground>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <TypeItem
            title='Featured'
            desc='Paid placements from our partners'
            restaurants={featuredRestaurants}
            loading={featuredLoading}
          />
          <TypeItem
            title='Tasty discounts'
            desc='Restaurants with special offers'
            restaurants={restaurants}
            loading={loading}
          />
          <TypeItem
            title='Offers near you'
            desc='Delicious cuisines in your area'
            restaurants={restaurants}
            loading={loading}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
