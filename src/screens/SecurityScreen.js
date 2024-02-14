import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import COLORS from '../../constants/Colors';
import SIZES from '../../constants/Sizes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SecurityScreen = () => {
  const navigation = useNavigation();

  return (

    <SafeAreaView style={{ flex: 1, marginHorizontal: SIZES.small - 3 }}>

      <Header
        title="Privacy"
        showBackButton
      />


      <TouchableOpacity style={styles.notificationItem}  onPress={() => navigation.navigate("CreatePassword")}>

        <View>
          <Text style={styles.notificationTitle}>Change password</Text>
        </View>

        <View style={styles.rightArrowContainer}>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#000" />
        </View>

      </TouchableOpacity>


    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',

  },
  notificationTitle: {
    fontSize: 19,
    color: COLORS.black,
    marginBottom: 5, // Added margin for separation
    fontWeight: "bold",

  },
  notificationSubtitle: {
    fontSize: 16,
    color: COLORS.grey
  },
  rightArrowContainer: {
    position: "absolute",
    right: 0
  },
});

export default SecurityScreen;
