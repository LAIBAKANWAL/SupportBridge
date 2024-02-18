import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Keyboard, Pressable } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import SIZES from "../../constants/Sizes";
import Header from "../components/Header";
import COLORS from "../../constants/Colors";
import Label from "../components/Label";
import InputField from "../components/textinput/InputField";
import Button from "../components/Button";
import DropdownField from "../components/textinput/DropdownField";
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import styles from "./create.style";
import Loader from '../components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfileScreen() {

  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [about, setAbout] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [id, setid] = useState();

  const [alldata, setalldata] = useState({});
  const [isSubmitModalVisible, setSubmitModalVisible] = useState(false);
  const [isBlurVisible, setBlurVisible] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const categories = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Prefer not to say', value: 'Prefer not to say' },
  ];

  useEffect(() => {
    getLoginDataFromStorage();
    // getdata();

  }, []);

  useEffect(() => {

    if (about && about.length > 150) {
      handleError('Description is too long', 'about');
    }
  }, [about]);

  useEffect(() => {
    if (alldata) {
      if (alldata.name) {
        setName(alldata.name);
      }
      if (alldata.phone) {
        setPhoneNumber(alldata.phone);
      }
      if (alldata.email) {
        setEmail(alldata.email);
      }
      if (alldata.about) {
        setAbout(alldata.about);
      }
      if (alldata.gender) {
        setGender(alldata.gender);
      }
      if (alldata.dob) {
        setDob(alldata.dob);
      }
      if (alldata.profile_image) {
        setProfile(alldata.profile_image);
      }
    }
  }, [alldata]);

  const getLoginDataFromStorage = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('user_data');
      if (storedUserData) {

        const userData = JSON.parse(storedUserData);
        console.log('Retrieved login data from AsyncStorage:', userData);
        setid(userData.id);

        getdata(userData.id);
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


  const getdata = async (id) => {
    try {
      const response = await axios.get(`https://app-api.demo-customwebsites.com/api/user-profile/${id}`);

      console.log('save Successfully:', response.data);
      setalldata(response.data.data);
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      console.error('Error saving profile:', error.response.data);
    }
  };

  const validate = () => {
    Keyboard.dismiss();

    let valid = true;
    // Name validation
    if (!name) {
      handleError('Please enter fullname.', 'name');
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {

      handleError('Invalid fullname. Use alphabets and spaces only.', 'name');
      valid = false;
    }

    // phonenumber validation
    if (!phonenumber) {
      handleError('Please enter phone number', 'phonenumber');
      valid = false;
    } else if (!/^[0-9]{11}$/.test(phonenumber)) {

      handleError('Invalid phonenumber format', 'phonenumber');
      valid = false;
    }

    if (!email) {
      handleError('Please enter email', 'email');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

      handleError('Please enter a valid email address', 'email');
      valid = false;
    }

    if (valid) {
      save();
    }
  };

  const save = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`https://app-api.demo-customwebsites.com/api/user-profile/${id}`, {
        profile_image: profile,
        name: name,
        about: about,
        gender: gender,
        dob: dob,
        phone: phonenumber,
        email: email,
      });

      console.log('save Successfully:', response.data);

      setLoading(false);
      openModal();
    }
    catch (error) {
      setLoading(false);
      console.error('Error saving profile:', error.response.data);
    }
  };


  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  }




  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setProfile(image.path)
      toggleModal(); // Close the modal
    })
      .catch((err) => {
        console.log('Error fetching image from Camera roll', err);
      });
  };

  const choosePhotosFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setProfile(image.path)
      toggleModal(); // Close the modal

    })
      .catch((err) => {
        console.log('Error fetching images from gallery', err);
      });
  };

  const handleCategoryChange = (value) => {
    setGender(value)
  };

  const openModal = () => {
    setSubmitModalVisible(true);
    setBlurVisible(true);
  };

  const closeModal = () => {
    setSubmitModalVisible(false);
    navigation.navigate("Home");
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Loader visible={loading} />
      <View style={{ marginHorizontal: SIZES.small - 6 }}>
        <Header
          title="Fill Your Profile"
          showBackButton
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: SIZES.xLarge - 2 }} >

        <View style={{ alignSelf: "center" }}>

          <View style={{ backgroundColor: COLORS.lightGray, borderRadius: 100, alignItems: "center", justifyContent: "center", overflow: 'hidden' }}>
            <Image
              style={{
                width: 100,
                height: 100, resizeMode: 'cover'
              }}
              source={profile ? { uri: profile } : require("../../assets/images/placeholder.png")}
            />
          </View>

          <TouchableOpacity style={styles.dm} activeOpacity={0.7} onPress={() => navigation.navigate("Inbox")}>
            <MaterialIcons name="chat" size={15} color="#DFD8C8"></MaterialIcons>
          </TouchableOpacity>
          <View style={styles.active}></View>
          <TouchableOpacity style={styles.add} activeOpacity={0.7} onPress={toggleModal}>
            <MaterialIcons name="edit" size={20} color="#DFD8C8" ></MaterialIcons>
          </TouchableOpacity>


          <Modal isVisible={isModalVisible} style={styles.modal} onBackdropPress={toggleModal}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={takePhotoFromCamera}>
                <Text style={styles.textStyle}>Take a photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={choosePhotosFromGallery}>
                <Text style={styles.textStyle}>Choose photo from gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <View>

          <View>
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 20,
              color: COLORS.black,
            }}>
              Basic Information
            </Text>
          </View>

          <Label text="Full Name" icon iconPosition={72} />
          <InputField
            value={name}
            placeholder="Full Name"
            keyboardType="default"
            onChange={text => setName(text)}
            error={errors.name}
            onFocus={() => {
              handleError(null, 'name');
            }}
          />


          <Label text="Something about you" />
          <InputField
            placeholder="write about yourself ....."
            value={about}
            onChange={text => setAbout(text)}
            error={errors.about}
            onFocus={() => {
              handleError(null, 'about');
            }}
            keyboardType="default"
            multiline={true}
            numberOfLines={3}
          />


          <Label text="Gender" />

          <DropdownField
            options={categories}
            initialValue={gender}
            onValueChange={handleCategoryChange}
            placeholder="Please select your gender"
          />

          <Label text="Date of birth" />
          <InputField
            value={dob}
            placeholder="mm-dd-yyyy"
            keyboardType="numeric"
            onChange={text => setDob(text)}
            iconComponent={<MaterialIcons name="date-range" size={24} color={COLORS.grey} />}
          />

        </View>

        <View style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, marginTop: 20, }}></View>

        <View>
          <View>
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 20,
              color: COLORS.black,
            }}>
              Contact Information
            </Text>
          </View>

          <Label text="Phone Number" icon iconPosition={106} />
          <InputField
            placeholder="03345264546"
            value={phonenumber}
            keyboardType="numeric"
            onChange={text => setPhoneNumber(text)}
            error={errors.phonenumber}
            onFocus={() => {
              handleError(null, 'phonenumber');
            }}
          />

          <Label text="Email" icon iconPosition={41} />
          <InputField
            placeholder="Enter your email"
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            onChange={text => setEmail(text)}
            error={errors.email}
            onFocus={() => {
              handleError(null, 'email');
            }}
          />


        </View>

        <Button
          title="Save"
          filled
          onPress={validate}
          style={{
            marginTop: 20,
            marginBottom: 40,
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
                <Text style={styles.boxText(SIZES.xLarge)}>Save Successfully!</Text>
                <Text style={[styles.textStyle, { textAlign: 'center', paddingLeft: 10 }]}>Your profile updated Successfully.</Text>
                <Button
                  onPress={closeModal} // Ensure this calls the submit function for navigation
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


