import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, SafeAreaView, ScrollView, Pressable, Platform, TextInput, Keyboard } from 'react-native';
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
import Loader from '../components/Loader';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReceiverForm({ route }) {

    const navigation = useNavigation();
    const [isSubmitModalVisible, setSubmitModalVisible] = useState(false);
    const [isBlurVisible, setBlurVisible] = useState(false);
    const [fullname, setfullname] = useState();
    const [address, setAddress] = useState();
    const [postalCode, setPostalCode] = useState();
    const [status, setStatus] = useState();
    const [salarySlip, setSalarySlip] = useState(null);
    const [bill, setBill] = useState(null);
    const [familyMembers, setFamilyMembers] = useState();
    const [education, setEducation] = useState();
    const [currentProfession, setCurrentProfession] = useState();
    const [description, setDescription] = useState();
    const [term, setTerm] = useState();
    const [disability, setDisability] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isModalVisible1, setModalVisible1] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);


    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [id, setid] = useState();
    const { fundId } = route.params;

    // console.log('fundid:', fundId)

    const eduCategories = [
        { label: 'Inter', value: 'Inter' },
        { label: 'Matric', value: 'Matric' },
        { label: 'Under Matric', value: 'Under Matric' },
        { label: 'Illiterate', value: 'Illiterate' },
    ];

    const statusOptions = [
        { label: 'Single', value: 'Single' },
        { label: 'Married', value: 'Married' },
        { label: 'Divorce', value: 'Divorce' },
        { label: 'Widow', value: 'Widow' },
    ];

    useEffect(() => {
        getLoginDataFromStorage();

        if (description && description.length > 200) {
            handleError('Description is too long', 'description');
        }

    }, [description]);

    const getLoginDataFromStorage = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem('user_data');
            if (storedUserData) {

                const userData = JSON.parse(storedUserData);
                setid(userData.id);

                // getdata(userData.id);
                return userData;

            } else {
                console.log('No login data found in AsyncStorage.');
                return null;
            }
        } catch (error) {
            console.error('Error retrieving login data from AsyncStorage:', error);
            return null;
        }
    };

    console.log('fundid:', fundId)

    const validate = () => {
        Keyboard.dismiss();

        let valid = true;
        if (!fullname) {
            handleError('Field should not be empty.', 'fullname');
            valid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(fullname)) {

            handleError('Invalid fullname. Use alphabets and spaces only.', 'fullname');
            valid = false;
        }


        if (!address) {
            handleError('Please enter address.', 'address');
            valid = false;
        }


        if (!postalCode) {
            handleError('Please enter postal code', 'postalCode');
            valid = false;
        } else if (!/^[0-9]{5}$/.test(postalCode)) {

            handleError('Invalid postalCode', 'postalCode');
            valid = false;
        }

        // category validation
        if (!status) {
            handleError("Please select status", 'status');
            valid = false;
        } else {
            setErrors(prevState => ({ ...prevState, status: null }));
        }

        // if (!salarySlip || salarySlip.length === 0) {
        //     handleError("Please select slip", 'salarySlip');
        //     valid = false;
        // }

        // if (!bill || bill.length === 0) {
        //     handleError("Upload any latest bill", 'bill');
        //     valid = false;
        // }

        if (!familyMembers) {
            handleError('Please mention numbers', 'familyMembers');
            valid = false;
        }

        if (!education) {
            handleError("Please select education", 'education');
            valid = false;
        } else {
            setErrors(prevState => ({ ...prevState, education: null }));
        }

        if (!currentProfession) {
            handleError('Please enter profession.', 'currentProfession');
            valid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(currentProfession)) {

            handleError('Invalid Profession. Use alphabets and spaces only.', 'currentProfession');
            valid = false;
        }

        // description validation
        if (!description) {
            handleError('Please enter description.', 'description');
            valid = false;
        }

        if (!isChecked) {
            handleError('Please agree to the terms & conditions.', 'term');
            valid = false;
        } else {
            if (errors.term) {
                handleError(null, 'term');
            }
        }


        if (valid) {
            submit();
        }
    };

    const submit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('salary_slip', {
                uri: salarySlip.imagePath,
                type: salarySlip.imageType,
                name: salarySlip.imageName,
            });
            formData.append('bill', {
                uri: bill.imagePath,
                type: bill.imageType,
                name: bill.imageName,
            });

            formData.append('full_name', fullname);
            formData.append('address', address);
            formData.append('postal_code', postalCode);
            formData.append('status', status);
            formData.append('family_member', familyMembers);
            formData.append('education', education);
            formData.append('profession', currentProfession);
            formData.append('description', description);
            formData.append('disability', disability ? "yes" : "no");
            formData.append('terms_accept', isChecked ? "yes" : "no",);
            formData.append('user_id', id);

            const response = await fetch(`https://app-api.demo-customwebsites.com/api/user-request/${fundId}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

            });

            if (response.ok) {
                //  console.log('Submit Successfully:', response.data);

                setLoading(false);
                openModal();

            } else {
                setLoading(false);
                Alert.alert('Error:', 'Failed to send request');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error submitting details failed:', error);

        }
    };

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    }


    const handleEduCategoryChange = (value) => {
        setEducation(value);
        if (errors.education) {
            handleError(null, 'education');
        }
    };

    const handlestatusCategoryChange = (value) => {
        setStatus(value);
        if (errors.status) {
            handleError(null, 'status');
        }
    };


    const toggleModal1 = () => {
        setModalVisible1(!isModalVisible1);
    };

    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const choosePhotosFromGallery1 = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log('image:', image)
            const imagePath = image.path; // Path of the selected image
            const imageName = imagePath.split('/').pop(); // Extracting the name from the path
            const imageType = image.mime; // MIME type of the image

            // Now you can use imagePath and imageName as needed
            // setSalarySlip({ path: imagePath, imageName, mime: imageType });
            setSalarySlip({ imagePath, imageName, imageType });

            toggleModal1(); // Close the modal

        })
            .catch((err) => {
                console.log('Error fetching images from gallery', err);
            });
    };

    const choosePhotosFromGallery2 = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            const imagePath = image.path; // Path of the selected image
            const imageName = imagePath.split('/').pop(); // Extracting the name from the path
            const imageType = image.mime; // MIME type of the image

            // Now you can use imagePath and imageName as needed
            setBill({ imagePath, imageName, imageType });
            toggleModal2(); // Close the modal

        })
            .catch((err) => {
                console.log('Error fetching images from gallery', err);
            });
    };

    const openModal = () => {
        setSubmitModalVisible(true);
        setBlurVisible(true);
    };

    const closeModal = () => {
        setSubmitModalVisible(false);
        navigation.navigate('Home')
    };

    return (

        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.white }} >
            <Loader visible={loading} />
            <View style={{ marginHorizontal: SIZES.small - 6 }}>
                <Header
                    title="Receiver Details"
                    showBackButton
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: SIZES.xLarge - 3 }}>

                <View style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, marginTop: 20, }}></View>
                <View>
                    <View>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            marginVertical: 20,
                            color: COLORS.black,
                        }}>
                            Fill proper details why you need particular item
                        </Text>
                    </View>

                    <Label text="Full Name" icon iconPosition={72} />
                    <InputField
                        placeholder="Full name"
                        value={fullname}
                        keyboardType="default"
                        onChange={text => setfullname(text)}
                        error={errors.fullname}
                        onFocus={() => {
                            handleError(null, 'fullname');
                        }}
                    />

                    <Label text="Address" icon iconPosition={58} />
                    <InputField
                        placeholder="Address"
                        value={address}
                        keyboardType="default"
                        onChange={text => setAddress(text)}
                        error={errors.address}
                        onFocus={() => {
                            handleError(null, 'address');
                        }}
                    />

                    <Label text="Postal Code" icon iconPosition={84} />
                    <InputField
                        placeholder="Enter code"
                        value={postalCode}
                        onChange={text => setPostalCode(text)}
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
                        initialValue={status}
                        onValueChange={handlestatusCategoryChange}
                        placeholder="Select Status"
                        error={errors.status}
                        onFocus={() => {
                            handleError(null, 'status');
                        }}
                    />

                    <Label text="Family members" icon iconPosition={120} />
                    <InputField
                        placeholder="Enter Total Numbers of family members"
                        value={familyMembers}
                        onChange={text => setFamilyMembers(text)}
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
                        initialValue={education}
                        onValueChange={handleEduCategoryChange}
                        placeholder="Select Education"
                        error={errors.education}
                        onFocus={() => {
                            handleError(null, 'education');
                        }}
                    />

                    <Label text="Current Profession" icon iconPosition={132} />
                    <InputField
                        value={currentProfession}
                        placeholder="Profession"
                        keyboardType="default"
                        onChange={text => setCurrentProfession(text)}
                        error={errors.currentProfession}
                        onFocus={() => {
                            handleError(null, 'currentProfession');
                        }}
                    />

                    <Label text="Description" icon iconPosition={80} />
                    <InputField
                        placeholder="Why you need this item."
                        value={description}
                        onChange={text => setDescription(text)}
                        isPassword={false}
                        multiline={true}
                        numberOfLines={4}
                        error={errors.description}
                        onFocus={() => {
                            handleError(null, 'description');
                        }}
                    />

                    <Label text="Upload Salary Slip" icon iconPosition={130} />

                    <View style={styles.inputContainer}>
                        <TouchableOpacity style={styles.inputBox} onPress={toggleModal1}>
                            <Text style={{ color: COLORS.black, lineHeight: 20, marginRight: 35, }}>
                                {salarySlip && salarySlip.imageName ? salarySlip.imageName : 'Select image'}
                            </Text>

                            <View style={{
                                position: 'absolute',
                                right: 12,
                            }}>
                                {<MaterialCommunityIcons name="cloud-upload-outline" size={24} color={COLORS.grey} />}
                            </View>
                        </TouchableOpacity>
                        <Text style={{ color: COLORS.red, fontSize: 13, marginTop: 7 }}>{errors.bill}</Text>

                        <Modal isVisible={isModalVisible1} style={styles.modal} onBackdropPress={toggleModal1}>
                            <View style={styles.modalContainer}>
                                <TouchableOpacity style={styles.modalButton} onPress={choosePhotosFromGallery1}>
                                    <Text style={styles.textStyle}>Choose photo from gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={toggleModal1}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>

                    <Label text="Upload Bill" icon iconPosition={75} />

                    <View style={styles.inputContainer}>
                        <TouchableOpacity style={styles.inputBox} onPress={toggleModal2}>
                            <Text style={{ color: COLORS.black, lineHeight: 20, marginRight: 35, }}>
                                {bill && bill.imageName ? bill.imageName : 'Select image'}
                            </Text>

                            <View style={{
                                position: 'absolute',
                                right: 12,
                            }}>
                                {<MaterialCommunityIcons name="cloud-upload-outline" size={24} color={COLORS.grey} />}
                            </View>
                        </TouchableOpacity>
                        <Text style={{ color: COLORS.red, fontSize: 13, marginTop: 7 }}>{errors.bill}</Text>

                        <Modal isVisible={isModalVisible2} style={styles.modal} onBackdropPress={toggleModal2}>
                            <View style={styles.modalContainer}>
                                <TouchableOpacity style={styles.modalButton} onPress={choosePhotosFromGallery2}>
                                    <Text style={styles.textStyle}>Choose photo from gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={toggleModal2}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>


                    <Checkbox
                        label="Any disability"
                        isChecked={disability}
                        onPress={() => {
                            setDisability(!disability);
                        }
                        }
                    />

                    <Checkbox
                        label="By checking this, you agree to the terms & conditions that apply to us."
                        isChecked={isChecked}
                        onPress={() => {
                            setIsChecked(!isChecked);
                            if (errors.term) {
                                handleError(null, 'term');
                            }
                        }
                        }
                    />
                    <Text style={{ color: COLORS.red, fontSize: 13, }}>{errors.term}</Text>


                </View>

                <View style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, marginTop: 20, }}></View>


                <Button
                    onPress={validate}
                    title="Submit"
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
                                            marginBottom: 20
                                        }}
                                    />
                                </View>
                                <Text style={[styles.boxText(SIZES.xLarge),{textAlign:'center'}]}>Submit Successfully!</Text>
                                <Text style={[styles.textStyle, { textAlign: 'center', paddingLeft: 10 }]}>We are  reviewing youe request. We will tell you the result soon.</Text>
                                <Button
                                    onPress={closeModal}
                                    title="OK"
                                    filled={true}
                                    width='100%'
                                />
                            </View>
                        </View>
                    </Modal>

                </View>


            </ScrollView>



        </SafeAreaView>

    );
}





