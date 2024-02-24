import React, {useState} from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Pressable, Image, Modal , StyleSheet, Alert} from 'react-native';
import Header from '../components/Header';
import SIZES from '../../constants/Sizes';
import COLORS from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';

const categoryData = [
    { id: '1', name: 'Laibo', cnic: '23101-4256785-6', date:'2023-04-15 14:29:28', image: require('../../assets/images/profile-pic.jpg') },
    { id: '2', name: 'Laibo', cnic: '23101-4256785-6', date:'2023-04-15 14:29:28', image: require('../../assets/images/profile-pic.jpg') },
];


const FundRequest = () => {
    const navigation = useNavigation();
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
                    <Text style={styles.notificationTitle}>{item.name} ({item.cnic})</Text>
                    {/* <Text style={styles.notificationMessage}>{item.category}</Text> */}
                    <Text style={{ color: '#a2a6ab', fontSize: 16, }}>{item.date} </Text>
                </View>
                <Button
                                    onPress={()=> navigation.navigate("RequestInfo")}
                                    title="Details"
                                    filled={true}
                                    width='30%'
                                />

            </Pressable>


        </View>
    );
  
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

            <View style={{ marginHorizontal: SIZES.medium }}>

                <Header
                    title="Receiver Request"
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

export default FundRequest;

