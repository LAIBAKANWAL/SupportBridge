import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import COLORS from '../../../constants/Colors';
import { Image } from 'react-native-animatable';
import Fonts from '../../../constants/Fonts';

const CreditCard = ({ type, holder, cvc, number, expiryYear, expiryMonth }) => {
    return (
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <View style={styles.microship}>
                    <MaterialCommunityIcons name="integrated-circuit-chip" size={50} color='#eaebec' />
                </View>
                <View style={styles.cardType}>
                    <Image source={require('../../../assets/images/mastercard.png')}
                        style={styles.image}
                    />
                </View>
            </View>
            <View style={styles.cardCenter}>
                <Text style={styles.cardNumber}>5444</Text>
                <Text style={styles.cardNumber}>4444</Text>
                <Text style={styles.cardNumber}>5555</Text>
                <Text style={styles.cardNumber}>5555</Text>

            </View>
            <View style={styles.cardFooter}>
                <View style={styles.cardHolder}>
                    <Text style={styles.textMedium}>Laiba Kanwal</Text>
                </View>
                <View style={styles.cardExpiry}>
                    <Text style={styles.textMedium}>12/27</Text>
                </View>
            </View>
        </View>
    )
}

export default CreditCard;

const styles = StyleSheet.create({
    container: {
        width: "95%",
        marginHorizontal: 20,
        height: 200,
        // flex:0.9,
        backgroundColor: '#a6a8aa',
        borderRadius: 20,
        alignSelf: 'center'
    },
    cardHeader: {
        flex: 1,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    image: {
        width: 50,
        height: 50
    },
    cardCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: "80%",
    },
    cardNumber: {
        flex: 1,
        textAlign: 'center',
        fontFamily: Fonts.bold,
        color: COLORS.white,
        fontSize: 20,

    },
    cardFooter: {
        flex: 1,
       flexDirection:'row',
       justifyContent:"space-between",
paddingHorizontal:10,
alignItems:'center'
    },
    cardHolder:{

    },
    textMedium:{
color:COLORS.white,
fontFamily:Fonts.bold,
fontSize:15,
textTransform:"uppercase"
    }
})