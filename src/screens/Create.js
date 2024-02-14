import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList, Alert, SafeAreaView, ScrollView, Pressable, Platform, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import COLORS from '../../constants/Colors';
import Header from '../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SIZES from '../../constants/Sizes';
import InputField from '../components/textinput/InputField';
import Button from '../components/Button';
import DropdownPicker from 'react-native-dropdown-picker';
import Label from '../components/Label';
import { moneyIcon } from '../components/Data';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import Checkbox from '../components/checkbox/Checkbox';
import { useNavigation } from '@react-navigation/native';
import DateTimeField from '../components/textinput/DateTimeField';
import styles from './create.style';

export default function Create() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isImageSelectModalVisible, setImageSelectModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // Store selected images
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isSubmitModalVisible, setSubmitModalVisible] = useState(false);
  const [isBlurVisible, setBlurVisible] = useState(false);
  const navigation = useNavigation();



  // State variables for fields
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [datePlan, setDatePlan] = useState('');
  const [fundPlan, setFundPlan] = useState('');
  const [name, setName] = useState('');
  const [proposalDocuments, setProposalDocuments] = useState('');
  const [medicalDocuments, setMedicalDocuments] = useState('');
  const [story, setStory] = useState('');


  const maxImageLimit = 5;

  const categories = [
    { label: 'Category 1', value: 'category1' },
    { label: 'Category 2', value: 'category2' },
    { label: 'Category 3', value: 'category3' },
  ];

  const toggleCategoryDropdown = () => {
    setCategoryOpen(!isCategoryOpen);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCategoryOpen(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleImageSelectModal = () => {
    setImageSelectModalVisible(!isImageSelectModalVisible);
  };

  // const toggleDatePicker = () => {
  //   setShowPicker(!showPicker);
  // };

  // const onChange = ({ type }, selectedDate) => {
  //   if (type == 'set') {
  //     const currentDate = selectedDate;
  //     setDate(currentDate);

  //     if (Platform.OS === "android") {
  //       toggleDatePicker();
  //       setDatePlan(currentDate.toDateString());
  //     }
  //   }
  //   else {
  //     toggleDatePicker();
  //   }
  // };

  // const confirmIOSDate = () => {
  //   setDatePlan(date.toDateString());
  //   toggleDatePicker();
  // };

  const takePhotoFromCamera = () => {
    if (selectedImages.length >= maxImageLimit) {
      // Limit the number of images to the specified max
      Alert.alert('Image limit reached.');
      return;

    }
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        let imageData = [image];
        if (imageData.length > 0) {
          setSelectedImages([...selectedImages, ...imageData]); // Set the selected images
          toggleModal(); // Close the modal
        }
      })
      .catch((err) => {
        console.log('Error fetching image from Camera roll', err);
      });
  };

  const choosePhotosFromGallery = () => {
    if (selectedImages.length >= maxImageLimit) {
      // Limit the number of images to the specified max
      Alert.alert('Image limit reached.');
      return;
    }
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      multiple: true,
    })
      .then(images => {
        if (images.length > 0) {
          const remainingSlots = maxImageLimit - selectedImages.length; // Adjust the limit as needed
          const imagesToSelect = images.slice(0, remainingSlots);
          setSelectedImages([...selectedImages, ...imagesToSelect]); // Set the selected images
          toggleModal(); // Close the modal
        }
      })
      .catch((err) => {
        console.log('Error fetching images from gallery', err);
      });
  };

  const removePhoto = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    toggleImageSelectModal();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={toggleImageSelectModal}
    >
      <Image source={{ uri: item.path }} style={styles.carouselImages} />
    </TouchableOpacity>
  );

  const selectDoc = async (setState) => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: true
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

  return (

    <SafeAreaView
      style={{ flex: 1, marginHorizontal: SIZES.small - 3 }}
    >
      <Header
        title="Create New Fundraising"
        // title="Search"
        showBackButton
      // showFilterButton
      />
      <ScrollView >

        <View style={styles.container}>
          <View style={styles.imageBox}>
            <TouchableOpacity style={styles.uploadBox} onPress={toggleModal}>
              <Text style={styles.boxText(SIZES.large)}>Upload Up To 5 Photos</Text>
            </TouchableOpacity>

            <View style={styles.box}>
              {selectedImages.length === 0 ? (
                <TouchableOpacity onPress={toggleModal} style={styles.alignment}>
                  <MaterialIcons name="add-circle-outline" size={28} color={COLORS.primary} style={{ paddingTop: 3 }} />
                  <Text style={styles.boxText(SIZES.large)}>Select Images</Text>
                </TouchableOpacity>
              ) : (

                <View style={styles.carouselView}>

                  <FlatList
                    data={selectedImages}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    keyExtractor={(_, index) => index.toString()}

                  />
                </View>
              )}
            </View>
          </View>



          <Modal isVisible={isModalVisible} style={styles.modal} onBackdropPress={toggleModal}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={takePhotoFromCamera}>
                <Text style={styles.textStyle}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={choosePhotosFromGallery}>
                <Text style={styles.textStyle}>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <Modal isVisible={isImageSelectModalVisible} style={styles.modal} onBackdropPress={toggleImageSelectModal}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={removePhoto}>
                <Text style={styles.textStyle}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={toggleImageSelectModal}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>

        </View>

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
              Fundraising Details
            </Text>
          </View>

          <Label text="Title" icon iconPosition={31} />
          <InputField
            placeholder="Title"
            keyboardType="default"
            value={title}
            onChange={setTitle}
            isPassword={false}
          />

          <Label text="Catagory" icon iconPosition={64} />
          <DropdownPicker
            open={isCategoryOpen}
            value={selectedCategory}
            items={categories}
            setOpen={toggleCategoryDropdown}
            setValue={handleCategoryChange}
            setItems={categories}
            containerStyle={styles.dropdownContainer}
            style={styles.dropdownPicker}
            itemStyle={styles.itemStyle}
            dropDownStyle={styles.dropDownStyle}
            zIndex={9999}
            showTickIcon={false}
          />

          <Label text="Total Donation Required" icon iconPosition={171} />

          <InputField
            placeholder="0"
            value={donationAmount}
            onChange={setDonationAmount}
            keyboardType="numeric"
            isPassword={false}
            iconComponent={<Image
              style={{ width: 20, height: 18, resizeMode: "contain", tintColor: COLORS.grey }}
              source={moneyIcon.priceIcon}
            />}
          />

          <Label text="Choose Donation Expiration Date" icon iconPosition={234} />

          {/* {showPicker && (
            <DateTimePicker
              mode='date'
              display='spinner'
              value={date}
              onChange={onChange}
              style={styles.datePicker}
              is24Hour={true}
            />
           
          )} */}

          {/* {showPicker && Platform.OS === 'ios' && (
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <TouchableOpacity style={[
                styles.button,
                styles.pickerButton,
                { backgroundColor: COLORS.grey },
              ]}
                onPress={toggleDatePicker}
              >
                <Text style={[styles.buttonText,
                { color: COLORS.primary }]}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[
                styles.button,
                styles.pickerButton,
                { backgroundColor: COLORS.primary },
              ]}
                onPress={confirmIOSDate}
              >
                <Text style={[styles.buttonText,
                { color: COLORS.lightGray }]}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )} */}

          {/* {!showPicker && (
            <Pressable onPress={toggleDatePicker} style={{
              alignItems: 'center',
              justifyContent: 'center', marginBottom: 12
            }}>
              <TextInput
                placeholder="Select Date"
                // value={moment(datePlan).format('MM/YYYY')} 
                value={datePlan}
                onChangeText={setDatePlan}
                editable={false}
                onPressIn={toggleDatePicker}
                placeholderTextColor={COLORS.black}
                style={{
                  color: COLORS.black,
                  width: '100%',
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 22,
                }}
              />
              <View style={{
                position: 'absolute',
                right: 12
              }}>
                {<MaterialIcons name="date-range" size={24} color={COLORS.grey} />}
              </View>
            </Pressable>
          )} */}


          <DateTimeField
          />

          <Label text="Fund Usage Plan" icon iconPosition={120} />
          <InputField
            placeholder="Fund Usage Plan"
            value={fundPlan}
            onChange={setFundPlan}
            isPassword={false}
            multiline={true}
            numberOfLines={4}

          />

        </View>

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
              Donation Recipient Details
            </Text>
          </View>

          <Label text="Name of Recipients (People/organization)" icon iconPosition={298} />
          <InputField
            placeholder="Name"
            keyboardType="default"
            value={name}
            onChange={setName}
            isPassword={false}
          />

          <Label text="Upload Donation Proposal Documents" icon iconPosition={270} />

          <View style={styles.inputContainer}>

            <TouchableOpacity style={styles.inputBox} onPress={() => selectDoc(setProposalDocuments)}>
              <Text style={{ color: COLORS.black, lineHeight: 20, marginRight: 17 }}>
                {proposalDocuments.length > 0
                  ? proposalDocuments.map((doc) => doc.name).join(', ')
                  : 'Select Document'}
              </Text>
              {/* {proposalDocuments.length === 0 && (
              <Text style={styles.errorMessage}>Please select at least one document</Text>
            )} */}
              <View style={{
                position: 'absolute',
                right: 12,
              }}>
                {<MaterialCommunityIcons name="cloud-upload-outline" size={24} color={COLORS.grey} />}
              </View>
            </TouchableOpacity>

          </View>



          <Label text="Upload medical Documents" />
          <View style={styles.inputContainer}>

            <TouchableOpacity style={styles.inputBox} onPress={() => selectDoc(setMedicalDocuments)}>
              <Text style={{ color: COLORS.black, lineHeight: 20, marginRight: 17 }}>
                {medicalDocuments.length > 0
                  ? medicalDocuments.map((doc) => doc.name).join(', ')
                  : 'Select Document'}
              </Text>

              <View style={{
                position: 'absolute',
                right: 12,
              }}>
                {<MaterialCommunityIcons name="cloud-upload-outline" size={24} color={COLORS.grey} />}
              </View>
            </TouchableOpacity>

          </View>

          <Label text="Story" icon iconPosition={41} />
          <InputField
            placeholder="Story of Donation Recipients"
            value={story}
            onChange={setStory}
            isPassword={false}
            multiline={true}
            numberOfLines={6}
          />


          <Checkbox
            label="By checking this, you agree to the terms & conditions that apply to us."
          />
        </View>

        <View style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, marginTop: 20, }}></View>


        <Button
          onPress={openModal}
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
                  onPress={closeModal}
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





// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   imageBox: {
//     // backgroundColor:"yellow",
//     // marginTop:20,
//     borderColor: COLORS.lightGray,
//     borderWidth: 1,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,
//     elevation: 6,
//   },
//   box: {
//     width: 330,
//     height: 120,
//     backgroundColor: COLORS.white,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderColor: COLORS.lightGray,
//     borderWidth: 1,
//     borderRadius: 3,
//     // borderBottomEndRadius:10,
//     // borderRadius: 10,
//     // shadowColor: '#000',
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 3,
//     // },
//     // shadowOpacity: 0.27,
//     // shadowRadius: 4.65,
//     // elevation: 6,
//   },
//   uploadBox: {
//     width: 330,
//     height: 50,
//     backgroundColor: COLORS.white,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   boxText: (size) => ({
//     fontSize: size,
//     color: COLORS.primary,
//     fontFamily: 'Roboto-Bold',
//   }),
//   alignment: {
//     flexDirection: "row",
//     textAlign: "center"
//   },
//   uploadText: {
//     fontSize: 25,
//     color: COLORS.primary,
//     fontFamily: 'Roboto-Bold',

//   },
//   selectBoxText: {
//     fontSize: 25,
//     color: COLORS.primary,
//     fontFamily: 'Roboto-Bold',
//   },
//   // button: {
//   //   width: 180,
//   //   height: 60,
//   //   backgroundColor: COLORS.primary,
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   //   borderRadius: 5,
//   // },
//   // buttonText: {
//   //   textAlign: 'center',
//   //   fontSize: 25,
//   //   color: '#fff',
//   // },
//   modalContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//   },
//   modal: {
//     justifyContent: 'flex-end',
//     margin: 0,
//   },
//   modalButton: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   textStyle: {
//     color: COLORS.grey,
//     textAlign: 'center',
//     lineHeight: 23,
//     paddingBottom: 15,
//     paddingTop: 15
//   },
//   carouselView: {
//     flexDirection: 'row',
//     margin: 15,
//     justifyContent: 'flex-start'
//   },
//   carouselImages: {
//     width: 100,
//     height: 100,
//     borderRadius: 3,
//     marginRight: 5
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: COLORS.gray,
//     borderRadius: 8,
//     marginVertical: 4,
//   },
//   selected: {
//     borderColor: COLORS.primary,
//   },
//   checkboxText: {
//     marginLeft: 8,
//     color: COLORS.black,
//     lineHeight: 20
//   },
//   dropdownPicker: {
//     paddingLeft: 22,
//     marginBottom: 12,
//   },
//   datePicker: {
//     height: 120,
//     marginTop: -10
//   },
//   pickerButton: {
//     paddingHorizontal: 20
//   },
//   inputContainer: {
//     marginBottom: 12,
//   },
//   inputBox: {
//     width: '100%',
//     minHeight: 48,
//     borderColor: COLORS.black,
//     borderWidth: 1,
//     borderRadius: 8,
//     justifyContent: 'center',
//     paddingLeft: 22,
//     paddingBottom: 5,
//     paddingTop: 5,
//   },
//   errorMessage: {
//     color: 'red',
//     fontSize: 12,
//     marginTop: 4,
//   },
//   centeredView: {
//     flex: 1,
//     // justifyContent: 'center',
//   },
//   modalBox: {
//     flex: 1,
//     justifyContent: 'center',
//     margin: 0
//   },
//   blurBackground: {
//     backgroundColor: 'rgba(0, 10, 0, 0.5)',
//   },
//   modalView: {
//     margin: 40,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 30,
//     shadowColor: COLORS.primary,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     alignItems: 'center'
//   }
// });




