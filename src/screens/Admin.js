import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/Colors';
import SIZES from '../../constants/Sizes';
import Fonts from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';

const Admin = () => {
    const navigation = useNavigation();

    const boxes = [
        { id: 1, color: '#e4fcca', icon: require('../../assets/images/category.png'), label: 'Categories', count: 6 },
        { id: 2, color: '#f7dcdf', icon: require('../../assets/images/bullet-list.png'), label: 'Items', count: 10 },
        { id: 3, color: '#fae3ac', icon: require('../../assets/images/group.png'), label: 'Users', count: 20 },
        // Add more boxes as needed
      ];
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

            <View>
                <Text style={styles.welcomeTxt(COLORS.black, SIZES.medium, SIZES.large - 5, Fonts.medium)}>
                    {" "}
                    Welcome Back
                </Text>

                <Text style={styles.welcomeTxt(COLORS.primary, 0, SIZES.xLarge - 2, Fonts.bold)}>
                    {" "}
                    Laiba Kanwal!
                </Text>

            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: SIZES.small }}>
        <View style={styles.container}>
          {/* Map over the boxes array to render each box dynamically */}
          {boxes.map((box) => (
            <View key={box.id} >
              <View style={styles.boxStyle(box.color)}>
                <Pressable
                  style={{
                    margin: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      backgroundColor: COLORS.white,
                      borderRadius: 35,
                      padding: 32,
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={box.icon} />
                  </View>
                  <Text
                    style={{
                      fontSize: SIZES.medium,
                      fontFamily: Fonts.bold,
                      marginTop: 5,
                      color: COLORS.black,
                    }}
                  >
                    {box.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: SIZES.medium,
                      fontFamily: Fonts.bold,
                      marginTop: 5,
                      color: COLORS.black,
                    }}
                  >
                    {box.count}
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    welcomeTxt: (color, top, size, family) => ({
        fontFamily: family,
        fontSize: size,
        marginTop: top,
        color: color,
        marginHorizontal: SIZES.small
    }),
    boxStyle: (color) => ({
        width: '50%',
        height: 150,
        borderRadius: 25,
        backgroundColor: color
    }),
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16, // Adjust the margin as needed
    },
});
export default Admin;
