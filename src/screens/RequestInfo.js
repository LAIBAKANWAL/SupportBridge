import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, SafeAreaView, ScrollView, Pressable, Platform, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import COLORS from '../../constants/Colors';
import Header from '../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SIZES from '../../constants/Sizes';
import InputField from '../components/textinput/InputField';
import Button from '../components/Button';
import DropdownField from '../components/textinput/DropdownField';
import Label from '../components/Label';
import DocumentPicker from 'react-native-document-picker';
import Checkbox from '../components/checkbox/Checkbox';
import { useNavigation } from '@react-navigation/native';
import styles from './create.style';
import axios from 'axios';

export default function RequestInfo({route}) {
    const navigation = useNavigation();
    const [alldata, setalldata] = useState([]);
    const { itemId } = route.params;

    useEffect(() => {
        getdata(itemId);
    }, [itemId]);

    const getdata = async (id) => {
        try {
            const response = await axios.get(`https://app-api.demo-customwebsites.com/api/detail-user-request/2`);

            console.log('get fund request Successfully:', response.data);
            setalldata(response.data.data);
            console.log('databchc',response.data.data.name)
        }
        catch (error) {
     
            console.error('Error get fund request:', error.response.data);

        }
    };

    console.log(alldata.name)

    const [inputs, setInputs] = useState({
        fullname: "",
        address: "",
        postalCode: "",
        status: "",
        familyMembers: "",
        education: "",
        currentProfession: "",
        salarySlip: "",
        bill: "",
        description: "",
        disability: ""
    });
    return (

        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ marginHorizontal: SIZES.small - 6 }}>
                 <Header
                    title="View Receiver Details"
                    showBackButton
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: SIZES.xLarge - 2 }} >

                <View style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, marginTop: 20, }}></View>
                <View style={{ flex: 1, marginHorizontal: 10 }} >
                    <View>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            marginVertical: 20,
                            color: COLORS.black,
                            // textAlign: "center"
                        }}>
                            Receiver Form Details
                        </Text>
                    </View>

                    <Label text="Full Name" />
                    <InputField
                        // value={alldata.name}
                        value={'bcxmvb,m'}
                    />

                    <Label text="Address" />
                    <InputField
                        value={alldata.address}
                    />

                    <Label text="Postal Code" />
                    <InputField
                        value={inputs.postalCode}
                    />

                    <Label text="Status" />
                    <DropdownField
                        initialValue={inputs.status}
                    />

                    <Label text="Family members" />
                    <InputField
                        value={inputs.familyMembers}
                    />

                    <Label text="Education" />
                    <DropdownField
                        initialValue={inputs.education}
                    />

                    <Label text="Current Profession" />
                    <InputField
                        value={inputs.currentProfession}
                    />

                    <Label text="Description" />
                    <InputField
                        value={inputs.description}
                    />

                    <Label text="Upload Salary Slip" />

                    <Image
                        // source={{ uri: inputs.salarySlip }} 
                        source={require('../../assets/images/education.png')}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 5,
                            marginBottom: 15,
                        }} />

                    {/* <View style={styles.inputContainer}>

                        <TouchableOpacity style={styles.inputBox} onPress={() => selectDoc(setSalarySlip)}>
                            <Text style={{ color: COLORS.black, lineHeight: 20, marginRight: 17 }}>
                                {salarySlip.length > 0
                                    ? salarySlip.map((doc) => doc.name).join(', ')
                                    : 'Select image'}
                            </Text>

                            <View style={{
                                position: 'absolute',
                                right: 12,
                            }}>
                                {<MaterialCommunityIcons name="cloud-upload-outline" size={24} color={COLORS.grey} />}
                            </View>
                        </TouchableOpacity>

                    </View> */}

                    <Label text="Upload Bill" />
                    <Image
                        // source={{ uri: inputs.bill }} 
                        source={require('../../assets/images/education.png')}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 5,
                            marginBottom: 15,
                        }} />
                    {/* <View style={styles.inputContainer}>

                        <TouchableOpacity style={styles.inputBox} onPress={() => selectDoc(setBill)}>
                            <Text style={{ color: COLORS.black, lineHeight: 20, marginRight: 17 }}>
                                {bill.length > 0
                                    ? bill.map((doc) => doc.name).join(', ')
                                    : 'Select image'}
                            </Text>

                            <View style={{
                                position: 'absolute',
                                right: 12,
                            }}>
                                {<MaterialCommunityIcons name="cloud-upload-outline" size={24} color={COLORS.grey} />}
                            </View>
                        </TouchableOpacity>

                    </View> */}

                    <Checkbox
                        label="Any disability"
                    />
                    <Text>Any disability {inputs.disability}</Text>


                </View>

                <View style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, marginTop: 20, }}></View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, marginBottom: 20 }}>
                    <Button
                        // onPress={validate}
                        title="Approved"
                        filled={true}
                        width='45%'
                        style={{
                            marginTop: 18,
                            marginBottom: 20
                        }}
                    />

                    <Button
                        // onPress={validate}
                        title="Rejected"
                        filled={false}
                        width='45%'
                        style={{
                            marginTop: 18,
                            marginBottom: 20
                        }}
                    />
                </View>
            </ScrollView>



        </SafeAreaView>

    );
}





