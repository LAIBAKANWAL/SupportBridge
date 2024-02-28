import { View, Text, Image,Pressable, StyleSheet, SafeAreaView, Keyboard,} from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../constants/Colors';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/textinput/InputField';
import SIZES from '../../constants/Sizes';
import Label from '../components/Label';
import Checkbox from '../components/checkbox/Checkbox';
import Loader from '../components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {

    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);
    
    const [inputs, setInputs] = useState({
        cnic: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        Keyboard.dismiss();
        let valid = true;

        if (!inputs.cnic) {
            handleError('Please enter CNIC', 'cnic');
            valid = false;
        }

        if (!inputs.password) {
            handleError('Please enter password', 'password');
        }

        if (valid) {
            login();
        }
    };

    const saveLoginDataToStorage = async (userData) => {
        try {
            if (userData) {
          // Save user data to AsyncStorage
          await AsyncStorage.setItem('user_data',JSON.stringify(userData));
        } else {
            console.warn('Attempting to save undefined or null user data to AsyncStorage.');
          }
        } catch (error) {
          console.error('Error saving login data to AsyncStorage:', error);
        }
      };

    const login = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://app-api.demo-customwebsites.com/api/login', {
                cnic_number: inputs.cnic,
                password: inputs.password,
            });

            if (response.data.success) {

                setLoading(false);
                console.log('Login Successful:', response.data);
                
                await saveLoginDataToStorage(response.data.data);
                // await saveLoginDataToStorage(response.data.data.name);
                // console.log(response.data.data);
                (response.data.data.cnic_number.toLowerCase() === "42401-0000000-0") ?
                navigation.navigate("Admin"):
                navigation.navigate("EditProfileScreen");
                // navigation.navigate("Admin")
            } else {
                setLoading(false);
                console.error('Login is failed:', response.data.message);
            }

        } catch (error) {
            setLoading(false);
            console.error('Login failed:', error);
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
                        marginTop: 20
                    }}
                />
            </View>

            <View style={{marginHorizontal: SIZES.xLarge -2 }}>
                <View>
                    <Text style={{
                        fontSize: SIZES.xLarge - 2,
                        fontWeight: 'bold',
                        marginVertical: 20,
                        color: COLORS.black,
                        textAlign: "center"
                    }}>
                        Log in to your account
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
                    placeholder="password"
                    secureTextEntry
                    isPassword={true}
                    onChange={text => handleOnChange(text, 'password')}
                    error={errors.password}
                    onFocus={() => {
                        handleError(null, 'password');
                    }}
                />


                <Checkbox
                    label="Remember me"
                    isChecked={isChecked}
                    onPress={() => setIsChecked(!isChecked)}
                />

                <Button
                    title="Login"
                    onPress={validate}
                    filled
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
                    <Text style={{ fontSize: 14, color: COLORS.black }}>Or Login with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
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
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account?</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Signup")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                </View>

            </View>
        </SafeAreaView>

    );
};
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
});


