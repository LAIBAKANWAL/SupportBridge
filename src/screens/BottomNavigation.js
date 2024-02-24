import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home';
import Donation from './Donation';
import Profile from './Profile';
import Saved from './Saved';
import DonarForm from './DonarForm';
import ReceiverForm from './ReceiverForm';
import Admin from './Admin';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import COLORS from '../../constants/Colors';
import { moneyIcon } from '../components/Data';
import Inbox from './Inbox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: COLORS.white
  }
}

const BottomNavigation = () => {

  const [accountType, setAccountType] = useState();

  useEffect(() => {
    getLoginDataFromStorage();
  }, []);

  const getLoginDataFromStorage = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('user_data');
      if (storedUserData) {

        const userData = JSON.parse(storedUserData);
        setAccountType(userData.user_type);
      } else {
        console.log('No login data found in AsyncStorage.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving login data from AsyncStorage:', error);
      return null;
    }
  };

  console.log('type', accountType)
  const getCreateComponent = () => {
    if (accountType === 'donor') {
      return DonarForm;
    } else {
      return Inbox;
    }
  };

  return (

    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo name="home" size={24} color={focused ? COLORS.primary : COLORS.grey}
                />
                <Text style={{ fontSize: 12, color: focused ? COLORS.primary : COLORS.grey, fontFamily: 'Roboto-Medium', }}>Home</Text>
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome6 name="heart-circle-check" size={24} color={focused ? COLORS.primary : COLORS.grey}
                />
                <Text style={{ fontSize: 12, color: focused ? COLORS.primary : COLORS.grey, fontFamily: 'Roboto-Medium' }}>Saved</Text>
              </View>
            )
          }
        }}
      />
      {/* ReceiverForm */}
      {/* <Tab.Screen
        name="DonarForm"
        component={DonarForm}
        options={{
          tabBarStyle:{display:"none"},
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.primary,
                    width: Platform.OS == "ios" ? 40 : 50,
                    height: Platform.OS == "ios" ? 40 : 50,
                    top: Platform.OS == "ios" ? -20 : -30,
                    borderRadius: Platform.OS == "ios" ? 25 : 30
                  }}
                >
                  <Entypo name="plus" size={24} color={COLORS.white}
                  />
                </View>
                <Text style={{
                  fontSize: 14, color: focused ? COLORS.primary : COLORS.grey,
                  position: "absolute", top: 25 ,fontFamily:'Roboto-Medium'
                }}>
                  Create</Text>
              </View>
            );
          },
          // tabBarVisible:false
          // tabBarVisible: route.state ? route.state.index === 0 : true, // Hide the bottom tab bar for the "Create" screen
        }}
      /> */}

      <Tab.Screen
        name="Create"
        component={getCreateComponent()}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => {

            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.primary,
                    width: Platform.OS == "ios" ? 40 : 50,
                    height: Platform.OS == "ios" ? 40 : 50,
                    top: Platform.OS == "ios" ? -20 : -30,
                    borderRadius: Platform.OS == "ios" ? 25 : 30
                  }}
                >
                  {accountType === 'donor' ? (
                    <Entypo name="plus" size={24} color={COLORS.white} />
                  ) : (
                    <MaterialCommunityIcons name="message-text-outline" size={24} color={COLORS.white} />
                  )}
                </View>
                <Text style={{
                  fontSize: 14, color: focused ? COLORS.primary : COLORS.grey,
                  position: "absolute", top: 25, fontFamily: 'Roboto-Medium'
                }}>
                  Create</Text>
              </View>
            );
          },
          // tabBarVisible:false
          // tabBarVisible: route.state ? route.state.index === 0 : true, // Hide the bottom tab bar for the "Create" screen
        }}
      />

      <Tab.Screen
        name="Admin"
        component={Admin}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                {/* <FontAwesome5 name="donate" size={24} color={focused ? COLORS.primary : COLORS.grey} /> */}
                <Image
                  style={{ width: 30, height: 26, resizeMode: "contain", tintColor: focused ? COLORS.primary : COLORS.grey }}
                  source={moneyIcon.price}
                />
                <Text style={{ fontSize: 12, color: focused ? COLORS.primary : COLORS.grey, fontFamily: 'Roboto-Medium' }}>Donation</Text>
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome5 name="user-alt" size={24} color={focused ? COLORS.primary : COLORS.grey} />
                <Text style={{ fontSize: 12, color: focused ? COLORS.primary : COLORS.grey, fontFamily: 'Roboto-Medium' }}>Profile</Text>
              </View>
            )
          }
        }}
      />
    </Tab.Navigator>

  )
};


export default BottomNavigation