import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView, Pressable, Image } from 'react-native';
import Header from '../components/Header';
import SIZES from '../../constants/Sizes';
import COLORS from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const notificationsData = [
  { id: '1', title: 'Laiba ', message: 'requested you for wooden dining table set', image: require('../../assets/images/profile-pic.jpg') },
  { id: '2', title: '', message: 'Your Ad is live!', image: require('../../assets/images/pro.jpg') },
  { id: '3', title: '', message: 'You deleted your Ad', image: require('../../assets/images/awareness.png') },
  { id: '4', title: '', message: 'You deleted your Ad', image: require('../../assets/images/awareness.png') },
  // Add more notification data as needed
];

const MainNotification = () => {
  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Pressable
        style={{
          flexDirection: "row",
          marginBottom: 15,
          marginTop: 15,
          justifyContent: "center",
          alignItems: "center",

        }}
      >
        <View style={{ backgroundColor: COLORS.lightGray, borderRadius: 10, alignItems: "center", justifyContent: "center", overflow: 'hidden' }}>
          <Image
            style={{ width: 60, height: 60, resizeMode: 'cover' }}
            source={item.image}
          />
        </View>

        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationMessage}>{item.message}</Text>
          </Text>
          <Text style={{ color: '#a2a6ab', fontSize: 16, }}>just now</Text>
        </View>

        {item.title ? (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <AntDesign name="checksquareo" size={40} color="#0ec43f" />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="closesquareo" size={40} color="#e30e2a" />
            </TouchableOpacity>
          </View>
        ) : null}
      </Pressable>


    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: SIZES.small - 3 }}>

      <Header
        title="Notifications"
        showBackButton
      />

      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    // padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  notificationMessage: {
    fontSize: 16,
    color: '#555',
  },

});

export default MainNotification;

