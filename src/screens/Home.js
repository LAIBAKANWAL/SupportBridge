import { View, Text, TouchableOpacity, ScrollView, Pressable, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './home.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../constants/Colors';
import Welcome from '../components/home/Welcome';
import Carousel from '../components/home/Carousel';
import SIZES from '../../constants/Sizes';
import Fonts from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/home/Card';
import { list } from '../components/Data';
import { categories } from '../components/Data';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const [id, setid] = useState();
  const [name, setName] = useState();
  const [accountType, setAccountType] = useState();


  // const [alldata, setalldata] = useState({});

  const [alldata, setalldata] = useState([]);


  useEffect(() => {
    getLoginDataFromStorage();
  }, []);

  const getLoginDataFromStorage = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('user_data');
      if (storedUserData) {

        const userData = JSON.parse(storedUserData);
        // console.log('Retrieved login data from AsyncStorage:', userData);
        setid(userData.id);
        setName(userData.name);
        setAccountType(userData.user_type);
        getdata(userData.id);
        return userData;

      } else {
        console.log('No login data found in AsyncStorage.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving login data from AsyncStorage:', error);
      return null;
    }
  };


  // const getdata = async (id) => {
  //   try {
  //     const response = await axios.get(`https://app-api.demo-customwebsites.com/api/front-fund-list`);

  //     // Extract unique user_id values using Set
  //     // const uniqueUserIdsSet = new Set(data.map(item => item.user_id));

  //     // Convert Set back to an array
  //     // const uniqueUserIdsArray = [...uniqueUserIdsSet];


  //     // console.log('save Successfullyyyyy:', response.data.data);
  //     // setalldata(uniqueUserIdsArray)
  //     setalldata(response.data.data);
  //     // console.log(uniqueUserIdsArray)
  //   }
  //   catch (error) {
  //     console.error('Error saving profile:', error.response.data);
  //     // console.error('Error saving profile:', error.response);

  //   }
  // };

  // const getdata = async () => {
  //   try {
  //     const response = await axios.get('https://app-api.demo-customwebsites.com/api/front-fund-list');
  //     setalldata(response.data.data);
  //     // console.log(response.data.data)
  //     const uniqueUserIdsArray = [...new Set(alldata.map(item => item.user_id))];
  //     console.log( uniqueUserIdsArray.map(userId => (
  //                userId
  //     )))
  //   } catch (error) {
  //     console.error('Error fetching data:', error.response.data);
  //   }
  // };

  // const renderUniqueUserIds = () => {
  //   if (!alldata) {
  //     return null; // or loading indicator, error message, etc.
  //   }

  //   // Extract unique user IDs
  //   const uniqueUserIdsArray = [...new Set(alldata.map(item => item.user_id))];

  //   return (
  //     <View>
  //       {uniqueUserIdsArray.map(userId => (
  //         <View key={userId}>
  //           <Text>User ID: {userId}</Text>
  //           {/* Render additional user-specific data here if needed */}
  //         </View>
  //       ))}
  //     </View>
  //   );
  // };
  // console.log(renderUniqueUserIds)

  const getdata = async () => {
    try {
      const response = await axios.get('https://app-api.demo-customwebsites.com/api/front-fund-list');
      // setalldata(response.data.data);

      // Extract unique user IDs
      const uniqueUserIdsObject = {};
      response.data.data.forEach(item => {
        if (!uniqueUserIdsObject[item.user_id]) {
          uniqueUserIdsObject[item.user_id] = [item];
        }
        //  else {
        //   uniqueUserIdsObject[item.user_id].push(item);
        // }
      });
      const flattenedData = Object.values(uniqueUserIdsObject).flat();
      setalldata(flattenedData)
console.log(flattenedData)
      // Log unique user IDs and their corresponding data
      // console.log(flattenedData);
      // console.log(flattenedData)
    } catch (error) {
      console.error('Error fetching data:', error.response.data);
    }
  };

  // const filteredDataa = alldata.filter((item) => item.category === 'education' );

  const filterData = (category) => {
    // Function to dynamically filter based on category
    return alldata.filter((item) => item.category === category);
  };
 
  // const organizeDataByCategory = () => {
  //   const organizedData = {};
    
  //   alldata.forEach(item => {
  //     const category = item.category;
  //     if (!organizedData[category]) {
  //       organizedData[category] = [item];
  //     } else {
  //       organizedData[category].push(item);
  //     }
  //   });

  //   return organizedData;
  // };
  // console.log(organizeDataByCategory())

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

        <View style={styles.appBarWrapper}>
          <View style={styles.appBar}>
            <Ionicons name="location-outline" size={24} color={COLORS.black} />
            <Text style={styles.location}>Karachi Pakistan</Text>
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.notificationCount}>
                <Text style={styles.notificationNo}>2</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('MainNotification')} activeOpacity={0.4}>
                <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView style={{ marginBottom: 55}}>
          <Welcome name={name} accountType={accountType} />
          <Carousel />

          {/* categories */}
          <View style={{ marginHorizontal: SIZES.small }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{
                fontSize: SIZES.large,
                fontFamily: Fonts.medium,
                marginTop: 15,
                color: COLORS.black,
                marginLeft: 10
              }}>Favourite Categories</Text>

              <Pressable onPress={() => navigation.navigate("AllCategories")}
                style={{ flexDirection: "row", marginTop: 16 }}>
                <Text style={{ color: COLORS.primary, marginTop: 1, fontSize: SIZES.medium, marginRight: 10, fontFamily: Fonts.medium }}>See All</Text>
                <Ionicons name="arrow-forward-outline" size={24} color={COLORS.primary} />
              </Pressable>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
              {categories.map((item, index) => (
                //  console.warn(item)
                <Pressable
                  key={index}
                  style={{
                    margin: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ width: 60, height: 60, backgroundColor: item.backgroundColor, borderRadius: 35, padding: 32, alignItems: "center", justifyContent: "center" }}>
                    <Image
                      style={{ width: 40, height: 40, resizeMode: "contain" }}
                      source={item.image}
                    />
                  </View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: SIZES.medium - 3,
                      fontFamily: Fonts.bold,
                      marginTop: 5,
                      color: COLORS.black
                    }}
                  >
                    {item?.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <Card horizontal={true} titleText="Education Fundraisers" seeAllText="See All" hideContainer={false} showHeartIcon={true} list={filterData('education')} searchView={false} disablePress={false} showOrganiserInfo={false} showSavedIcon={true} showDonationInfo={true} savedView={false} imageView={true} profileView={false}/>

          <Card horizontal={true} titleText="Humaninty Fundraisers" seeAllText="See All" hideContainer={false} showHeartIcon={true} list={filterData('Humaninty')} searchView={false} disablePress={false} showOrganiserInfo={false} showSavedIcon={true} showDonationInfo={true} savedView={false} imageView={true} profileView={false} />

          <Card horizontal={true} titleText="Humaninty Fundraisers" seeAllText="See All" hideContainer={false} showHeartIcon={true} list={list} searchView={false} disablePress={false} showOrganiserInfo={false} showSavedIcon={true} showDonationInfo={true} savedView={false} imageView={true} profileView={false} />


        </ScrollView>

      </SafeAreaView>
    );
  }

  export default Home;
