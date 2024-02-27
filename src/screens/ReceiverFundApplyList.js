import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Pressable, Image, Modal, Alert, ImageBackground } from 'react-native';
import Header from '../components/Header';
import SIZES from '../../constants/Sizes';
import COLORS from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../components/carditem.style';
import Button from '../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReceiverFundApplyList = ({ route }) => {
    const navigation = useNavigation();
    const [id, setId] = useState()
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
                setId(userData.id);
                getdata(userData.id)
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



    const getdata = async (id) => {
        try {
            const response = await axios.get(`https://app-api.demo-customwebsites.com/api/receiver-applied-list/${id}`);

            console.log('get fund apply Successfully:', response.data);
            setalldata(response.data.data);
        }
        catch (error) {
            //   setLoading(false);
            console.error('Error get fund request:', error.response.data);

        }
    };

    const userObjects = alldata.map(item => item.fund);
    console.log('sdfsdgf',userObjects)

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

            <View>

                <Header
                    title="Applied Fund List"
                    showBackButton
                />

                {userObjects.map((fund, index) => (

                    <Pressable key={index} style={[
                        styles.cardItem, { height: 105, margin: 5 }
                    ]}
                        onPress={() => navigation.navigate('FundraiserDetails', { itemId: fund.id })}
                    >

                        <View style={{ flexDirection: 'row' }}>
                        
                                <View style={[styles.savedIconBackground,{ top: 5, left: 75, }]}>
                                    <Ionicons name="heart" size={22} color={COLORS.primary} />
                                </View>
                   



                            <ImageBackground style={{ width: 110, height: 120 }} source={fund.image_1 ? { uri: "https://app-api.demo-customwebsites.com/" + fund.image_1 } : require('../../assets/images/images.jpg')}
                            >
                            </ImageBackground>


                            <View

                                style={[{ width: 110, height: 120 }, styles.cardDetails]}
                            >
                                <Text style={styles.cardItemName(COLORS.black, SIZES.xSmall - 7, SIZES.medium - 1,)} numberOfLines={1} ellipsizeMode="tail">{fund?.title}</Text>
    
                                    <View>
                                        <Text style={styles.cardDonationText(COLORS.grey, SIZES.small)} numberOfLines={2} ellipsizeMode="tail">{fund?.description}</Text>

                                        <View style={styles.cardDonationContainer}>
                                            <Text style={styles.cardDonationText(COLORS.primary, SIZES.small)}>
                                                {fund?.is_active === '1' ? 'Available' : 'Donated'}
                                            </Text>
                                            <Text style={styles.cardDonationText(COLORS.primary, SIZES.small)}>
                                                <Text>{formatDaysDifference(calculateDaysDifference(fund?.created_at))}</Text>
                                            </Text>
                                        </View>
                                    </View>

                               
                            </View>

                        </View>

                    </Pressable>


                ))}




            </View>
        </SafeAreaView>
    );
};



export default ReceiverFundApplyList;

{/* <Pressable key={index} style={[
    styles.cardItem, { height: 105, margin: 5 }
]}
    // onPress={() => navigation.navigate('FundraiserDetails', { itemId: fund.id })}
>

    <View style={{ flexDirection: 'row' }}>
    
            <View style={[styles.savedIconBackground,{ top: 5, left: 75, }]}>
                <Ionicons name="heart" size={22} color={COLORS.primary} />
            </View>




        <ImageBackground style={{ width: 110, height: 120 }} source={fund.image_1 ? { uri: "https://app-api.demo-customwebsites.com/" + fund.image_1 } : require('../../assets/images/images.jpg')}
        >
            <View style={styles.textBackground}>
                <Text style={styles.cardItemName(COLORS.white, 0, SIZES.medium - 1,)}>{fund?.category}</Text>
            </View>
        </ImageBackground>


        <View

            style={[{ width: 110, height: 120 }, styles.cardDetails]}
        >
            <Text style={styles.cardItemName(COLORS.black, SIZES.xSmall - 7, SIZES.medium - 1,)} numberOfLines={1} ellipsizeMode="tail">{fund?.title}</Text>

                <View>
                    <Text style={styles.cardDonationText(COLORS.grey, SIZES.small)} numberOfLines={2} ellipsizeMode="tail">{fund?.description}</Text>

                    <View style={styles.cardDonationContainer}>
                        <Text style={styles.cardDonationText(COLORS.primary, SIZES.small)}>
                            {fund?.is_active === '1' ? 'Available' : 'Donated'}
                        </Text>
                        <Text style={styles.cardDonationText(COLORS.primary, SIZES.small)}>
                            <Text>{formatDaysDifference(calculateDaysDifference(fund?.created_at))}</Text>
                        </Text>
                    </View>
                </View>

           
        </View>

    </View>

</Pressable> */}