import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import COLORS from '../../constants/Colors';
import SIZES from '../../constants/Sizes';
import Fonts from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { categories } from '../components/Data';

const CategoryList = () => {
    const navigation = useNavigation();

    return (

        <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
            <View style={{ marginHorizontal: SIZES.small - 3 }}>
                <Header
                    title="All categories"
                    showBackButton
                />
            </View>

            <ScrollView>

                <View style={{
                    marginTop: SIZES.xSmall - 3,
                    marginBottom: SIZES.xSmall - 3,
                    backgroundColor: COLORS.lightGray,
                }}>
                    <Text style={{
                        fontSize: SIZES.medium,
                        fontFamily: Fonts.bold,
                        color: COLORS.black,
                        marginLeft: SIZES.medium,
                        padding: 10
                    }}>Popular</Text>
                </View>

                <View style={{ marginHorizontal: SIZES.small - 3 }}>
                    {categories.map((category, index, array) => (
                        <TouchableOpacity key={category.name} style={styles.setting(index, array.length)}
                            onPress={() => navigation.navigate("AllCategories", { categoryName: category.name })}
                            activeOpacity={0.6}
                        >
                            <View style={{ width: 60, height: 60, backgroundColor: category.backgroundColor, borderRadius: 35, padding: 32, alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={{ width: 40, height: 40, resizeMode: "contain" }}
                                    source={category.image}
                                />
                            </View>
                            <Text style={styles.settingTitle}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{
                    marginTop: SIZES.xSmall - 3,
                    marginBottom: SIZES.xSmall - 3,
                    backgroundColor: COLORS.lightGray,
                }}>
                    <Text style={{
                        fontSize: SIZES.medium,
                        fontFamily: Fonts.bold,
                        color: COLORS.black,
                        marginLeft: SIZES.medium,
                        padding: 10
                    }}>Other</Text>
                </View>

                <View style={{ marginHorizontal: SIZES.small - 3 }}>
                    <TouchableOpacity style={styles.setting(-1, 0)}
                        onPress={() => navigation.navigate("AllCategories", { categoryName: 'Humaninty' })}
                        activeOpacity={0.6}
                    >
                        <View style={{ width: 60, height: 60, backgroundColor: "#edeaf9", borderRadius: 35, padding: 32, alignItems: "center", justifyContent: "center" }}>
                            <Image
                                style={{ width: 40, height: 40, resizeMode: "contain" }}
                                source={require('../../assets/images/icon1.png')}
                            />
                        </View>
                        <Text style={styles.settingTitle}>Humaninty</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    setting: (index, totalItems) => ({
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        borderBottomWidth: index === totalItems - 1 ? 0 : 1,
        borderBottomColor: '#ccc',
        color: COLORS.black,
    }),
    settingTitle: {
        fontSize: 16,
        color: COLORS.black,
        marginLeft: 10
    },
});

export default CategoryList;
