// CardItem.js
import React, { useState } from 'react';
import { View, Text, ImageBackground, Pressable, FlatList, Dimensions, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import COLORS from '../../constants/Colors';
import SIZES from '../../constants/Sizes';
import Fonts from '../../constants/Fonts';
import styles from './carditem.style';
import { imageGallery, list } from '../components/Data'
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Button from './Button';

const Screen_width = Dimensions.get('window').width;

const CardItem = ({ item, showHeartIcon, disablePress, searchView, showOrganiserInfo, showSavedIcon, showDonationInfo, savedView, imageView, data, profileView, viewRequest }) => {
    const [savedItems, setSavedItems] = useState([]);
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

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

    const imagedata = [
        {
          image: item.image_1 ? { uri: "https://app-api.demo-customwebsites.com/" + item.image_1 } : require('../../assets/images/images.jpg'),
        },
        {
          image: item.image_2 ? { uri: "https://app-api.demo-customwebsites.com/" + item.image_2 } : require('../../assets/images/images.jpg'),
        },
        {
          image: item.image_3 ? { uri: "https://app-api.demo-customwebsites.com/" + item.image_3 } : require('../../assets/images/images.jpg'),
        },
      ];
      
      
    const onPressHandler = disablePress
        ? undefined // Set to undefined to disable onPress
        : viewRequest
            ? () => navigation.navigate('ReceiverRequest', { itemId: item.id })
            : () => navigation.navigate('FundraiserDetails', { itemId: item.id });

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

    const dateObject = new Date(item.created_at);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View>

            <Pressable style={[
                styles.cardItem,
                searchView ?
                    (showOrganiserInfo ? { height: 100, margin: 5 } : { height: 105, margin: 5, }) :

                    (imageView ? (profileView ? { marginTop: 10, marginRight: 10 } : { margin: 10 }) : null)

            ]}
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
                        ]} source={item.image_1 ? { uri: "https://app-api.demo-customwebsites.com/" + item.image_1 } : require('../../assets/images/images.jpg')}
                        >
                            {searchView ? null : <View style={styles.textBackground}>
                                <Text style={styles.cardItemName(COLORS.white, 0, SIZES.medium - 1,)}>{item?.category}</Text>
                            </View>}
                        </ImageBackground>
                        )
                        :
                        // <View>
                        //     <ScrollView
                        //         horizontal
                        //         pagingEnabled
                        //         showsHorizontalScrollIndicator={false}
                        //         onScroll={handleScroll}
                        //         scrollEventThrottle={0}
                        //         snapToInterval={Screen_width}
                        //         snapToAlignment='center'
                        //         decelerationRate={'fast'}
                        //     >
                        //         <View style={{ width: Screen_width, justifyContent: 'center', alignItems: 'center' }}>
                        //             <Image
                        //                 style={styles.imageGallery(Screen_width - 140)}
                        //                 source={item.image_1 ? { uri: "https://app-api.demo-customwebsites.com/" + item.image_1 } : require('../../assets/images/images.jpg')}
                        //             />
                        //             <View style={styles.imageText}>
                        //                 <Ionicons name="camera-outline" size={17} color={COLORS.white} />
                        //                 <Text style={{ paddingLeft: 5, }}>{`${currentIndex + 1}/${data ? data.length : 0}`}</Text>

                        //             </View>
                        //         </View>
                        //         <View style={{ width: Screen_width, justifyContent: 'center', alignItems: 'center' }}>
                        //             <Image
                        //                 style={styles.imageGallery(Screen_width - 140)}
                        //                 source={item.image_2 ? { uri: "https://app-api.demo-customwebsites.com/" + item.image_2 } : require('../../assets/images/images.jpg')}
                        //             />
                        //             <View style={styles.imageText}>
                        //                 <Ionicons name="camera-outline" size={17} color={COLORS.white} />
                        //                 <Text style={{ paddingLeft: 5, }}>{`${currentIndex + 1}/${data ? data.length : 0}`}</Text>

                        //             </View>
                        //         </View>
                        //         <View style={{ width: Screen_width, justifyContent: 'center', alignItems: 'center' }}>
                        //             <Image
                        //                 style={styles.imageGallery(Screen_width - 140)}
                        //                 source={item.image_3 ? { uri: "https://app-api.demo-customwebsites.com/" + item.image_3 } : require('../../assets/images/images.jpg')}
                        //             />
                        //             <View style={styles.imageText}>
                        //                 <Ionicons name="camera-outline" size={17} color={COLORS.white} />
                        //                 <Text style={{ paddingLeft: 5, }}>{`${currentIndex + 1}/${data ? data.length : 0}`}</Text>

                        //             </View>
                        //         </View>
                        //     </ScrollView>
                        // </View>

                        <View>
                        <ScrollView
                          horizontal
                          pagingEnabled
                          showsHorizontalScrollIndicator={false}
                          onScroll={handleScroll}
                          scrollEventThrottle={0}
                          snapToInterval={Screen_width}
                          snapToAlignment='center'
                          decelerationRate={'fast'}
                        >
                          {imagedata.map((item, index) => (
                            <View key={index} style={{ width: Screen_width, justifyContent: 'center', alignItems: 'center' }}>
                              <Image
                                style={styles.imageGallery(Screen_width - 140)}
                                source={item.image}
                              />
                              <View style={styles.imageText}>
                                <Ionicons name="camera-outline" size={17} color={COLORS.white} />
                                <Text style={{ paddingLeft: 5 }}>{`${index + 1}/${imagedata.length}`}</Text>
                              </View>
                            </View>
                          ))}
                        </ScrollView>
                      </View>

                    }




                    <View

                        style={[searchView ? (showOrganiserInfo ? styles.cardImageWithOrganiserInfo : { width: 110, height: 120 }) : {
                            width: savedView ? "100%" : 230,
                            height: 105
                        }, styles.cardDetails]}
                    >
                        {viewRequest ?
                            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, padding: 10, backgroundColor: 'red' }} activeOpacity={0.7}>
                                <MaterialCommunityIcons
                                    name='dots-vertical'
                                    size={22}
                                    color={COLORS.primary}
                                />
                            </TouchableOpacity>
                            : null
                        }

                        <Modal isVisible={isModalVisible} style={styles.modal} onBackdropPress={toggleModal}>
                            <View style={styles.modalContainer}>
                                <TouchableOpacity style={styles.modalButton}>
                                    <Text style={styles.textStyle}>Mark as donated</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={styles.modalButton} >
                                    <Text style={styles.textStyle}>Deactivate</Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>


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
                                            (<Text style={styles.greyText}>{dateObject.toLocaleDateString('en-GB')}</Text>)
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
        </View>
    );
};

export default CardItem;
