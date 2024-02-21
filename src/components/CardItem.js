// CardItem.js
import React, { useState } from 'react';
import { View, Text, ImageBackground, Pressable, FlatList, Dimensions, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import COLORS from '../../constants/Colors';
import SIZES from '../../constants/Sizes';
import Fonts from '../../constants/Fonts';
import styles from './carditem.style';
import { list } from '../components/Data'
import { useNavigation } from '@react-navigation/native';

const Screen_width = Dimensions.get('window').width;

const CardItem = ({ item, showHeartIcon, disablePress, searchView, showOrganiserInfo, showSavedIcon, showDonationInfo, savedView, imageView, data, profileView}) => {
    const [savedItems, setSavedItems] = useState([]);
    const navigation = useNavigation();

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (event) => {
        const offset = event.nativeEvent.contentOffset.x;
        const index = Math.floor(offset / Screen_width);
        setCurrentIndex(index);
    };

    const handleSavePress = (itemId) => {
        if (savedItems.includes(itemId)) {
            setSavedItems(savedItems.filter(id => id !== itemId));

        } else {
            setSavedItems([...savedItems, itemId]);

        }
    };

    const onPressHandler = disablePress
        ? undefined // Set to undefined to disabe onPress
        // : () => navigation.navigate('FundraiserDetails', { cardId: item.id, cardList: {list} });
        // : () => navigation.navigate('FundraiserDetails', { cardId: item.id, cardList: data });
        : () => navigation.navigate('FundraiserDetails', { itemId: item.id, cardList: data  });


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
            return <Text style={styles.primaryText}>{days} <Text style={styles.greyText}>days ago</Text></Text>;        }
    };
 
    return (

        <Pressable style={[
            styles.cardItem,
            searchView ?
                (showOrganiserInfo ? { height: 100, margin: 5 } : { height: 105, margin: 5, }) :

                (imageView ? (profileView ? { marginTop: 10, marginRight: 10 } : { margin: 10 }) : null)

            // (imageView? 
            //     {margin: 10}: null)
        ]}
            // onPress={onPressHandler}
            onPress={imageView ? onPressHandler : undefined}
            disabled={!imageView}
        >

            <View style={searchView ? { flexDirection: 'row' } : null}>
                {showSavedIcon && (
                    <View style={[styles.savedIconBackground, searchView ? { top: 5, left: 75, } : { top: 10, right: 10 }]}>
                        {showHeartIcon ? (
                            <Ionicons
                                name={savedItems.includes(item.id) ? "heart" : "heart-outline"}
                                size={22}
                                color={savedItems.includes(item.id) ? COLORS.primary : COLORS.primary}
                                onPress={() => handleSavePress(item.id)}
                            />
                        ) : (
                            // Render only one icon (heart or heart-outline) based on your requirement
                            <Ionicons name="heart" size={22} color={COLORS.primary} onPress={() => handleSavePress(item.id)} />
                        )}
                    </View>
                )}


                {imageView ?
                    (<ImageBackground style={[searchView ? (showOrganiserInfo ? styles.cardImageWithOrganiserInfo : { width: 110, height: 120 }) : {
                        width: savedView ? 320 : 230,
                        height: 130
                    }
                    ]} source={item.image}>
                        {searchView ? null : <View style={styles.textBackground}>
                            <Text style={styles.cardItemName(COLORS.white, 0, SIZES.medium - 1,)}>{item?.category}</Text>
                        </View>}
                    </ImageBackground>
                    )
                    :
                    (<View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={Screen_width}
                            snapToAlignment='center'
                            decelerationRate={'fast'}
                            pagingEnabled
                            onScroll={handleScroll}
                            scrollEventThrottle={0}
                            data={data}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                if (!item.uri) return <View style={{ width: 0 }} />
                                return (
                                    <View style={{ width: Screen_width, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={{ uri: item.uri }} style={styles.imageGallery(Screen_width - 140)} />
                                        <View style={styles.imageText}>
                                            <Ionicons name="camera-outline" size={17} color={COLORS.white} />
                                            <Text style={{ paddingLeft: 5, }}>{`${currentIndex + 1}/${data.length}`}</Text>
                                        </View>
                                    </View>

                                )
                            }}
                        />

                    </View>
                    )
                }




                <View
                    // style={styles.cardDetails}  320
                    style={[searchView ? (showOrganiserInfo ? styles.cardImageWithOrganiserInfo : { width: 110, height: 120 }) : {
                        width: savedView ? "100%" : 230,
                        height: 105
                    }, styles.cardDetails]}
                >

                    <Text style={styles.cardItemName(COLORS.black, SIZES.xSmall - 7, SIZES.medium - 1,)} numberOfLines={1} ellipsizeMode="tail">{item?.title}</Text>
                    {showDonationInfo && (
                        <View>
                            <Text style={styles.cardDonationText(COLORS.grey, SIZES.small)} numberOfLines={2} ellipsizeMode="tail">{item?.description}</Text>

                            <View style={styles.cardDonationContainer}>
                                <Text style={styles.cardDonationText(COLORS.primary, SIZES.small)}>
                                     {item?.is_active === '1' ? 'Available' : 'Donated'}
                                </Text>
                                <Text style={styles.cardDonationText(COLORS.primary, SIZES.small)}>
                                    {imageView ?
                                        (
                                            <>
                                                <Text>{formatDaysDifference(calculateDaysDifference(item?.created_at))}</Text>
                                              </>) :
                                        (<Text style={styles.greyText}>13/01/2024</Text>)
                                    }

                                </Text>
                            </View>
                        </View>
                    )}

                    {showOrganiserInfo && (
                        <Text style={styles.cardDonationText(COLORS.primary, SIZES.medium - 2)}>
                            Organiser:
                            <Text style={styles.greyText}> Healthy Home</Text>
                        </Text>
                    )}
                </View>

            </View>

        </Pressable>

    );
};

export default CardItem;
