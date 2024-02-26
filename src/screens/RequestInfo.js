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

export default function RequestInfo({ route }) {
    const navigation = useNavigation();
    const [alldata, setalldata] = useState([]);
    const { itemId } = route.params;
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [postalCode, setPostalCode] = useState();
    const [status, setStatus] = useState();
    const [salarySlip, setSalarySlip] = useState(null);
    const [bill, setBill] = useState(null);
    const [familyMembers, setFamilyMembers] = useState();
    const [education, setEducation] = useState();
    const [currentProfession, setCurrentProfession] = useState();
    const [description, setDescription] = useState();
    const [disability, setDisability] = useState(false);


    useEffect(() => {
        if (itemId) {
            getdata(itemId)
        }
        if (alldata) {
            if (alldata.full_name) {
                setName(alldata.full_name);
            }
            if (alldata.address) {
                setAddress(alldata.address);
            }
            if (alldata.postal_code) {
                setPostalCode(alldata.postal_code);
            }
            if (alldata.status) {
                setStatus(alldata.status);
            }
            if (alldata.family_member) {
                setFamilyMembers(alldata.family_member);
            }
            if (alldata.education) {
                setEducation(alldata.education);
            }
            if (alldata.profession) {
                setCurrentProfession(alldata.profession);
            }
            if (alldata.description) {
                setDescription(alldata.description);
            }
            if (alldata.disability) {
                setDisability(alldata.disability);
            }
            if (alldata.salary_slip) {
                setSalarySlip("https://app-api.demo-customwebsites.com/" + alldata.salary_slip);
            }
            if (alldata.bill) {
                setBill("https://app-api.demo-customwebsites.com/" + alldata.bill);
            }
        }
    }, [itemId,alldata]);

    const getdata = async (id) => {
        try {
            const response = await axios.get(`https://app-api.demo-customwebsites.com/api/detail-user-request/${id}`);

            console.log('get fund request Successfully:', response.data);
            setalldata(response.data.data);
            console.log('databchc', response.data.data.full_name)
        }
        catch (error) {

            console.error('Error get fund request:', error.response.data);

        }
    };

  
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
                            <InputField value={name} editable={false}/>
                     

                    <Label text="Address" />
                    <InputField
                       value={address} editable={false}
                    />

                    <Label text="Postal Code" />
                    <InputField
                       value={postalCode} editable={false}
                    />

                    <Label text="Status" />
                    <InputField
                       value={status} editable={false}
                    />

                    <Label text="Family members" />
                    <InputField
                        value={familyMembers} editable={false}
                    />

                    <Label text="Education" />
                     <InputField
                        value={education} editable={false}
                    />

                    <Label text="Current Profession" />
                    <InputField
                        value={currentProfession} editable={false}
                    />

                    <Label text="Description" />
                    <InputField
                        value={description} editable={false}
                    />

                    <Label text="Upload Salary Slip" />
                    <Image
                        source={{uri: salarySlip}}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 5,
                            marginBottom: 15,
                        }} />

                    <Label text="Upload Bill" />
                    <Image
                        source={{uri: bill}}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 5,
                            marginBottom: 15,
                        }} />
                
                   
                    <Label text="Any disability" />
                    <InputField
                        value={disability} editable={false}
                    />

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





