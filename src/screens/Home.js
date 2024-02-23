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
  const [educationData, setEducationData] = useState([]);
  const [humanityData, setHumanityData] = useState([]);
  const [medicalData, setMedicalData] = useState([]);
  const [socialData, setSocialData] = useState([]);
  const [disasterData, setDisasterData] = useState([]);


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
        getdata(userData.id, 'education', setEducationData);
        getdata(userData.id, 'humaninty', setHumanityData);
        getdata(userData.id, 'Medical', setMedicalData);
        getdata(userData.id, 'Disaster', setDisasterData);
        getdata(userData.id, 'Social', setSocialData);
        // return userData;

      } else {
        console.log('No login data found in AsyncStorage.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving login data from AsyncStorage:', error);
      return null;
    }
  };


  //   const getdata = async () => {
  //     try {
  //       const response = await axios.get('https://app-api.demo-customwebsites.com/api/front-fund-list');
  //       // setalldata(response.data.data);

  //       // Extract unique user IDs
  // //       const uniqueUserIdsObject = {};
  // //       response.data.data.forEach(item => {
  // //         if (!uniqueUserIdsObject[item.user_id]) {
  // //           uniqueUserIdsObject[item.user_id] = [item];
  // //         }
  // //         //  else {
  // //         //   uniqueUserIdsObject[item.user_id].push(item);
  // //         // }
  // //       });
  // //       const flattenedData = Object.values(uniqueUserIdsObject).flat();
  // //       setalldata(flattenedData)
  // // console.log(flattenedData)
  // setalldata(response.data.data)

  //     } catch (error) {
  //       console.error('Error fetching data:', error.response.data);
  //     }
  //   };

  const getdata = async (userId, category, setalldata) => {
    try {
      const response = await axios.get(`https://app-api.demo-customwebsites.com/api/front-fund-category/${category}?user_id=${userId}`);

      setalldata(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error.response.data);
    }
  };
console.log(id)

  const filterData = (category) => {
    // Function to dynamically filter based on category
    return alldata.filter((item) => item.category === category);
  };

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

      <ScrollView style={{ marginBottom: 55 }}>
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

            <TouchableOpacity onPress={() => navigation.navigate("CategoryList")}
              style={{ flexDirection: "row", marginTop: 16 }}>
              <Text style={{ color: COLORS.primary, marginTop: 1, fontSize: SIZES.medium, marginRight: 10, fontFamily: Fonts.medium }}>See All</Text>
              <Ionicons name="arrow-forward-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            {categories.map((item, index) => (
              //  console.warn(item)
              <TouchableOpacity
                onPress={() => navigation.navigate("AllCategories", { categoryName: item?.name })}
                activeOpacity={0.5}
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
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => navigation.navigate("AllCategories", { categoryName: 'Humaninty' })}
              activeOpacity={0.5}
              style={{
                margin: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ width: 60, height: 60, backgroundColor: "#edeaf9", borderRadius: 35, padding: 32, alignItems: "center", justifyContent: "center" }}>
                <Image
                  style={{ width: 40, height: 40, resizeMode: "contain" }}
                  source={require('../../assets/images/icon1.png')}
                />
              </View>
              <Text style={{
                textAlign: "center",
                fontSize: SIZES.medium - 3,
                fontFamily: Fonts.bold,
                marginTop: 5,
                color: COLORS.black
              }}>Humaninty</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {educationData.length > 0 ? (
          <Card horizontal={true} titleText="Education" seeAllText="See All" hideContainer={false} showHeartIcon={true} list={educationData.slice(0, 3)} searchView={false} disablePress={false} showOrganiserInfo={false} showSavedIcon={true} showDonationInfo={true} savedView={false} imageView={true} profileView={false} />
        ) : null}


        {humanityData.length > 0 ? (
          <Card horizontal={true} titleText="Humaninty" seeAllText="See All" hideContainer={false} showHeartIcon={true} list={humanityData.slice(0, 3)} searchView={false} disablePress={false} showOrganiserInfo={false} showSavedIcon={true} showDonationInfo={true} savedView={false} imageView={true} profileView={false} />
        ) : null}

        {socialData.length > 0 ? (
          <Card horizontal={true} titleText="Social" seeAllText="See All" hideContainer={false} showHeartIcon={true} list={socialData.slice(0, 3)} searchView={false} disablePress={false} showOrganiserInfo={false} showSavedIcon={true} showDonationInfo={true} savedView={false} imageView={true} profileView={false} />
        ) : (null
          // <View>
          //   {/* You can render a placeholder or nothing when there's no data */}
          //  {/* <Text style={{color:COLORS.black}}>No Medical Fundraisers available</Text> */}
          // </View>
        )}

        {/* <Card horizontal={true} titleText="Humaninty Fundraisers" seeAllText="See All" hideContainer={false} showHeartIcon={true} list={filterData('Humaninty')} searchView={false} disablePress={false} showOrganiserInfo={false} showSavedIcon={true} showDonationInfo={true} savedView={false} imageView={true} profileView={false} /> */}

        <Card horizontal={true} titleText="Humaninty Fundraisers" seeAllText="See All" hideContainer={false} showHeartIcon={true} list={list} searchView={false} disablePress={false} showOrganiserInfo={false} showSavedIcon={true} showDonationInfo={true} savedView={false} imageView={true} profileView={false} />


      </ScrollView>

    </SafeAreaView>
  );
}

export default Home;
