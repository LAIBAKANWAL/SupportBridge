import React, {useState} from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Pressable, Image, Modal , StyleSheet, Alert} from 'react-native';
import Header from '../components/Header';
import SIZES from '../../constants/Sizes';
import COLORS from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const categoryData = [
    { id: '1', categoryName: 'Education', image: require('../../assets/images/profile-pic.jpg') },
    { id: '2', categoryName: 'Education', image: require('../../assets/images/profile-pic.jpg') },
    { id: '3', categoryName: 'Education', image: require('../../assets/images/profile-pic.jpg') },
    { id: '4', categoryName: 'Education', image: require('../../assets/images/profile-pic.jpg') },
];


const ReceiverRequest = () => {
  
    const accountRemove = () =>{
        Alert.alert('Are you sure to delete?','',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              // Add your delete account logic here
              console.log('Account deleted!');
            },
          },
        ],
        { cancelable: false });
        
        };

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
                    <Text style={styles.notificationTitle}>{item.categoryName}</Text>
                    {/* <Text style={styles.notificationMessage}>{item.category}</Text>
                    <Text style={{ color: '#a2a6ab', fontSize: 16, }}>{item.status}</Text> */}
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity>
                        <AntDesign name="edit" size={40} color="#0ec43f" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={accountRemove}>
                        <AntDesign name="delete" size={30} color="#e30e2a" />
                    </TouchableOpacity>
                </View>

            </Pressable>


        </View>
    );
  
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

            <View style={{ marginHorizontal: SIZES.medium }}>

                <Header
                    title="Categories"
                    showBackButton
                />

                <FlatList
                    data={categoryData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />

               

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    notificationItem: {
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

export default ReceiverRequest;

