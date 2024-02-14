// Fundraiser_Details.js

import React, { useState } from 'react';
import { View, Text, SafeAreaView, Pressable, Image, ScrollView, FlatList,Dimensions} from 'react-native';
import Header from '../components/Header';
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../constants/Colors';
import SIZES from '../../constants/Sizes';
import Fonts from '../../constants/Fonts';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import CardItem from '../components/CardItem';
import styles from '../components/carditem.style';
import { imageGallery } from '../components/Data';

const FundraiserDetails = ({ route }) => {
    const navigation = useNavigation();
    const { cardId, cardList } = route.params;
   
    const selectedCard = cardList.find((card) => card.id === cardId);
    // console.warn(selectedCard)
    const [showFullText, setShowFullText] = useState(false);

    const storyText = 'Our campaign will focus on bridging the educational gap for children facing financial constraints. Many bright minds in our community lack access to basic educational resources, hindering their ability to reach their full potential. "Empowering Dreams" aims to provide school supplies, scholarships, and educational support to these deserving children.';

    const trimmedText = showFullText ? storyText : storyText.slice(0, 150);
    return (
        // marginHorizontal: SIZES.small - 3
        <SafeAreaView style={{ flex: 1, }}>
    
            <Header
                title ={`${selectedCard.title} details`}
                showBackButton
                showShareButton
                fontSize={16}
            />
            <ScrollView style={{ flex: 1 }}>
    
               <CardItem
                        item={selectedCard}
                        showHeartIcon={false}
                        disablePress={true}
                        searchView ={false}
                        showOrganiserInfo={false}
                        showSavedIcon={true}
                        showDonationInfo={true}
                        imageView={false}
                        data={imageGallery}
                        savedView={true}
                    />

                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Button
                    onPress={() => navigation.navigate('Donation',  { selectedCard })}
                        title="Donate Now"
                        filled={true}
                        width='95%'
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                    />
                </View>

                <View style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, marginTop: 20, }}></View>

                <View style={{ padding: 10 }}>
                    <Text style={styles.cardItemName(COLORS.black, 5, SIZES.large)}>Fundraiser</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" , marginTop:5}}>
                        <View style={{ width: 50, height: 50, backgroundColor: COLORS.lightGray, borderRadius: 35, padding: 32, alignItems: "center", justifyContent: "center" }}>
                            <Image
                                style={{ width: 40, height: 40, resizeMode: "contain" }}
                                source={selectedCard.image}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={styles.cardItemName(COLORS.black, 5, SIZES.medium)}>Healthy Home</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.cardItemName(COLORS.grey, 5)}>Verified </Text>
                                <MaterialIcons name="verified" size={20} color={COLORS.primary} />
                            </View>
                        </View>

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
                        />
                    </View>



                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
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
                    </View>


                    <View>
                        <Text style={styles.cardItemName(COLORS.black, 5, SIZES.large)}>Story</Text>
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

                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
};

export default FundraiserDetails;


