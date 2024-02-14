import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Keyboard } from 'react-native';
import Header from '../components/Header';
import SIZES from '../../constants/Sizes';
import { useNavigation } from '@react-navigation/native';
import Label from '../components/Label';
import InputField from '../components/textinput/InputField';
import Button from '../components/Button';

const CreatePassword = () => {
  const navigation = useNavigation();

  const [inputs, setInputs] = useState({
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();

    let valid = true;

 // currentpassword validation
 if (!inputs.currentpassword) {
  handleError('Field should not be empty', 'currentpassword');
  valid = false;
}
//the old password is invalid.

    // newpassword validation
    if (!inputs.newpassword) {
      handleError('Field should not be empty', 'newpassword');
      valid = false;
    } else if (inputs.newpassword.length < 8) {
      handleError('Password is too short. It should be at least 6 characters long', 'newpassword');
      valid = false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(inputs.newpassword)) {
      handleError('Password must include a number and a letter', 'newpassword');
      valid = false;
    }
    //the new password should me different than the existing one.


    if (!inputs.confirmpassword) {
      handleError('Please enter confirmpassword', 'confirmpassword');
      valid = false;
    } else if (inputs.newpassword !== inputs.confirmpassword) {
      handleError("password doesn't match", 'confirmpassword');
      valid = false;
    }else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(inputs.confirmpassword)) {
      handleError("password doesn't match", 'confirmpassword');
      valid = false;
  }


    if (valid) {
      changePassword();
    }
  };

  const changePassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post('', {
        password: inputs.password,
        password_confirmation: inputs.confirmpassword,
      });

      console.log('Password Changed:', response.data);
      Alert.alert('Success', 'your Password Changed successfully');
      setLoading(false);
      navigation.navigate("SecurityScreen");
      // Optionally, navigate to the next screen or perform other actions upon successful signup
    } catch (error) {
      setLoading(false);
      console.error('Password changing error:', error.response.data);
      Alert.alert('Error', 'Password changing failed. Please try again.'); // Show an alert or handle the error as needed
    }
  };


  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  // console.log(inputs)
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  }
  return (

    <SafeAreaView style={{ flex: 1, marginHorizontal: SIZES.small - 1 }}>

      <Header
        title="Change Password"
        showBackButton
      />

      <View style={{ marginHorizontal: SIZES.small - 2 }}>
        <Label text="Current Password" icon iconPosition={128} />
        <InputField
          placeholder="Current Password"
          secureTextEntry
          isPassword={true}
          onChange={text => handleOnChange(text, 'currentpassword')}
          error={errors.currentpassword}
          onFocus={() => {
            handleError(null, 'currentpassword');
          }}
        />

<Label text="New Password" icon iconPosition={107} />
        <InputField
          placeholder="New Password"
          secureTextEntry
          isPassword={true}
          onChange={text => handleOnChange(text, 'newpassword')}
          error={errors.newpassword}
          onFocus={() => {
            handleError(null, 'newpassword');
          }}
        />

        <Label text="Confirm Password" icon iconPosition={132} />
        <InputField
          placeholder="Confirm New Password"
          secureTextEntry
          isPassword={true}
          onChange={text => handleOnChange(text, 'confirmpassword')}
          error={errors.confirmpassword}
          onFocus={() => {
            handleError(null, 'confirmpassword');
          }}
        />


        <Button
          title="Change password"
          filled
          onPress={validate}
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
});

export default CreatePassword;
