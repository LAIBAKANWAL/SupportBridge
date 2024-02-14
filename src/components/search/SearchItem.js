import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../../constants/Colors';
import SIZES from '../../../constants/Sizes';
import Fonts from '../../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { list } from '../Data';


// const renderItem = ({ item, savedItems, handleSavePress, navigation }) => {
//     return (
//         <Pressable style={styles.cardItem}onPress={() => navigation.navigate('FundraiserDetails', { cardId: item.id, cardList: list })}>

//             <View style={{ flexDirection: 'row' }}>
//             {showSavedIcon && (
//                 <View style={styles.savedIconBackground}>
//                     <Ionicons
//                         name={savedItems.includes(item.id) ? "heart" : "heart-outline"}
//                         size={20}
//                         color={savedItems.includes(item.id) ? COLORS.primary : COLORS.primary}
//                         onPress={() => handleSavePress(item.id)}
//                     />
//                 </View>
//             )}
//                 <Image style={styles.cardImage} source={item.image} />
//                 <View style={styles.cardDetails}>
//                     <Text style={styles.cardItemName} numberOfLines={1} ellipsizeMode="tail">{item?.name}</Text>
//                     <Text style={styles.cardDonationText}>
//                         Rs 2,379
//                         <Text style={styles.greyText}> fund raised from Rs 4,200</Text>
//                     </Text>
//                     <View style={styles.progressBarContainer}>
//                         <Progress.Bar progress={0.4} width={200} color={COLORS.primary} borderWidth={0} />
//                     </View>
//                     <View style={styles.cardDonationContainer}>
//                         <Text style={styles.cardDonationText}>
//                             Rs 1,280 <Text style={styles.greyText}>donation</Text>
//                         </Text>
//                         <Text style={styles.cardDonationText}>
//                             <Text style={styles.primaryText}>19{" "}</Text>
//                             <Text style={styles.greyText}>days left</Text>
//                         </Text>
//                     </View>
//                 </View>
//             </View>
//         </Pressable>

//     )
// }

