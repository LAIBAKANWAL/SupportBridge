import { View, Text, TouchableOpacity, ScrollView, Pressable, Image } from 'react-native';
import React from 'react';
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
import {list} from '../components/Data';
import {categories} from '../components/Data';

// const IMAGES = {
//   image1: require('../../assets/images/awareness.png'),
//   image2: require('../../assets/images/medical.png'),
//   image3: require('../../assets/images/world.png'),
//   image4: require('../../assets/images/icon1.png'),
//   image5: require('../../assets/images/education.png'),
// };


// const categories = [
//   {
//     id: "0",
//     image: IMAGES.image1,
//     name: "Social",
//     backgroundColor: "#E1F3E6"
//   },
//   {
//     id: "1",
//     image: IMAGES.image2,
//     name: "Medical",
//     backgroundColor: "#DEECF1"
//   },
//   {
//     id: "3",
//     image: IMAGES.image3,
//     name: "Disaster",
//     backgroundColor: "#ede8e3"
//   },
//   {
//     id: "4",
//     image: IMAGES.image4,
//     name: "Humaninty",
//     backgroundColor: "#edeaf9"
//   },
//   {
//     id: "5",
//     image: IMAGES.image5,
//     name: "Education",
//     backgroundColor: "#EBF2D2"
//   },
// ];

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white}}>
    
        <View style={styles.appBarWrapper}>
          <View style={styles.appBar}>
            <Ionicons name="location-outline" size={24} color={COLORS.black} />
            <Text style={styles.location}>Karachi Pakistan</Text>
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.notificationCount}>
                <Text style={styles.notificationNo}>2</Text>
              </View>
              <TouchableOpacity  onPress={() => navigation.navigate('MainNotification')}  activeOpacity={0.4}>
                <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView>
          <Welcome />
          <Carousel/>

          {/* categories */}
          <View style={{ marginHorizontal: SIZES.small }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{
                fontSize: SIZES.large,
                fontFamily: Fonts.medium,
                marginTop: 15,
                color: COLORS.black,
                marginLeft:10
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

          <Card  horizontal={true}  titleText="Urgent Fundraisers" seeAllText="See All" hideContainer={false} showHeartIcon={true} list={list} searchView={false} disablePress={false} showOrganiserInfo={false} showSavedIcon={true} showDonationInfo={true} savedView={false} imageView={true} profileView={false}/>

          <Card  horizontal={true}  titleText="Urgent Fundraisers" seeAllText="See All" hideContainer={false} showHeartIcon={true} list={list} searchView={false} disablePress={false} showOrganiserInfo={false} showSavedIcon={true} showDonationInfo={true} savedView={false} imageView={true} profileView={false}/>


        </ScrollView>
      
    </SafeAreaView>
  );
}

export default Home;
