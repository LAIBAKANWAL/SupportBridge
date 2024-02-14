import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import { useRoute } from '@react-navigation/native';
import CardItem from '../components/CardItem';
import SIZES from '../../constants/Sizes';
import COLORS from '../../constants/Colors';
import Header from '../components/Header';
import styles from '../components/carditem.style';
import InputField from '../components/textinput/InputField';
import { moneyIcon } from '../components/Data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';
import Fonts from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import Checkbox from '../components/checkbox/Checkbox';

const DonationScreen = ({ route }) => {

    const navigation = useNavigation();
    // const route = useRoute();
    const { selectedCard } = route.params;
    const [donationAmount, setDonationAmount] = useState('');
    const [selectedBox, setSelectedBox] = useState(null);
    const [selectedFrequency, setSelectedFrequency] = useState(null);

    const handleBoxPress = (amount,frequency) => {
      if (amount !== '') {
        setDonationAmount(amount.toString());
        setSelectedBox(amount);
    }

        setSelectedFrequency((prevFrequency) => (prevFrequency === frequency ? null : frequency));
    };

    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: SIZES.small - 3 }}>
            <Header
                title='Donation details'
                showBackButton
            />

            <View style={{ marginHorizontal: SIZES.xSmall - 6 }}>
                {/* <Text style={{fontSize:23,color:"black"}}>{`Donate to ${selectedCard.name}`}</Text> */}
                <Text style={[styles.cardItemName(COLORS.black, SIZES.medium, SIZES.large - 2), { marginBottom: 10, marginLeft: 6 }]}>Send donation to</Text>

                <CardItem
                    item={selectedCard}
                    showHeartIcon={false}
                    disablePress={true}
                    searchView={true}
                    showOrganiserInfo={true}
                    showSavedIcon={false}
                    showDonationInfo={false}
                />

            </View>

            <View style={{ marginHorizontal: SIZES.xSmall - 2 }} >

                <Text style={[styles.cardItemName(COLORS.black, SIZES.xSmall, SIZES.large - 2), { marginLeft: 6, marginBottom: 15, }]}>Choose amount</Text>

                <InputField
                    placeholder="Enter the amount manually"
                    value={donationAmount}
                    onChange={setDonationAmount}
                    keyboardType="numeric"
                    isPassword={false}
                    fontsize={17}
                    iconComponent={<Image
                        style={{ width: 20, height: 18, resizeMode: "contain", tintColor: COLORS.grey }}
                        source={moneyIcon.priceIcon}
                    />}
                />

                <View style={{ flexDirection: 'row', marginTop: 10, }}>

                    {/* Box 1 */}
                    <TouchableWithoutFeedback
                        onPress={() => handleBoxPress(10)}
                    >
                        <View style={[styles.priceBox(15), { borderColor: selectedBox === 10 ? COLORS.primary : COLORS.grey }]}>
                            <Text style={styles.priceBoxText}>Rs10</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Box 2 */}
                    <TouchableWithoutFeedback
                        onPress={() => handleBoxPress(20)}
                    >
                        <View style={[styles.priceBox(15), { borderColor: selectedBox === 20 ? COLORS.primary : COLORS.grey }]}>
                            <Text style={styles.priceBoxText}>Rs20</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Box 3 */}
                    <TouchableWithoutFeedback
                        onPress={() => handleBoxPress(50)}
                    >
                        <View style={[styles.priceBox(0), { borderColor: selectedBox === 50 ? COLORS.primary : COLORS.grey }]}>
                            <Text style={styles.priceBoxText}>Rs50</Text>
                        </View>
                    </TouchableWithoutFeedback>


                </View>

                <Text style={[styles.cardItemName(COLORS.black, SIZES.xSmall, SIZES.large - 2), { marginLeft: 6, marginTop: 20, }]}> Frequency</Text>

                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <TouchableWithoutFeedback
                    onPress={() => handleBoxPress('', 'One time')}
                    >
                        <View style={[styles.priceBox(15), { borderColor: selectedFrequency === 'One time' ? COLORS.primary : COLORS.grey }]}>
                            <Text style={styles.priceBoxText}>One time</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                    onPress={() => handleBoxPress('', 'Monthly')}
                    >
                        <View style={[styles.priceBox(0), { borderColor: selectedFrequency === 'Monthly' ? COLORS.primary : COLORS.grey }]}>
                            <Text style={styles.priceBoxText}>Monthly</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{
                            marginTop: 15,
                        }}>
                    <Checkbox
                        label="Donate anonymously"
                    />
                </View>


                    <Button
                        onPress={() => navigation.navigate("Payment")}

                        title="Proceed to Payment"
                        filled={true}
                        width='100%'
                        style={{
                            marginTop: 15,
                            // marginBottom: 10,
                        }}
                    />
    
            </View>


        </SafeAreaView>
    );
};

export default DonationScreen;
