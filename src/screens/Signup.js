// import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, TouchableWithoutFeedback, Pressable, StyleSheet, SafeAreaView, Keyboard, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../constants/Colors';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/textinput/InputField'
import SIZES from '../../constants/Sizes';
import Label from '../components/Label';
import Checkbox from '../components/checkbox/Checkbox';
import Loader from '../components/Loader';
import Fonts from '../../constants/Fonts';
import axios from 'axios';


const Signup = () => {

    const navigation = useNavigation();

    const [accountType, setAccountType] = useState(null);
    const handleBoxPress = (type) => {
        setAccountType((prevType) => (prevType === type ? null : type));
        setErrors((prevErrors) => ({ ...prevErrors, accountType: "" }));
    };

    const [inputs, setInputs] = useState({
        cnic: "",
        password: "",
        confirmpassword: "",
        accountType: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        Keyboard.dismiss();

        let valid = true;
        // CNIC validation
        if (!inputs.cnic) {
            handleError('Field should not be empty', 'cnic');
            valid = false;
        } else if (!/^[0-9]{5}-[0-9]{7}-[0-9]$/.test(inputs.cnic)) { // Assuming a 13-digit CNIC format with hyphens

            handleError('Invalid CNIC format', 'cnic');
            valid = false;
        }

        // account validation
        if (!accountType) {
            handleError("Please select an account type", 'accountType');
            valid = false;
        }

        // password validation
        if (!inputs.password) {
            handleError('Field should not be empty', 'password');
            valid = false;
        } else if (inputs.password.length < 8) {
            handleError('Password is too short. It should be atleast 8 characters long', 'password');
            valid = false;
        }else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(inputs.password)) {
            handleError('Password must include a number and a letter', 'password');
            valid = false;
        }

        if (!inputs.confirmpassword) {
            handleError('Please enter confirmpassword', 'confirmpassword');
            valid = false;
        } else if (inputs.password !== inputs.confirmpassword) {
            handleError("password doesn't match", 'confirmpassword');
            valid = false;
        }else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(inputs.confirmpassword)) {
            handleError("password doesn't match", 'confirmpassword');
            valid = false;
        }

        if (valid) {
            register();
        }
    };

    const register = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://app-api.demo-customwebsites.com/api/register', {
                cnic_number: inputs.cnic,
                password: inputs.password,
                password_confirmation: inputs.confirmpassword,
                user_type: accountType,
            });

            console.log('Signup Successful:', response.data);
            Alert.alert('Success', 'you are successfully signup');
            setLoading(false);
            navigation.navigate("Login");
          
        } catch (error) {
            setLoading(false);
            console.error('Error signing up:', error.response.data);
            Alert.alert('Error', 'Signup failed. Please try again.'); // Show an alert or handle the error as needed
        }
    };

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Loader visible={loading} />
            <View style={{ alignItems: "center" }}>
                <Image source={require('../../assets/images/logo.png')}
                    style={{
                        marginTop: 20,
                    }}
                />
            </View>

            <ScrollView style={{ marginHorizontal: SIZES.xLarge -2}}>
                <View>
                    <Text style={{
                        fontSize: SIZES.xLarge - 2,
                        fontWeight: 'bold',
                        marginVertical: 20,
                        color: COLORS.black,
                        textAlign: "center"
                    }}>
                        Create an account
                    </Text>
                </View>

                <Label text="CNIC Number" icon iconPosition={98} />
                <InputField
                    placeholder="99999-9999999-9"
                    maxLength={15}
                    keyboardType="numeric"
                    onChange={text => handleOnChange(text, 'cnic')}
                    error={errors.cnic}
                    onFocus={() => {
                        handleError(null, 'cnic');
                    }}
                />

                <Label text="Password" icon iconPosition={72} />
                <InputField
                    placeholder="Password"
                    secureTextEntry
                    isPassword={true}
                    onChange={text => handleOnChange(text, 'password')}
                    error={errors.password}
                    onFocus={() => {
                        handleError(null, 'password');
                    }}
                />

                <Label text="Confirm Password" icon iconPosition={132} />
                <InputField
                    placeholder="Confirm Password"
                    secureTextEntry
                    isPassword={true}
                    onChange={text => handleOnChange(text, 'confirmpassword')}
                    error={errors.confirmpassword}
                    onFocus={() => {
                        handleError(null, 'confirmpassword');
                    }}
                />

                <View style={styles.type} >
                    <Label text="Signup as" icon iconPosition={70} />
                    <View style={{ flexDirection: 'row', marginTop: 10, }}>

                        {/* Box 1 */}
                        <TouchableWithoutFeedback
                            onPress={() => handleBoxPress('donor')}
                        >
                            <View style={[styles.priceBox(15), { borderColor: accountType === 'donor' ? COLORS.primary : COLORS.lightGray }]}>
                                <Text style={styles.priceBoxText}>Donor</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        {/* Box 2 */}
                        <TouchableWithoutFeedback
                            onPress={() => handleBoxPress('receiver')}
                        >
                            <View style={[styles.priceBox(15), { borderColor: accountType === 'receiver' ? COLORS.primary : COLORS.lightGray }]}>
                                <Text style={styles.priceBoxText}>Receiver</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Text style={{ color: COLORS.red, fontSize: 13, marginTop: 7 }}>{errors.accountType}</Text>
                </View>

                <Checkbox
                    label="Remember me"
                />

                <Button
                    title="Sign Up"
                    filled
                    onPress={validate}
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />

                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, color: COLORS.black }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14, color: COLORS.black }}>Or continue with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View> */}

                {/* <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../../assets/images/facebook-icon.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text style={{ color: COLORS.black }}>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../../assets/images/google-icon.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text style={{ color: COLORS.black }}>Google</Text>
                    </TouchableOpacity>
                </View> */}

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>


            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: COLORS.gray, // Outline color
        borderRadius: 8,
        marginVertical: 4,
    },
    selected: {
        borderColor: COLORS.primary, // Color when selected
    },
    checkboxText: {
        marginLeft: 8,
        color: COLORS.black
    },
    priceBox: (margRight) => ({
        flex: 1,
        marginRight: margRight,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.medium,
        borderWidth: 2,
        shadowColor: COLORS.primary, shadowOffset: { width: 100, height: 200 }, shadowOpacity: 2, shadowRadius: 3
    }),
    priceBoxText: {
        color: COLORS.black,
        fontSize: 17,
        fontFamily: Fonts.bold
    },
});
export default Signup;