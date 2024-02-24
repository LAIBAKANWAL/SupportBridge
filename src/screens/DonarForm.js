import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert, SafeAreaView, ScrollView, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import COLORS from '../../constants/Colors';
import Header from '../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SIZES from '../../constants/Sizes';
import InputField from '../components/textinput/InputField';
import Button from '../components/Button';
import Checkbox from '../components/checkbox/Checkbox';
import styles from './create.style';
import Label from '../components/Label';
import DropdownField from '../components/textinput/DropdownField';
import Loader from '../components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DonarForm() {
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);
    const [isImageSelectModalVisible, setImageSelectModalVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]); // Store selected images
    const [isSubmitModalVisible, setSubmitModalVisible] = useState(false);
    const [isBlurVisible, setBlurVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);


    const [title, setTitle] = useState();
    const [allcategories, setAllCategories] = useState();
    const [description, setDescription] = useState();
    const [term, setTerm] = useState();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [id, setid] = useState();

    const categories = [
        { label: 'Social', value: 'Social' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Disaster', value: 'Disaster' },
        { label: 'Humaninty', value: 'Humaninty' },
        { label: 'Education', value: 'Education' },
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
                // console.log('Retrieved login data from AsyncStorage:', userData);
                setid(userData.id);
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

    console.log('me', id)

    const maxImageLimit = 5;

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleImageSelectModal = () => {
        setImageSelectModalVisible(!isImageSelectModalVisible);
    };


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

                    // Get the paths of the selected images
                    const selectedImagePaths = imagesToSelect.map(image => image.path);
                    // Set the selected image paths to state
                    setSelectedImages(prevPaths => [...prevPaths, ...selectedImagePaths]);

                    // console.log('Selected Image Paths:', selectedImagePaths);
                    toggleModal(); // Close the modal
                }
            })
            .catch((err) => {
                console.log('Error fetching images from gallery', err);
            });
    };

    // console.log(selectedImages)
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
            <Image source={{ uri: item }} style={styles.carouselImages} />

        </TouchableOpacity>
    );


    const validate = () => {
        Keyboard.dismiss();

        let valid = true;


        // Check if at least one image is selected
        if (selectedImages.length === 0) {
            Alert.alert('Please select at least one image.');
            valid = false;
        }
        // title validation
        if (!title) {
            handleError('Please enter title.', 'title');
            valid = false;
        }

        // category validation
        if (!allcategories) {
            handleError("Please select category", 'allcategories');
            valid = false;
        } else {
            setErrors(prevState => ({ ...prevState, allcategories: null }));
        }

        // description validation
        if (!description) {
            handleError('Please enter description.', 'description');
            valid = false;
        } else if (description.length > 200) {
            handleError('Description is too long', 'description');
            valid = false;
        }

        // Checkbox validation
        if (!isChecked) {
            handleError('Please agree to the terms & conditions.', 'term');
            valid = false;
        } else {
            if (errors.term) {
                handleError(null, 'term');
            }
        }


        if (valid) {
            create();
        }
    };

    const create = async () => {
        // setLoading(true);

        try {
            const formData = new FormData();
            // Append text data
            formData.append('title', title);
            formData.append('category', allcategories);
            formData.append('description', description);
            formData.append('terms_accept', isChecked ? 'yes' : 'no');
            formData.append('user_id', id);

            // Append images
            // selectedImages.forEach((image, index) => {
            //     formData.append(`images[${index}]`, {
            //         uri: image.replace("file://", ""),
            //         type: 'image/jpeg', // Adjust the type based on your image type
            //         name: `image_${index}.jpg`,
            //     });
            // });

            // Append images
            const imageUris = selectedImages.map(image => image.uri); // Extract image URIs
            const imageTypes = imageUris.map(() => 'image/jpeg'); // Adjust based on actual image types
            const imageNames = imageUris.map((uri, index) => `image_${index}.jpg`); // Generate unique names

            for (let i = 0; i < imageUris.length; i++) {
                formData.append('images[]', {
                    uri: imageUris[i],
                    type: imageTypes[i],
                    name: imageNames[i],
                });
            }

            const response = await fetch('https://app-api.demo-customwebsites.com/api/create-fund-request',{
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.ok) {

                const data = await response.json(); // Parse response data

      console.log('Submit Successfully:', data.message);
                // console.log('Submit Successfully:', response.message);

                setLoading(false);
                openModal();

            }
            else {
                setLoading(false);
                const errorData = await response.json(); // Parse error data
                Alert.alert('Error:', errorData.message || 'Failed to create fund'); // Use error message or default text
              }
            // else {
            //     setLoading(false);
            //     Alert.alert('Error:', 'Failed to create fund');
            // }
        } catch (error) {
            setLoading(false);
            console.error('Error creating fund failed:', error);

        }
    };

    console.log('image', selectedImages)

    // const create = async () => {

    //     setLoading(true);
    //     try {
    //         const response = await axios.post(`https://app-api.demo-customwebsites.com/api/create-fund-request`, {
    //             title: title,
    //             category: allcategories,
    //             description: description,
    //             terms_accept: isChecked ? "yes" : "no",
    //             user_id: id,

    //         });

    //         console.log('Create Successfully:', response.data);

    //         setLoading(false);
    //         openModal();
    //     }
    //     catch (error) {
    //         setLoading(false);
    //         console.error('Error creatig fund failed:', error.response.data);
    //     }
    // };

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    }

    const handleCategoryChange = (value) => {
        setAllCategories(value);
        if (errors.allcategories) {
            handleError(null, 'allcategories');
        }
    };


    const openModal = () => {
        setSubmitModalVisible(true);
        setBlurVisible(true);
    };

    const closeModal = () => {
        setSubmitModalVisible(false);
        resetState();
        navigation.navigate('Home')
    };

    const resetState = () => {
        setSelectedImages([]);
        setTitle('');
        setAllCategories('');
        setDescription('');
        setTerm('');
        setIsChecked(false);
        setErrors({});
        setLoading(false);
    };

    return (

        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Loader visible={loading} />
            <View style={{ marginHorizontal: SIZES.small - 6 }}>
                <Header
                    title="Create New Fundraising"
                    showBackButton
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
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

                <View style={{ marginHorizontal: SIZES.medium }}>

                    <View style={{ borderWidth: 0.7, borderColor: COLORS.lightGray, marginTop: 20, }}></View>
                    <View style={{ flex: 1, marginHorizontal: SIZES.xSmall - 5 }} >
                        <View>
                            <Text style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                                marginVertical: 20,
                                color: COLORS.black,
                            }}>
                                Fundraising Details
                            </Text>
                        </View>

                        <Label text="Title" icon iconPosition={33} />
                        <InputField
                            value={title}
                            placeholder="Title"
                            keyboardType="default"
                            onChange={text => setTitle(text)}
                            error={errors.title}
                            onFocus={() => {
                                handleError(null, 'title');
                            }}
                        />


                        <Label text="Category" icon iconPosition={65} />
                        <DropdownField
                            options={categories}
                            initialValue={allcategories}
                            onValueChange={handleCategoryChange}
                            placeholder="Select Category"
                            error={errors.allcategories}
                            onFocus={() => {
                                handleError(null, 'allcategories');
                            }}
                        />


                        <Label text="Description" icon iconPosition={81} />
                        <InputField
                            placeholder="write details about item ....."
                            value={description}
                            error={errors.description}
                            onChange={text => setDescription(text)}
                            onFocus={() => {
                                handleError(null, 'description');
                            }}
                            keyboardType="default"
                            multiline={true}
                            numberOfLines={3}
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
                                                marginBottom: 20
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.boxText(SIZES.xLarge - 2)}>Create Successfully!</Text>
                                    <Text style={[styles.textStyle, { textAlign: 'center', paddingLeft: 10 }]}>We are currently reviewing a fundraising proposal for your donation. We will tell you the result soon.</Text>
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

                </View>
            </ScrollView>



        </SafeAreaView>

    );
}






