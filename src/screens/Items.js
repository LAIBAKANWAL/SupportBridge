import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Pressable, Image, Modal, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header';
import SIZES from '../../constants/Sizes';
import COLORS from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';

import Button from '../components/Button';
import axios from 'axios';

const calculateDaysDifference = (dateString) => {
    const currentDate = new Date();
    const targetDate = new Date(dateString);
    const differenceInMilliseconds = currentDate - targetDate;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
};


const formatDaysDifference = (days) => {
    if (days === 0) {
        return <Text style={styles.greyText}>Today</Text>;
    } else if (days === 1) {
        return <Text style={styles.primaryText}>1 <Text style={styles.greyText}>day ago</Text></Text>;
    } else {
        return <Text style={styles.primaryText}>{days} <Text style={styles.greyText}>days ago</Text></Text>;
    }
};

const Items = () => {

    const [alldata, setalldata] = useState({});

    const navigation = useNavigation();
    useEffect(() => {
        getdata();
    }, []);

    const getdata = async () => {
        try {
            const response = await axios.get(`https://app-api.demo-customwebsites.com/api/admin-fund-list`);

            const sortedData = response.data.data.sort((a, b) => {
                const dateA = new Date(a.created_at || a.updated_at);
                const dateB = new Date(b.created_at || b.updated_at);

                return dateB - dateA;
            });


            setalldata(sortedData)
            // console.log('saf',sortedData)

        } catch (error) {
            console.error('Error fetching data:', error.response.data);
        }
    };

    const accountRemove = () => {
        Alert.alert('Are you sure to delete?', '',
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
                {/* <View style={{ backgroundColor: COLORS.lightGray, borderRadius: 10, alignItems: "center", justifyContent: "center", overflow: 'hidden' }}>
                    <Image
                        style={{ width: 60, height: 60, resizeMode: 'cover' }}
                        source={item.image}
                    />

                </View> */}

                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationMessage}>{item.category}</Text>
                    <Text style={{ color: '#a2a6ab', fontSize: 16, }}>{formatDaysDifference(calculateDaysDifference(item?.created_at))}</Text>

                    {(item.is_active === '1' ?
                        <Button
                            title="Active"
                            filled={false}
                            width='40%'
                            paddingBottom={5}
                            paddingVertical={5}
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        /> :
                        <Button
                            title="Deactivate"
                            filled={true}
                            width='50%'
                            paddingBottom={5}
                            paddingVertical={5}
                            color={COLORS.red}
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                                color: COLORS.red
                            }}
                        />
                    )}

                </View>


                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('FundraiserDetails', { itemId: item.id })}>
                        <EvilIcons name="eye" size={40} color="#0ec43f" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={accountRemove}>
                        <AntDesign name="delete" size={30} color="#e30e2a" />
                    </TouchableOpacity> */}
                </View>

            </Pressable>


        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

            <View style={{ marginHorizontal: SIZES.medium }}>

                <Header
                    title="Fund Lists"
                    showBackButton
                />

                <FlatList
                    data={alldata}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />



            </View>
            <View style={{marginTop:2000}}/>
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

export default Items;

