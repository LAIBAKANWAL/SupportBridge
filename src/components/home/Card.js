import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Pressable, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../../constants/Colors';
import SIZES from '../../../constants/Sizes';
import Fonts from '../../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import CardItem from '../CardItem';
import styles from '../carditem.style';
// import {list} from '../components/Data'

const Card = ({ horizontal, titleText, seeAllText, hideContainer, showHeartIcon, list, searchView, disablePress, showOrganiserInfo, showSavedIcon, showDonationInfo, savedView, imageView, profileView }) => {
    const navigation = useNavigation();

    return (

        <View style={styles.cardContainer}>
            {hideContainer ? null : (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.cardTitle}>{titleText}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("AllCategories", { categoryName: titleText})} style={styles.seeAllButton}>
                
                            <Text style={styles.seeAllText}>{seeAllText}</Text>
                            <Ionicons name="arrow-forward-outline" size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                </View>
            )}

            <FlatList
                data={list}
                renderItem={({ item }) => (

                    <CardItem
                        item={item}
                        showHeartIcon={showHeartIcon}
                        // navigation={navigation}
                        disablePress={disablePress}
                        searchView={searchView}
                        showOrganiserInfo={showOrganiserInfo}
                        showSavedIcon={showSavedIcon}
                        showDonationInfo={showDonationInfo}
                        savedView={savedView}
                        imageView={imageView}
                        profileView={profileView}
                        titleText={titleText}
                        seeAllText={seeAllText}
                        hideContainer={hideContainer}
                        hide={true}
                    />
                )}
                keyExtractor={(item) => item.id}
                horizontal={horizontal}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default Card;