const SearchItem = ({ horizontal, searchText, selectedCategories, showSavedIcon, showDonationInfo,showOrganiserInfo}) => {
    const navigation = useNavigation();
    const [savedItems, setSavedItems] = useState([]);

    const handleSavePress = (itemId) => {
        if (savedItems.includes(itemId)) {
            setSavedItems(savedItems.filter(id => id !== itemId));
        } else {
            setSavedItems([...savedItems, itemId]);
        };
    };

    const renderItem = ({ item, savedItems, handleSavePress, navigation }) => {
        return (
            <Pressable  style={[styles.cardItem,showOrganiserInfo ? styles.cardItemWithOrganiserInfo : null]} 
            onPress={() => navigation.navigate('FundraiserDetails', { cardId: item.id, cardList: list })}>

                <View style={{ flexDirection: 'row' }}>
                    {showSavedIcon && (
                        <View style={styles.savedIconBackground}>
                            <Ionicons
                                name={savedItems.includes(item.id) ? "heart" : "heart-outline"}
                                size={20}
                                color={savedItems.includes(item.id) ? COLORS.primary : COLORS.primary}
                                onPress={() => handleSavePress(item.id)}
                            />
                        </View>
                    )}
                    <Image  style={[styles.cardImage,showOrganiserInfo ? styles.cardImageWithOrganiserInfo : null,]} source={item.image} />
                    
                    <View style={styles.cardDetails}>
                        <Text style={styles.cardItemName} numberOfLines={1} ellipsizeMode="tail">{item?.name}</Text>
                        {showDonationInfo && (
                            <>
                                <Text style={styles.cardDonationText(SIZES.small)}>
                                    Rs 2,379
                                    <Text style={styles.greyText}> fund raised from Rs 4,200</Text>
                                </Text>
                                <View style={styles.progressBarContainer}>
                                    <Progress.Bar progress={0.4} width={200} color={COLORS.primary} borderWidth={0} />
                                </View>
                                <View style={styles.cardDonationContainer}>
                                    <Text style={styles.cardDonationText(SIZES.small)}>
                                        Rs 1,280 <Text style={styles.greyText}>donation</Text>
                                    </Text>
                                    <Text style={styles.cardDonationText(SIZES.small)}>
                                        <Text style={styles.primaryText}>19{" "}</Text>
                                        <Text style={styles.greyText}>days left</Text>
                                    </Text>
                                </View>
                            </>
                        )}

{showOrganiserInfo && (
                        <Text style={styles.cardDonationText(SIZES.medium -2)}>
                            Organiser:
                            <Text style={styles.greyText}> Healthy Home</Text>
                        </Text>
    )}
                    </View>
                </View>
            </Pressable>

        )
    }

    // ?
    // const filteredList = searchText
    //     ? list.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
    //     : list;

    // Function to filter items based on search text and selected categories
    //   const filteredList = list.filter((item) => {
    //     // Replace this condition with your actual category filtering logic
    //     return selectedCategories.includes(item.category);
    //   });

    // ?

    //       // Filter items based on search text and selected category
    const filteredList = list.filter(item =>
        (searchText ? item.name.toLowerCase().includes(searchText.toLowerCase()) : true) &&
        (selectedCategories ? item.category === selectedCategories : true)
    );


    return (

        <View style={styles.cardContainer}>

            <FlatList
                data={filteredList}
                // renderItem={({ item }) => {
                //     if (searchText === '') {
                //         return (
                //             <Pressable style={styles.cardItem} onPress={() => navigation.navigate("Signup")}>

                //                 <View style={{ flexDirection: 'row' }}>
                //                     <View style={styles.savedIconBackground}>
                //                         <Ionicons
                //                             name={savedItems.includes(item.id) ? "heart" : "heart-outline"}
                //                             size={20}
                //                             color={savedItems.includes(item.id) ? COLORS.primary : COLORS.primary}
                //                             onPress={() => handleSavePress(item.id)}
                //                         />
                //                     </View>
                //                     <Image style={styles.cardImage} source={item.image} />
                //                     <View style={styles.cardDetails}>
                //                         <Text style={styles.cardItemName} numberOfLines={1} ellipsizeMode="tail">{item?.name}</Text>
                //                         <Text style={styles.cardDonationText}>
                //                             Rs 2,379
                //                             <Text style={styles.greyText}>fund raised from Rs 4,200</Text>
                //                         </Text>
                //                         <View style={styles.progressBarContainer}>
                //                             <Progress.Bar progress={0.4} width={200} color={COLORS.primary} borderWidth={0} />
                //                         </View>
                //                         <View style={styles.cardDonationContainer}>
                //                             <Text style={styles.cardDonationText}>
                //                                 Rs 1,280 <Text style={styles.greyText}>donation</Text>
                //                             </Text>
                //                             <Text style={styles.cardDonationText}>
                //                                 <Text style={styles.primaryText}>19{" "}</Text>
                //                                 <Text style={styles.greyText}>days left</Text>
                //                             </Text>
                //                         </View>
                //                     </View>
                //                 </View>
                //             </Pressable>
                //         )
                //     }
                //     if(item.name.toLowerCase().includes(searchText.toLowerCase())){
                //         return (
                //             <Pressable style={styles.cardItem} onPress={() => navigation.navigate("Signup")}>

                //                 <View style={{ flexDirection: 'row' }}>
                //                     <View style={styles.savedIconBackground}>
                //                         <Ionicons
                //                             name={savedItems.includes(item.id) ? "heart" : "heart-outline"}
                //                             size={20}
                //                             color={savedItems.includes(item.id) ? COLORS.primary : COLORS.primary}
                //                             onPress={() => handleSavePress(item.id)}
                //                         />
                //                     </View>
                //                     <Image style={styles.cardImage} source={item.image} />
                //                     <View style={styles.cardDetails}>
                //                         <Text style={styles.cardItemName} numberOfLines={1} ellipsizeMode="tail">{item?.name}</Text>
                //                         <Text style={styles.cardDonationText}>
                //                             Rs 2,379
                //                             <Text style={styles.greyText}>fund raised from Rs 4,200</Text>
                //                         </Text>
                //                         <View style={styles.progressBarContainer}>
                //                             <Progress.Bar progress={0.4} width={200} color={COLORS.primary} borderWidth={0} />
                //                         </View>
                //                         <View style={styles.cardDonationContainer}>
                //                             <Text style={styles.cardDonationText}>
                //                                 Rs 1,280 <Text style={styles.greyText}>donation</Text>
                //                             </Text>
                //                             <Text style={styles.cardDonationText}>
                //                                 <Text style={styles.primaryText}>19{" "}</Text>
                //                                 <Text style={styles.greyText}>days left</Text>
                //                             </Text>
                //                         </View>
                //                     </View>
                //                 </View>
                //             </Pressable>
                //         )
                //     }
                // }}
                renderItem={({ item }) => renderItem({ item, savedItems, handleSavePress, navigation })}
                keyExtractor={(item) => item.id}
                horizontal={horizontal}
                showsHorizontalScrollIndicator={false}
            />

        </View>

    );
};

export default SearchItem;


const styles = StyleSheet.create({
    cardContainer: {
        // marginHorizontal: SIZES.small,
        // height:height,
        // overflow:"hidden",
        paddingBottom: 160
    },
    cardItem: {
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        height: 120,
        overflow: "hidden",

    },
    savedIconBackground: {
        position: 'absolute',
        top: 5,
        left: 75,
        backgroundColor: COLORS.white,
        borderRadius: 50,
        padding: 3,
        zIndex: 1,
    },
    cardImage: {
        width: 110, // Set the width of the image
        height: 120,
    },
    cardDetails: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.small,
        // height: 130,
    },
    cardItemWithOrganiserInfo: {
        height: 100, 
    },
    cardImageWithOrganiserInfo: {
        height: 100, 
    },
    cardItemName: {
        fontSize: SIZES.medium - 1,
        fontFamily: Fonts.bold,
        marginTop: 5,
        color: COLORS.black,
    },
    cardDonationText: (size)=> ({
        fontFamily: Fonts.medium,
        fontSize: size,
        marginTop: SIZES.small - 2,
        color: COLORS.primary,
    }),
    cardDonationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    greyText: {
        color: COLORS.grey,
    },
    primaryText: {
        color: COLORS.primary,
    },
    progressBarContainer: {
        width: "100%",
        backgroundColor: COLORS.lightGray,
        borderRadius: 4,
        marginTop: SIZES.small - 2,
    },
});
