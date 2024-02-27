// Fundraiser_Details.js

import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Pressable, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import Header from '../components/Header';
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import COLORS from '../../constants/Colors';
import SIZES from '../../constants/Sizes';
import Fonts from '../../constants/Fonts';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import CardItem from '../components/CardItem';
import styles from '../components/carditem.style';
import { imageGallery } from '../components/Data';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FundraiserDetails = ({ route }) => {
    const navigation = useNavigation();
    const [fundDetails, setFundDetails] = useState({});
    const [donarDetails, setDonarDetails] = useState({});
    const [accountType, setAccountType] = useState();

    const { itemId } = route.params;

    useEffect(() => {
        getLoginDataFromStorage();
        getdata(itemId)
        getDonarData(fundDetails.user_id)
    }, [itemId, fundDetails.user_id]);

    const getLoginDataFromStorage = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem('user_data');
            if (storedUserData) {

                const userData = JSON.parse(storedUserData);
                // console.log('Retrieved login data from AsyncStorage:', userData);
                // setid(userData.id);
                setAccountType(userData.user_type);
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

    //   console.log('zxnbsdv',accountType)

    const getdata = async (id) => {
        try {
            const response = await axios.get(`https://app-api.demo-customwebsites.com/api/detail-fund/${id}`);

            console.log('get fund details Successfully:', response.data);
            setFundDetails(response.data.data);
            console.log('show:', response.data.data)
        }
        catch (error) {
            console.error('Error get fund details:', error.response.data);
        }
    };

    const getDonarData = async (id) => {
        try {
            const response = await axios.get(`https://app-api.demo-customwebsites.com/api/user-profile/${id}`);

            //   console.log('get fund details Successfully:', response.data);
            setDonarDetails(response.data.data);
            console.log('donar:', response.data.data)

            //   setLoading(false);
        }
        catch (error) {
            //   setLoading(false);
            console.error('Error get fund details:', error.response.data);
        }
    };

    const [showFullText, setShowFullText] = useState(false);

    const storyText = 'Our items will focus on bridging the needy gap for people facing financial constraints. Many bright minds in our community lack access to basic educational resources, hindering their ability to reach their full potential. "Empowering Dreams" aims to provide school supplies, scholarships, household things and educational support to these deserving people.';

    const trimmedText = showFullText ? storyText : storyText.slice(0, 150);

    const profileImage = "https://app-api.demo-customwebsites.com/" + donarDetails.profile_image;

    console.log('vchdfsd', fundDetails)
    return (
        <SafeAreaView style={{ flex: 1, }}>

            <Header
                title={`${fundDetails.title} details`}
                showBackButton
                showShareButton
                fontSize={16}
            />
            <ScrollView style={{ flex: 1 }}>

                <CardItem
                    item={fundDetails}
                    showHeartIcon={false}
                    disablePress={true}
                    searchView={false}
                    showOrganiserInfo={false}
                    showSavedIcon={true}
                    showDonationInfo={true}
                    imageView={false}
                    data={fundDetails}
                    // data={[fundDetails]}
                    savedView={true}
                />
                {accountType === 'receiver' ?
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Button
                            // onPress={() => navigation.navigate('Donation',  { fundDetails })}
                            onPress={() => navigation.navigate('ReceiverForm', { fundId: itemId })}
                            title="Request Now"
                            filled={true}
                            width='95%'
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        />
                    </View> :
                    null

                }
                {/* <View style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, marginTop: 20, }}></View> */}

                <View style={{ padding: 10, marginHorizontal: SIZES.small - 7 }}>
                    <Text style={styles.cardItemName(COLORS.black, 5, SIZES.large)}>Fundraiser</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 9 }}>
                        <View style={{ backgroundColor: COLORS.lightGray, borderRadius: 100, alignItems: "center", justifyContent: "center", overflow: 'hidden' }}>
                            <Image
                                style={{ width: 50, height: 50, resizeMode: "cover" }}
                                source={{ uri: profileImage }}
                            />
                        </View>

                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={styles.cardItemName(COLORS.black, 5, SIZES.medium)}>{donarDetails.name}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.cardItemName(COLORS.grey, 5)}>Verified </Text>
                                <MaterialIcons name="verified" size={20} color={COLORS.primary} />
                            </View>
                        </View>
                        {/* 
                        <Button
                            title="Follow"
                            filled={false}
                            width='27%'
                            paddingBottom={5}
                            paddingVertical={5}
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        /> */}
                    </View>



                    {/* <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={styles.cardItemName(COLORS.black, 5, SIZES.large)}>Fund Usage Plan</Text>
                        <Button
                            title="View Plan"
                            filled={false}
                            width='35%'
                            paddingBottom={5}
                            paddingVertical={5}
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        />
                    </View> */}


                    <View>
                        <Text style={styles.cardItemName(COLORS.black, 20, SIZES.large)}>Story</Text>
                        <Text style={[styles.cardDonationText(COLORS.grey, SIZES.medium - 2), { lineHeight: 20 }]}>{trimmedText}</Text>
                        {storyText.length > 150 && (
                            <Pressable onPress={() => setShowFullText(!showFullText)}>
                                {showFullText ? (
                                    <View style={styles.readMoreContent}>
                                        <Text style={styles.readMoreText}> Read Less</Text>
                                        <MaterialIcons name="keyboard-arrow-down" size={20} color={COLORS.primary} />
                                    </View>
                                )
                                    : (
                                        <View style={styles.readMoreContent}>
                                            <Text style={styles.readMoreText}> Read more</Text>
                                            <MaterialIcons name="keyboard-arrow-down" size={20} color={COLORS.primary} />
                                        </View>
                                    )}
                            </Pressable>
                        )}
                    </View>

                    <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 15 }}>
                        <Text style={styles.cardItemName(COLORS.black, 20, SIZES.large)}>Your safety matters to us!</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ marginTop: 5 }}><Entypo name="dot-single" size={25} color={COLORS.primary} /></Text>

                            <Text style={[styles.cardDonationText(COLORS.grey, SIZES.medium - 2), { lineHeight: 20 }]}> Only meet in public / crowded places.</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginTop: 5 }}><Entypo name="dot-single" size={25} color={COLORS.primary} /></Text>

                            <Text style={[styles.cardDonationText(COLORS.grey, SIZES.medium - 2), { lineHeight: 20 }]}>  Never go alone to meet a receiver / donar,always take someone with you.</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginTop: 5 }}><Entypo name="dot-single" size={25} color={COLORS.primary} /></Text>

                            <Text style={[styles.cardDonationText(COLORS.grey, SIZES.medium - 2), { lineHeight: 20 }]}>Never pay anything or transfer money for any fund item.</Text>
                        </View>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>

    );
};

export default FundraiserDetails;


