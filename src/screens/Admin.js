import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/Colors';
import SIZES from '../../constants/Sizes';
import Fonts from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Admin = () => {
  const navigation = useNavigation();

  const boxes = [
    { id: 1, color: '#e4fcca', icon: require('../../assets/images/category.png'), label: 'Categories', count: 6 ,   screen: 'Categories',},
    { id: 2, color: '#f7dcdf', icon: require('../../assets/images/bullet-list.png'), label: 'Funds', count: 10 ,screen: 'Items',},
    { id: 3, color: '#fae3ac', icon: require('../../assets/images/group.png'), label: 'Users', count: 20, screen: 'Users', },
    { id: 4, color: '#dce9fa', icon: require('../../assets/images/request.png'), label: 'Receiver Request', count: 10,screen: 'AdminReceiverRequest', },
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

      <View style={{ marginHorizontal: SIZES.small }}>

        <View>
        <Text style={styles.welcomeTxt(COLORS.black, SIZES.medium, SIZES.large - 5, Fonts.medium)}>
          {" "}
          Welcome Back
        </Text>

        <Text style={styles.welcomeTxt(COLORS.primary, 0, SIZES.xLarge - 2, Fonts.bold)}>
          {" "}
          Laiba Kanwal!
        </Text>
        </View>

        <View style={styles.container}>
          {boxes.map((box) => (

            <View style={styles.boxStyle(box.color)} key={box.id}>
              <Pressable
                style={{
                  margin: 9,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate(box.screen)}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: COLORS.white,
                    borderRadius: 35,
                    padding: 32,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={box.icon} />
                </View>
                <Text
                  style={{
                    fontSize: SIZES.large - 3,
                    fontFamily: Fonts.bold,
                    marginTop: 5,
                    color: COLORS.black,
                  }}
                >
                  {box.label}
                </Text>
                <Text
                  style={{
                    fontSize: SIZES.large,
                    fontFamily: Fonts.bold,
                    marginTop: 5,
                    color: COLORS.grey,
                  }}
                >
                  {box.count}
                </Text>
              </Pressable>
            </View>

          ))}
        </View>

      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  welcomeTxt: (color, top, size, family) => ({
    fontFamily: family,
    fontSize: size,
    marginTop: top,
    color: color,  }),
  boxStyle: (color) => ({
    width: '46%',
    height: 150,
    borderRadius: 25,
    backgroundColor: color,
    marginHorizontal:5,
    marginTop: 10
  }),
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginTop: 15,
    },
});
export default Admin;
