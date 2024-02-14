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

export default function Create() {

    const [isSubmitModalVisible, setSubmitModalVisible] = useState(false);
    const [isBlurVisible, setBlurVisible] = useState(false);
    const [salarySlip, setSalarySlip] = useState([]);
    const [bill, setBill] = useState([]);
    const navigation = useNavigation();

    const [inputs, setInputs] = useState({
        fullname: "",
        address: "",
        postalCode: "",
        status: "",
        salarySlip: "",
        bill: "",
        familyMembers: "",
        education: "",
        currentProfession: "",
        description: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (inputs.description.length > 200) {
            handleError('Description is too long', 'description');
        }
    }, [inputs.description]);



    const validate = () => {
        Keyboard.dismiss();

        if (!inputs.fullname) {
            handleError('Please enter fullname.', 'fullname');
            valid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(inputs.fullname)) {

            handleError('Invalid fullname. Use alphabets and spaces only.', 'fullname');
            valid = false;
        }


        if (!inputs.address) {
            handleError('Please enter address.', 'address');
            valid = false;
        }


        if (!inputs.postalCode) {
            handleError('Please enter postal code', 'postalCode');
            valid = false;
        } else if (!/^[0-9]{5}$/.test(inputs.postalCode)) {

            handleError('Invalid postalCode', 'postalCode');
            valid = false;
        }

        // category validation
        if (!inputs.status) {
            handleError("Please select status", 'status');
            valid = false;
        } else {
            setErrors(prevState => ({ ...prevState, status: null }));
        }


        if (!inputs.salarySlip) {
            handleError("Please select slip", 'salarySlip');
            valid = false;
        }

        if (!inputs.bill) {
            handleError("Upload any latest bill", 'bill');
            valid = false;
        }

        if (!inputs.familyMembers) {
            handleError('Please mention numbers', 'familyMembers');
            valid = false;
        }

        if (!inputs.education) {
            handleError("Please select education", 'education');
            valid = false;
        } else {
            setErrors(prevState => ({ ...prevState, education: null }));
        }

        if (!inputs.currentProfession) {
            handleError('Please enter profession.', 'currentProfession');
            valid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(inputs.currentProfession)) {

            handleError('Invalid Profession. Use alphabets and spaces only.', 'currentProfession');
            valid = false;
        }

        // description validation
        if (!inputs.description) {
            handleError('Please enter description.', 'description');
            valid = false;
        }

        if (valid) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                openModal();
            }, 3000)
        }
    };

    const submit = () => {
        console.log('Submit function called');
        // closeModal(); // Close the submit modal
        navigation.navigate("Home"); // Navigate to the Home screen
    }


    const handleEduCategoryChange = (value) => {
        setInputs(prevState => ({ ...prevState, status: value }));
        setErrors(prevState => ({ ...prevState, status: null }));
    };

    const handlestatusCategoryChange = (value) => {
        setInputs(prevState => ({ ...prevState, education: value }));
        setErrors(prevState => ({ ...prevState, education: null }));
    };

    const selectDoc = async (setState) => {
        try {
            const doc = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                // allowMultiSelection: true
            });
            // console.log(doc)

            // Update the state with the selected documents
            setState(doc);
        } catch (err) {
            if (DocumentPicker.isCancel(err))
                // console.warn("User cancelled the upload", err);
                Alert.alert('Please select at least one document !');
            else
                console.log(err)
        }
    }

    const openModal = () => {
        setSubmitModalVisible(true);
        setBlurVisible(true);
    };

    const closeModal = () => {
        setSubmitModalVisible(false);
    };


    const eduCategories = [
        { label: 'inter', value: 'category1' },
        { label: 'Matric', value: 'category2' },
        { label: 'Under Matric', value: 'category3' },
        { label: 'Illiterate', value: 'category4' },
    ];

    const statusOptions = [
        { label: 'Single', value: 'category1' },
        { label: 'Married', value: 'category2' },
        { label: 'divorce', value: 'category3' },
        { label: 'widow', value: 'category4' },
    ];

    return (

        <SafeAreaView
            style={{ flex: 1, marginHorizontal: SIZES.small - 3 }}
        >
            <Header
                title="Receiver Details"
                showBackButton
            />
            <ScrollView >

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
                            Donar Form Details
                        </Text>
                    </View>

                    <Label text="Full Name" icon iconPosition={72} />
                    <InputField
                        placeholder="Full name"
                        keyboardType="default"
                        onChange={text => handleOnChange(text, 'fullname')}
                        error={errors.fullname}
                        onFocus={() => {
                            handleError(null, 'fullname');
                        }}
                    />

                    <Label text="Address" icon iconPosition={58} />
                    <InputField
                        placeholder="Address"
                        keyboardType="default"
                        onChange={text => handleOnChange(text, 'address')}
                        error={errors.address}
                        onFocus={() => {
                            handleError(null, 'address');
                        }}
                    />

                    <Label text="Postal Code" icon iconPosition={84} />
                    <InputField
                        placeholder="Enter code"
                        // value={postalCode}
                        // onChange={setDonationAmount}
                        onChange={text => handleOnChange(text, 'postalCode')}
                        keyboardType="numeric"
                        isPassword={false}
                        error={errors.postalCode}
                        onFocus={() => {
                            handleError(null, 'postalCode');
                        }}
                    />

                    <Label text="Status" icon iconPosition={50} />
                    <DropdownField
                        options={statusOptions}
                        initialValue={inputs.statusOptions}
                        onValueChange={handlestatusCategoryChange}
                        placeholder="Select Status"
                        error={errors.status}
                    />

                    <Label text="Family members" icon iconPosition={120} />
                    <InputField
                        placeholder="Enter Total Numbers of family members"
                        // value={familyMembers}
                        onChange={text => handleOnChange(text, 'familyMembers')}
                        keyboardType="numeric"
                        isPassword={false}
                        error={errors.familyMembers}
                        onFocus={() => {
                            handleError(null, 'familyMembers');
                        }}

                    />

                    <Label text="Education" icon iconPosition={70} />
                    <DropdownField
                        options={eduCategories}
                        initialValue={inputs.eduCategories}
                        onValueChange={handleEduCategoryChange}
                        placeholder="Select Education"
                        error={errors.education}
                    />

                    <Label text="Current Profession" icon iconPosition={132} />
                    <InputField
                        placeholder="Profession"
                        keyboardType="default"
                        onChange={text => handleOnChange(text, 'currentProfession')}
                        error={errors.currentProfession}
                        onFocus={() => {
                            handleError(null, 'currentProfession');
                        }}
                    />

                    <Label text="Description" icon iconPosition={80} />
                    <InputField
                        placeholder="Why you need this item."
                        // value={description}
                        onChange={text => handleOnChange(text, 'description')}
                        isPassword={false}
                        multiline={true}
                        numberOfLines={4}

                    />

                    <Label text="Upload Salary Slip" icon iconPosition={130} />

                    <View style={styles.inputContainer}>

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

                    </View>

                    <Label text="Upload Bill" icon iconPosition={75} />
                    <View style={styles.inputContainer}>

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

                    </View>

                    <Checkbox
                        label="Any disability"
                    />
                    <Checkbox
                        label="By checking this, you agree to the terms & conditions that apply to us."
                    />

                </View>

                <View style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, marginTop: 20, }}></View>


                <Button
                    onPress={validate}
                    title="Create & Submit"
                    filled={true}
                    width='100%'
                    style={{
                        marginTop: 18,
                        marginBottom: 20
                    }}
                />

                <View centeredView>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isSubmitModalVisible}
                        onRequestClose={closeModal}
                        style={styles.modalBox}
                    >
                        <View style={[styles.modalBox, isBlurVisible && styles.blurBackground]}>
                            <View style={styles.modalView}>
                                <View style={{ alignItems: "center" }}>
                                    <Image source={require('../../assets/images/check.png')}
                                        style={{
                                            // marginTop: 20,
                                            marginBottom: 20
                                            // height: 90,
                                            // width: 210,
                                            // position: "absolute",
                                            // top: 10 
                                        }}
                                    />
                                </View>
                                <Text style={styles.boxText(SIZES.xLarge)}>Submit Successful!</Text>
                                <Text style={styles.textStyle}>We are currently reviewing a fundraising proposal for ypur donation. We will tell you the result soon.</Text>
                                <Button
                                    onPress={submit}
                                    title="OK"
                                    filled={true}
                                    width='100%'
                                // style={{
                                //   marginTop: 18,
                                //   marginBottom: 20
                                // }}
                                />
                            </View>
                        </View>
                    </Modal>

                </View>


            </ScrollView>



        </SafeAreaView>

    );
}





