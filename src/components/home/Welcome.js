import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import styles from './welcome.style'
import COLORS from '../../../constants/Colors';
import SIZES from '../../../constants/Sizes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../../constants/Fonts';

const Welcome = () => {
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.welcomeTxt(COLORS.black, SIZES.small, SIZES.xLarge - 2, Fonts.bold)}>
                    {" "}
                    Hello
                    {" "}
                    <Text style={{ color: COLORS.primary }}>Laiba!</Text>
                </Text>
                <Text style={styles.welcomeTxt(COLORS.grey, SIZES.xSmall - 2, SIZES.large - 5, Fonts.medium)}>
                    {" "}
                    What for do you want to donate today?
                </Text>
            </View>

            <View style={styles.searchContainer}>
                <TouchableOpacity>
                    <Ionicons name="search-outline" size={24} style={styles.searchIcon} />
                </TouchableOpacity>

                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value=''
                        placeholderTextColor={"grey"}
                        onPressIn={() => navigation.navigate('Search')}
                        placeholder='Search campaign'
                    />
                </View>
                <View style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, height: 35, marginTop: 5 }}></View>
                <View>
                    <TouchableOpacity style={styles.voiceSearch}>
                        <Ionicons name="mic-outline" size={24} color={COLORS.grey} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Welcome;